import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
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
function Hero({ entered }) {
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
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          initial={{ opacity: 0, x: -150 }}
          animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.1 }}
        />
      </motion.div>
      <motion.div className="hero__diyas-wrap hero__diyas-wrap--r" style={{ y: diyasY }}>
        <motion.img className="hero__diyas" src={images.diyas} alt=""
          initial={{ opacity: 0, x: 150 }}
          animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: 150 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.2 }}
          style={{ scaleX: -1 }}
        />
      </motion.div>

      {/* Temple: outer div owns the absolute position + scroll-parallax Y.
          Inner img owns the entrance animation (y: 400 → 0). */}
      <motion.div className="hero__temple-wrap" style={{ y: templeY }}>
        <motion.img className="hero__temple" src={images.temple} alt=""
          initial={{ opacity: 0, y: 400 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
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
   TYPING SHLOKA — reveals a multi-line Sanskrit shloka character-by-character
   with a blinking cursor that lives on the current line.
   ════════════════════════════════════════ */
function TypingShloka({ lines, speed = 55, startDelay = 350, onComplete }) {
  const [charIndex, setCharIndex] = useState(0);
  const fullText = lines.join('\n');
  const total = fullText.length;
  const completedRef = useRef(false);

  useEffect(() => {
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCharIndex((i) => {
          const next = i + 1;
          if (next >= total) clearInterval(interval);
          return Math.min(next, total);
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [total, speed, startDelay]);

  useEffect(() => {
    if (!completedRef.current && charIndex >= total && total > 0) {
      completedRef.current = true;
      onComplete?.();
    }
  }, [charIndex, total, onComplete]);

  const visibleLines = fullText.slice(0, charIndex).split('\n');
  const complete = charIndex >= total;
  const currentLineIdx = Math.max(0, visibleLines.length - 1);

  return (
    <div className="welcome__shloka" lang="sa" aria-label="Sanskrit blessing">
      {lines.map((_, i) => (
        <div className="welcome__shloka-line" key={i}>
          <span>{visibleLines[i] ?? ''}</span>
          {!complete && i === currentLineIdx && (
            <span className="welcome__shloka-cursor" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   BACKGROUND MUSIC
   Full-screen welcome overlay — first tap unlocks audio (guaranteed gesture).
   Floating mute/unmute toggle in bottom-right after entry.
   ════════════════════════════════════════ */
function BackgroundMusic({ entered, onEnter }) {
  const { audio, shloka } = config;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [tied, setTied] = useState(false);
  const [shlokaDone, setShlokaDone] = useState(false);

  const handleTie = () => {
    if (tied) return;
    /* Start audio SYNCHRONOUSLY in the user gesture — required for iOS/Safari. */
    const el = audioRef.current;
    if (el) {
      el.volume = audio.volume ?? 0.55;
      el.muted = false;
      el.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => { });
    }
    setTied(true);
    /* Let the full ceremonial tying animation play, then reveal the site. */
    setTimeout(() => onEnter(), 2800);
  };

  /* Lock page scrolling while the welcome overlay is up. */
  useEffect(() => {
    if (entered) return;
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;
    const prevTouchAction = body.style.touchAction;
    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.touchAction = prevTouchAction;
    };
  }, [entered]);

  /* Pause when tab is hidden / page is backgrounded; resume on return. */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    let wasPlaying = false;

    const onHide = () => {
      wasPlaying = !el.paused;
      if (wasPlaying) el.pause();
    };
    const onShow = () => {
      if (wasPlaying) {
        el.play().catch(() => { });
      }
    };
    const onVisibility = () => {
      if (document.hidden) onHide(); else onShow();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('pageshow', onShow);
    window.addEventListener('blur', onHide);
    window.addEventListener('focus', onShow);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('pageshow', onShow);
      window.removeEventListener('blur', onHide);
      window.removeEventListener('focus', onShow);
    };
  }, []);

  // eslint-disable-next-line no-unused-vars
  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => { });
      return;
    }
    const next = !isMuted;
    el.muted = next;
    setIsMuted(next);
  };

  // eslint-disable-next-line no-unused-vars
  const showMuted = !isPlaying || isMuted;

  return (
    <>
      <audio ref={audioRef} src={audio.src} loop preload="auto" playsInline />

      <AnimatePresence>
        {!entered && (
          <motion.div
            className="welcome"
            role="button"
            tabIndex={0}
            onClick={handleTie}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTie(); }}
            aria-label="Enter site and play music"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="welcome__inner">
              <motion.div
                className="welcome__shloka-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={tied ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
                transition={tied ? { duration: 0.5, ease: 'easeIn' } : { duration: 0.9, delay: 0.15 }}
              >
                <TypingShloka
                  lines={shloka.lines}
                  speed={110}
                  onComplete={() => setShlokaDone(true)}
                />
              </motion.div>
              <motion.div
                className="welcome__divider"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={tied
                  ? { scaleX: 0.3, opacity: 0 }
                  : shlokaDone
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }}
                transition={tied
                  ? { duration: 0.5, ease: 'easeIn' }
                  : { duration: 0.7, ease: 'easeOut' }}
                aria-hidden="true"
              />
              <motion.div
                className="welcome__mangal"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={tied
                  ? { opacity: 1, y: -20, scale: 1.22 }
                  : shlokaDone
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 16, scale: 0.9 }}
                transition={tied
                  ? { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
                  : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                {/* ONE unified SVG: chain + convergence + bail + split-threads + pendants */}
                <motion.svg
                  className="welcome__mangal-svg"
                  viewBox="0 0 440 520"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                  animate={tied
                    ? {
                      filter: [
                        'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
                        'drop-shadow(0 0 28px rgba(255,225,140,0.95))',
                        'drop-shadow(0 0 16px rgba(255,215,130,0.7))',
                      ],
                    }
                    : { filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }}
                  transition={{ duration: 1.2, delay: 1.9, times: [0, 0.5, 1] }}
                >
                  <defs>
                    <radialGradient id="knot-gold" cx="40%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#fff2c4" />
                      <stop offset="55%" stopColor="#e8a830" />
                      <stop offset="100%" stopColor="#8b5a0a" />
                    </radialGradient>
                    <radialGradient id="thali-gold" cx="38%" cy="32%" r="75%">
                      <stop offset="0%" stopColor="#fff4d0" />
                      <stop offset="45%" stopColor="#e8a830" />
                      <stop offset="100%" stopColor="#7a4f08" />
                    </radialGradient>
                  </defs>

                  {/* One continuous chain per side — bulges outward in the middle, ends at its
                      pendant hook. When tied, the two top ends sit APART and are joined by the arc below. */}
                  <motion.path
                    fill="none"
                    stroke="#e0b340"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      d: tied
                        ? 'M 175,78 C 70,160 75,330 195,432'
                        : 'M 80,40 C 65,180 155,270 195,432',
                    }}
                    transition={{ duration: 1.6, delay: tied ? 0.3 : 0, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.path
                    fill="none"
                    stroke="#e0b340"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      d: tied
                        ? 'M 265,78 C 370,160 365,330 245,432'
                        : 'M 360,40 C 375,180 285,270 245,432',
                    }}
                    transition={{ duration: 1.6, delay: tied ? 0.3 : 0, ease: [0.4, 0, 0.2, 1] }}
                  />

                  {/* Top connecting arc — wide rounded "back-of-neck" that joins the two ends,
                      completing the circular loop. Fades in after the chains tie. */}
                  <motion.path
                    d="M 175,78 Q 220,28 265,78"
                    fill="none"
                    stroke="#e0b340"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: tied ? 1 : 0 }}
                    transition={{ duration: 0.7, delay: tied ? 1.5 : 0 }}
                  />

                  {/* Horizontal connector bar just above the pendants — the chain ends here on both
                      sides, and the pendants hang directly below it (traditional thaali design). */}
                  <line
                    x1="193"
                    y1="432"
                    x2="247"
                    y2="432"
                    stroke="#e0b340"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  {/* Decorative red coral/kumkum beads on the bar */}
                  <circle cx="210" cy="432" r="1.6" fill="#c62828" stroke="#7a1010" strokeWidth="0.3" />
                  <circle cx="230" cy="432" r="1.6" fill="#c62828" stroke="#7a1010" strokeWidth="0.3" />

                  {/* Knot that forms at the tying point */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={tied ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.85, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: '220px 50px', transformBox: 'fill-box' }}
                  >
                    <circle cx="220" cy="50" r="7" fill="url(#knot-gold)" stroke="#7a4f08" strokeWidth="0.6" />
                    <circle cx="220" cy="50" r="2.3" fill="#fff2c4" />
                  </motion.g>

                  {/* Primary sparkle */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={tied
                      ? { opacity: [0, 1, 0], scale: [0, 1.6, 0], rotate: 120 }
                      : { opacity: 0, scale: 0 }}
                    transition={{ duration: 1.1, delay: 2.1, times: [0, 0.45, 1] }}
                    style={{ transformOrigin: '220px 50px', transformBox: 'fill-box' }}
                  >
                    <path d="M 220,24 L 222,46 L 244,50 L 222,54 L 220,76 L 218,54 L 196,50 L 218,46 Z" fill="#fff2c4" />
                  </motion.g>

                  {/* Secondary sparkle */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={tied
                      ? { opacity: [0, 0.85, 0], scale: [0, 1.25, 0], rotate: 135 }
                      : { opacity: 0, scale: 0 }}
                    transition={{ duration: 1.0, delay: 2.2, times: [0, 0.5, 1] }}
                    style={{ transformOrigin: '220px 50px', transformBox: 'fill-box' }}
                  >
                    <path d="M 220,32 L 221,47 L 236,50 L 221,53 L 220,68 L 219,53 L 204,50 L 219,47 Z" fill="#ffe9c7" />
                  </motion.g>

                  {/* LEFT thali pendant at (195, 458) — hangs directly from the connector bar */}
                  <g>
                    <circle cx="195" cy="458" r="25" fill="url(#thali-gold)" stroke="#5a3806" strokeWidth="0.7" />
                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i / 16) * Math.PI * 2;
                      const cx = 195 + Math.cos(a) * 26;
                      const cy = 458 + Math.sin(a) * 26;
                      return <circle key={`l${i}`} cx={cx} cy={cy} r="1.1" fill="#e8a830" stroke="#5a3806" strokeWidth="0.3" />;
                    })}
                    <circle cx="195" cy="458" r="19" fill="none" stroke="#5a3806" strokeWidth="0.5" />
                    <circle cx="195" cy="458" r="12" fill="none" stroke="#5a3806" strokeWidth="0.35" />
                    <g transform="translate(195 458)">
                      <path d="M 0,-9 L 2.5,-2.5 L 9,0 L 2.5,2.5 L 0,9 L -2.5,2.5 L -9,0 L -2.5,-2.5 Z" fill="#5a3806" />
                      <circle r="2.8" fill="url(#thali-gold)" stroke="#5a3806" strokeWidth="0.3" />
                      <circle r="1.2" fill="#5a3806" />
                    </g>
                    <g fill="#5a3806">
                      <circle cx="195" cy="445" r="0.75" />
                      <circle cx="195" cy="471" r="0.75" />
                      <circle cx="182" cy="458" r="0.75" />
                      <circle cx="208" cy="458" r="0.75" />
                    </g>
                  </g>

                  {/* RIGHT thali pendant at (245, 458) — touches left pendant at x=220 */}
                  <g>
                    <circle cx="245" cy="458" r="25" fill="url(#thali-gold)" stroke="#5a3806" strokeWidth="0.7" />
                    {Array.from({ length: 16 }).map((_, i) => {
                      const a = (i / 16) * Math.PI * 2;
                      const cx = 245 + Math.cos(a) * 26;
                      const cy = 458 + Math.sin(a) * 26;
                      return <circle key={`r${i}`} cx={cx} cy={cy} r="1.1" fill="#e8a830" stroke="#5a3806" strokeWidth="0.3" />;
                    })}
                    <circle cx="245" cy="458" r="19" fill="none" stroke="#5a3806" strokeWidth="0.5" />
                    <circle cx="245" cy="458" r="12" fill="none" stroke="#5a3806" strokeWidth="0.35" />
                    <g transform="translate(245 458)">
                      <path d="M 0,-9 L 2.5,-2.5 L 9,0 L 2.5,2.5 L 0,9 L -2.5,2.5 L -9,0 L -2.5,-2.5 Z" fill="#5a3806" />
                      <circle r="2.8" fill="url(#thali-gold)" stroke="#5a3806" strokeWidth="0.3" />
                      <circle r="1.2" fill="#5a3806" />
                    </g>
                    <g fill="#5a3806">
                      <circle cx="245" cy="445" r="0.75" />
                      <circle cx="245" cy="471" r="0.75" />
                      <circle cx="232" cy="458" r="0.75" />
                      <circle cx="258" cy="458" r="0.75" />
                    </g>
                  </g>
                </motion.svg>

                {/* Button: absolutely positioned over the SVG's "neck" area */}
                <div className="welcome__cta-wrap">
                  <motion.div
                    className={`welcome__cta ${tied ? 'welcome__cta--tied' : ''}`}
                    animate={tied
                      ? { opacity: 0, scale: 0.85 }
                      : shlokaDone
                        ? { opacity: 1, scale: [1, 1.08, 1] }
                        : { opacity: 0, scale: 0.9 }}
                    transition={tied
                      ? { duration: 0.6, ease: 'easeIn', delay: 0.1 }
                      : shlokaDone
                        ? {
                          opacity: { duration: 0.5, ease: 'easeOut' },
                          scale: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
                        }
                        : { duration: 0.3 }}
                  >
                    {!tied && shlokaDone && <span className="welcome__cta-ring" aria-hidden="true" />}
                    {!tied && shlokaDone && <span className="welcome__cta-ring welcome__cta-ring--2" aria-hidden="true" />}
                    <span>Open Invitation</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* {entered && (
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
      )} */}
    </>
  );
}

/* ════════════════════════════════════════
   SCROLL HINT — floats above the hero after the welcome overlay closes,
   bounces gently to suggest the page continues, hides on first scroll.
   ════════════════════════════════════════ */
function ScrollHint({ entered }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const onScroll = () => {
      if (window.scrollY > 40) setHidden(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [entered]);

  return (
    <AnimatePresence>
      {entered && !hidden && (
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <span className="scroll-hint__chevron" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════
   APP — section order matches original:
   Hero+Card → Blessings → Golden(Intro+Story+Gallery+Food) → SaveTheDate
   ════════════════════════════════════════ */
export default function App() {
  const [entered, setEntered] = useState(false);
  return (
    <>
      <Hero entered={entered} />
      <Blessings />
      <GoldenSection />
      <SaveTheDate />
      <BackgroundMusic entered={entered} onEnter={() => setEntered(true)} />
      <ScrollHint entered={entered} />
    </>
  );
}
