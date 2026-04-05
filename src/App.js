import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import config from './config';
import './styles/global.css';
import './App.css';

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
  const spring = { stiffness: 70, damping: 22 };

  /* Temple: drifts DOWN (slower than scroll = sense of depth) */
  const templeY = useSpring(useTransform(scrollYProgress, [0, 0.6], [0, 180]), spring);

  /* Text: moves UP + fades out (foreground exits quickly) */
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, -150]), spring);
  const textOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  /* Diyas: move UP (mid-ground rate) */
  const diyasY = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -100]), spring);

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
        <motion.img variants={child} className="bless__garland" src={images.garland} alt="" />
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
      <div className="golden__bg" style={{ backgroundImage: `url(${images.brideGroomBg})` }} />
      <motion.img className="golden__diyas golden__diyas--l" src={images.diyas} alt=""
        initial={{ opacity: 0, x: -120, y: -80 }}
        animate={introInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ ...SPRING_BOUNCE, duration: 1.6 }}
      />
      <motion.img className="golden__diyas golden__diyas--r" src={images.diyas} alt=""
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

      {/* WHERE OUR STORY BEGINS */}
      <div className="golden__story" ref={storyRef}>
        {config.storyWords.map((word, wi) => (
          <div className="story__row" key={wi}>
            {word.text.split('').map((ch, li) => {
              const depth = word.depths[li];
              const initY = [0, 50, 100, 150][depth];
              const initOpacity = [1, 0.5, 0.2, 0.1][depth];
              return (
                <motion.span key={li} className="sl"
                  initial={{ opacity: initOpacity, y: initY }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: 'spring', stiffness: 80, damping: 15,
                    delay: wi * 0.15 + li * 0.07,
                  }}
                >{ch}</motion.span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Gallery (parallax photos) */}
      <GalleryInner />

      {/* Food image */}
      <motion.img className="golden__food" src={images.food} alt="" loading="lazy"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={SPRING_BOUNCE}
      />
    </section>
  );
}

/* ════════════════════════════════════════
   Gallery columns (inside golden section)
   ════════════════════════════════════════ */
/* Offsets scaled relative to viewport height for responsiveness.
   No useSpring wrapper — raw useTransform is much lighter on scroll. */
const COL_RATIOS = [0.55, 0.35, 0.17, 0.35, 0.55];
const SHAPES = ['pt', 'sq', 'sq', 'pt'];

function GalleryColumn({ images: imgs, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const offset = Math.round(COL_RATIOS[index] * vh);
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset * 0.5]);

  return (
    <motion.div className="gallery__col" style={{ y }} ref={ref}>
      {imgs.map((src, ii) => (
        <img key={ii} className={`gallery__img ${SHAPES[ii % SHAPES.length]}`}
          src={`${src}?width=480`} alt="" loading="lazy" />
      ))}
    </motion.div>
  );
}

function GalleryInner() {
  return (
    <div className="gallery">
      <div className="gallery__row">
        {config.gallery.map((col, ci) => (
          <GalleryColumn key={ci} images={col} index={ci} />
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
        <div className="std__kolam" style={{ backgroundImage: `url(${images.kolam})` }} />
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
            </div>
            <div className="std__event">
              <div className="std__ev-title grad">{events[1].title}</div>
              {events[1].lines.map((l, j) => <div className="std__ev-line grad" key={j}>{l}</div>)}
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
          <img src={images.couples} alt="" loading="lazy" />
        </motion.div>

        <div className="std__banner"><img src={images.banner} alt="" /></div>

        <motion.p className="std__request grad"
          initial={{ opacity: 0 }} animate={couplesInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
        >{requestText}</motion.p>
      </div>


    </section>
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
    </>
  );
}
