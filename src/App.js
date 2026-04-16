import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import config from './config';
import './styles/global.css';
import './App.css';

/* Preload only truly above-fold images */
const PRELOAD_URLS = [config.images.heroBg, config.images.diyas, config.images.temple];
PRELOAD_URLS.forEach((url) => {
  const img = new Image();
  img.src = url;
});

/* Spring configs */
const SPRING_BOUNCE = { type: 'spring', bounce: 0.2, duration: 2 };
const SPRING_SLOW = { type: 'spring', bounce: 0.15, duration: 4.5 };
const SPRING_SOFT = { type: 'spring', stiffness: 60, damping: 20 };

/* ════════════════════════════════════════
   1. HERO + CARD
   Sky → text → diyas → temple → 3D card (seamless)
   The card emerges from below the temple.
   ════════════════════════════════════════ */
function Hero() {
  const { images, groom, bride, credit, blessings, invitingText, invitingSub } = config;
  const heroRef = useRef(null);

  /* Scroll progress through the hero section */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  /* Raw useTransform (no useSpring) — much lighter on scroll.
     Springs recalculate physics every frame; transforms are just linear interpolation. */
  const templeY = useTransform(scrollYProgress, [0, 0.6], [0, 180]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const diyasY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  /* Stagger variants for fold1 content on the card */
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const child = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: SPRING_SOFT },
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg" style={{ backgroundImage: `url(${images.heroBg})` }} />

      {/* Text: outer wrap = scroll parallax + fade; inner = entrance animation */}
      <motion.div className="hero__text-wrap" style={{ y: textY, opacity: textOpacity }}>
        <motion.div className="hero__text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.3 }}
        >
          <div className="hero__name">{groom.name}</div>
          <div className="hero__weds">weds</div>
          <div className="hero__name">{bride.name}</div>
        </motion.div>
      </motion.div>

      {/* Diyas: outer wrap = scroll parallax; inner img = entrance animation */}
      <motion.div className="hero__diyas-wrap hero__diyas-wrap--l" style={{ y: diyasY }}>
        <motion.img className="hero__diyas" src={images.diyas} alt=""
          initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.1 }}
        />
      </motion.div>
      <motion.div className="hero__diyas-wrap hero__diyas-wrap--r" style={{ y: diyasY }}>
        <motion.img className="hero__diyas" src={images.diyas} alt=""
          initial={{ opacity: 0, x: 150 }} animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.2 }}
          style={{ scaleX: -1 }}
        />
      </motion.div>

      {/* Temple: outer div owns the absolute position + scroll-parallax Y.
          Inner img owns the entrance animation (y: 400 → 0). */}
      <motion.div className="hero__temple-wrap" style={{ y: templeY }}>
        <motion.img className="hero__temple" src={images.temple} alt=""
          initial={{ opacity: 0, y: 400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SLOW, delay: 0.5 }}
        />
      </motion.div>

      {/* 3D Card — fold1 content lives ON the tilted card surface */}
      <div className="hero__card-wrap">
        <motion.div className="hero__card"
          style={{ backgroundImage: `url(${images.card})` }}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="hero__card-content">
            <motion.img variants={child} className="bless__vinayagar" src={images.vinayagar} alt="" />
            {blessings.split('\n').map((line, i) => (
              <motion.p variants={child} className="bless__text" key={i}>{line}</motion.p>
            ))}
            <motion.div variants={child} className="bless__inviting">{invitingText}</motion.div>
            <motion.p variants={child} className="bless__text">{invitingSub}</motion.p>
          </div>
        </motion.div>
      </div>

      <span className="hero__credit">{credit}</span>
    </section>
  );
}

/* ════════════════════════════════════════
   2. BLESSINGS + INVITING + NAMES
   On the red mandala card background.
   Includes: Ganesha, blessings, "Inviting",
   invite text, garlands, family names.
   ════════════════════════════════════════ */
function Blessings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { images, groom, bride } = config;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const child = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: SPRING_SOFT },
  };

  return (
    <section className="bless">
      {/* Fold 2: Garland at top + groom + names + bride */}
      <motion.div className="bless__fold2"
        ref={ref} variants={container}
        initial="hidden" animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.img variants={child} className="bless__garland" src={images.garland} alt="" loading="lazy" decoding="async" />
        <motion.span variants={child} className="bless__family-line">{groom.relation}</motion.span>
        <motion.span variants={child} className="bless__family-line">{groom.parents}</motion.span>
        <motion.div variants={child} className="bless__big-name">{groom.name}</motion.div>
        <motion.div variants={child} className="bless__weds">Weds</motion.div>
        <motion.div variants={child} className="bless__big-name">{bride.name}</motion.div>
        <motion.span variants={child} className="bless__family-line">{bride.relation}</motion.span>
        <motion.span variants={child} className="bless__family-line">{bride.parents}</motion.span>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   3. GOLDEN SECTION
   "Introducing Groom and Bride" +
   "WHERE OUR STORY BEGINS" + photos + food
   All on the same golden/saffron background.
   ════════════════════════════════════════ */
function GoldenSection() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.15 });
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 });

  const { images, introTitle } = config;

  return (
    <section className="golden">
      <img className="golden__bg" src={images.brideGroomBg} alt="" loading="lazy" decoding="async" />
      <motion.img className="golden__diyas golden__diyas--l" src={images.diyas} alt="" loading="lazy" decoding="async"
        initial={{ opacity: 0, x: -120, y: -80 }}
        animate={introInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ ...SPRING_BOUNCE, duration: 1.6 }}
      />
      <motion.img className="golden__diyas golden__diyas--r" src={images.diyas} alt="" loading="lazy" decoding="async"
        initial={{ opacity: 0, x: 120, y: -80 }}
        animate={introInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ ...SPRING_BOUNCE, duration: 1.6, delay: 0.15 }}
        style={{ scaleX: -1 }}
      />

      {/* Intro text */}
      <motion.div className="golden__intro" ref={introRef}
        initial={{ opacity: 0, y: 80 }}
        animate={introInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING_BOUNCE, duration: 1.8 }}
      >
        <div className="golden__intro-small">{introTitle[0]}</div>
        <div className="golden__intro-big">{introTitle[1]}</div>
        <div className="golden__intro-big">{introTitle[2]}</div>
      </motion.div>

      {/* WHERE OUR STORY BEGINS — CSS-driven animation, no per-letter motion.span */}
      <div className={`golden__story ${storyInView ? 'story--visible' : ''}`} ref={storyRef}>
        {config.storyWords.map((word, wi) => (
          <div className="story__row" key={wi}>
            {word.text.split('').map((ch, li) => {
              const depth = word.depths[li];
              return (
                <span key={li} className={`sl sl--d${depth}`}
                  style={{ transitionDelay: `${wi * 0.15 + li * 0.07}s` }}
                >{ch}</span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gallery (parallax photos) */}
      <GalleryInner />
    </section>
  );
}

/* ════════════════════════════════════════
   Gallery columns (inside golden section)
   Pure CSS auto-scrolling vertical carousel.
   Images are duplicated for a seamless loop.
   Odd columns scroll up, even columns scroll down.
   ════════════════════════════════════════ */
const SHAPES = ['pt', 'sq', 'sq', 'pt'];
const COL_DURATIONS = ['28s', '22s', '18s', '22s', '28s'];

function GalleryColumn({ images: imgs, index, loaded }) {
  const direction = index % 2 === 0 ? 'up' : 'down';
  const doubled = [...imgs, ...imgs];

  return (
    <div className={`gallery__col gallery__col--${direction}`}
      style={{ animationDuration: COL_DURATIONS[index] }}
    >
      {doubled.map((src, ii) => (
        <img key={ii} className={`gallery__img ${SHAPES[ii % SHAPES.length]}`}
          style={{ '--stagger': `${(index * 80) + (ii % imgs.length) * 90}ms` }}
          src={loaded ? src : undefined} alt="" decoding="async" />
      ))}
    </div>
  );
}

/* Wedding-palette petal colors: marigold saffron, jasmine cream, kumkum red, white, gold */
const PETAL_COLORS = ['#e8a830', '#f5e6c8', '#d4452b', '#fff8e7', '#f2b84b'];

function fireCelebration(origin) {
  const defaults = {
    origin,
    colors: PETAL_COLORS,
    gravity: 0.55,
    scalar: 1.3,
    ticks: 220,
    disableForReducedMotion: true,
    shapes: ['circle'],
  };
  /* Left burst angling right */
  confetti({ ...defaults, particleCount: 60, angle: 60, spread: 70, startVelocity: 55, origin: { x: 0.1, y: 0.75 } });
  /* Right burst angling left */
  confetti({ ...defaults, particleCount: 60, angle: 120, spread: 70, startVelocity: 55, origin: { x: 0.9, y: 0.75 } });
  /* Center shower — drifts gently like falling petals */
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 80, angle: 90, spread: 120, startVelocity: 35, drift: 0.5, origin: { x: 0.5, y: 0.3 } });
  }, 250);
}

function GalleryInner() {
  const ref = useRef(null);
  /* Trigger image loading when gallery is within 500px of viewport — once, permanently */
  const isNear = useInView(ref, { once: true, margin: '500px 0px' });
  /* Reveal animation fires once when gallery actually enters the viewport */
  const isRevealed = useInView(ref, { once: true, amount: 0.1 });
  /* Toggle animation play/pause based on actual visibility */
  const isVisible = useInView(ref, { amount: 0 });

  /* Fire flower-petal confetti once when the gallery scrolls into view */
  useEffect(() => {
    if (!isRevealed) return;
    const rect = ref.current?.getBoundingClientRect();
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
    fireCelebration({ x: 0.5, y: Math.max(0.1, Math.min(0.9, y)) });
  }, [isRevealed]);

  return (
    <div className={`gallery ${isVisible ? 'gallery--active' : ''} ${isRevealed ? 'gallery--revealed' : ''}`} ref={ref}>
      <div className="gallery__row">
        {config.gallery.map((col, ci) => (
          <GalleryColumn key={ci} images={col} index={ci} loaded={isNear} />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   4. SAVE THE DATE (pink/salmon section)
   ════════════════════════════════════════ */
function SaveTheDate() {
  const couplesRef = useRef(null);
  const couplesInView = useInView(couplesRef, { once: true, amount: 0.2 });
  const detailsRef = useRef(null);
  const detailsInView = useInView(detailsRef, { once: true, amount: 0.15 });

  const { images, events, venue, requestText } = config;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: SPRING_SOFT },
  };

  return (
    <section className="std">

      <div className="std__details">
        <img className="std__kolam" src={images.kolam} alt="" loading="lazy" decoding="async" />
        <motion.div className="std__content" ref={detailsRef}
          variants={stagger} initial="hidden" animate={detailsInView ? 'visible' : 'hidden'}
        >
          <motion.h1 variants={fadeUp} className="std__title grad">Save the date</motion.h1>
          <motion.div variants={fadeUp} className="std__grid">
            <div className="std__event">
              <div className="std__ev-title grad">{events[0].title}</div>
              {events[0].lines.map((l, j) => <div className="std__ev-line grad" key={j}>{l}</div>)}
            </div>
            <div className="std__center">
              <img className="std__flower" src={images.flower} alt="" loading="lazy" />
              <div className="std__venue-label grad">{venue.label}</div>
              {venue.lines.map((l, i) => <div className="std__ev-line grad" key={i}>{l}</div>)}
              {venue.mapsUrl && (
                <a
                  className="std__map-link"
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open venue in Google Maps"
                >
                  <span className="std__map-pulse" aria-hidden="true" />
                  <span className="std__map-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </span>
                  <span className="std__map-label grad">View on Map</span>
                </a>
              )}
            </div>
            <div className="std__event">
              <div className="std__ev-title grad">{events[1].title}</div>
              {events[1].lines.map((l, j) => <div className="std__ev-line grad" key={j}>{l}</div>)}
            </div>
            <div className="std__event">
              <div className="std__ev-title grad">Followed by Dinner</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className='std__couples-container'>
        <motion.div className="std__couples" ref={couplesRef}
          initial={{ opacity: 0, y: 150 }}
          animate={couplesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', bounce: 0.2, duration: 2.5 }}
        >
          <img src={images.couples} alt="" loading="lazy" decoding="async" />
        </motion.div>

        <div className="std__banner"><img src={images.banner} alt="" loading="lazy" decoding="async" /></div>

        <motion.p className="std__request grad"
          initial={{ opacity: 0 }} animate={couplesInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
        >{requestText}</motion.p>
      </div>


    </section>
  );
}

/* ════════════════════════════════════════
   BACKGROUND MUSIC
   Starts on first user interaction (scroll/tap/click/key).
   Floating mute/unmute toggle in bottom-right.
   ════════════════════════════════════════ */
function BackgroundMusic() {
  const { audio } = config;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const tryPlay = useCallback(() => {
    const el = audioRef.current;
    if (!el || isPlaying) return;
    el.volume = audio.volume ?? 0.55;
    const p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(() => setIsPlaying(true)).catch(() => {});
    } else {
      setIsPlaying(true);
    }
  }, [audio.volume, isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.play().then(() => setIsPlaying(true)).catch(() => {});

    const onInteract = () => {
      tryPlay();
      cleanup();
    };
    const events = ['scroll', 'touchstart', 'click', 'keydown', 'pointerdown'];
    const cleanup = () => events.forEach((e) =>
      window.removeEventListener(e, onInteract, { passive: true, capture: true })
    );
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true, capture: true })
    );
    return cleanup;
  }, [tryPlay]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (!isPlaying) { tryPlay(); return; }
    if (isMuted) {
      el.muted = false;
      setIsMuted(false);
    } else {
      el.muted = true;
      setIsMuted(true);
    }
  };

  const showMuted = !isPlaying || isMuted;

  return (
    <>
      <audio ref={audioRef} src={audio.src} loop preload="auto" playsInline />
      <button
        type="button"
        className={`bgm-toggle ${isPlaying && !isMuted ? 'bgm-toggle--on' : ''}`}
        onClick={toggle}
        aria-label={showMuted ? 'Unmute music' : 'Mute music'}
        title={showMuted ? 'Unmute music' : 'Mute music'}
      >
        <span className="bgm-toggle__ring" aria-hidden="true" />
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          {showMuted ? (
            <path d="M3 10v4h4l5 5V5L7 10H3zm13.59 2L19 9.59 17.59 8.17 15.17 10.59 12.76 8.17l-1.42 1.42L13.76 12l-2.42 2.41 1.42 1.42 2.41-2.42 2.42 2.42L19 14.41 16.59 12z" />
          ) : (
            <path d="M3 10v4h4l5 5V5L7 10H3zm11.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 14.5 12zM12 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
          )}
        </svg>
      </button>
    </>
  );
}

/* ════════════════════════════════════════
   APP — section order matches original:
   Hero+Card → Blessings → Golden(Intro+Story+Gallery+Food) → SaveTheDate
   ════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Hero />
      <Blessings />
      <GoldenSection />
      <SaveTheDate />
      <BackgroundMusic />
    </>
  );
}
