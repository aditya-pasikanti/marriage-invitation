import { useEffect, useRef } from 'react';
import './Gallery.css';

const GALLERY_IMAGES = {
  colA: [
    'https://framerusercontent.com/images/9YDV0moFkmla4ieUc4kGqCFSw6s.jpg',
    'https://framerusercontent.com/images/WGGQn50FvNh0FWeksRGwGc8HBD8.jpg',
    'https://framerusercontent.com/images/s3bh1wj7UhZuPw6jWlABmne9BAg.jpg',
    'https://framerusercontent.com/images/nQd4zhBHAOPycZHYbz6qtWqUA.jpg',
  ],
  colB: [
    'https://framerusercontent.com/images/0opAgBbn5VhPicPurDiUPK1aLIk.jpg',
    'https://framerusercontent.com/images/rwVokqRt0PQA9WuJRTOYtaREBs.jpg',
    'https://framerusercontent.com/images/RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg',
    'https://framerusercontent.com/images/6f5ryzjmmK15bl66yOGnKuUm9kU.jpg',
  ],
  colC: [
    'https://framerusercontent.com/images/N8wCGjeLz7UhR7u8I2vheQO5iGI.jpg',
    'https://framerusercontent.com/images/hKIXRnBHXi3BqsH7hPMLBWPsrg.jpg',
    'https://framerusercontent.com/images/ScmcmQYBWSK01i1zUpGkfuog.jpg',
    'https://framerusercontent.com/images/ckxQ3CnXt7t4fXmpYCa5suITG0k.jpg',
  ],
  colD: [
    'https://framerusercontent.com/images/gQ2EefMmKTZenibE6p2qjF1ug.jpg',
    'https://framerusercontent.com/images/dlOppuDRRNOuhdOxT4jkgRrSQ.jpg',
    'https://framerusercontent.com/images/6A0UbuAYozvJAd8k5ue9gVKaTjQ.jpg',
    'https://framerusercontent.com/images/0opAgBbn5VhPicPurDiUPK1aLIk.jpg',
  ],
  colE: [
    'https://framerusercontent.com/images/RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg',
    'https://framerusercontent.com/images/nQd4zhBHAOPycZHYbz6qtWqUA.jpg',
    'https://framerusercontent.com/images/WGGQn50FvNh0FWeksRGwGc8HBD8.jpg',
    'https://framerusercontent.com/images/6f5ryzjmmK15bl66yOGnKuUm9kU.jpg',
  ],
};

const SHAPES = ['pt', 'sq', 'sq', 'pt']; // portrait, square alternating pattern
const COL_CONFIG = [
  { key: 'colA', speed: 0.55, init: 580 },
  { key: 'colB', speed: 0.38, init: 380 },
  { key: 'colC', speed: 0.18, init: 180 },
  { key: 'colD', speed: 0.38, init: 380 },
  { key: 'colE', speed: 0.55, init: 580 },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    const cols = colRefs.current;
    // Set initial transforms
    COL_CONFIG.forEach(({ init }, i) => {
      if (cols[i]) cols[i].style.transform = `translateY(${init}px)`;
    });

    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const pct = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      ));
      COL_CONFIG.forEach(({ init }, i) => {
        const y = init * (1 - pct * 1.85);
        if (cols[i]) cols[i].style.transform = `translateY(${Math.max(0, y)}px)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="gallery" ref={sectionRef}>
      <div className="gallery__row">
        {COL_CONFIG.map(({ key }, ci) => (
          <div
            className="gallery__col"
            key={key}
            ref={el => colRefs.current[ci] = el}
          >
            {GALLERY_IMAGES[key].map((src, ii) => (
              <img
                key={ii}
                className={`gallery__img ${SHAPES[ii]}`}
                src={`${src}?width=480`}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
