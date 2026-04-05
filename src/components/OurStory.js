import { useEffect, useState, useRef } from 'react';
import useInView from '../hooks/useInView';
import './OurStory.css';

const WORDS = [
  { text: 'WHERE', depth: [3,3,3,3,3] },
  { text: 'OUR',   depth: [2,2,2] },
  { text: 'STORY', depth: [1,0,1,2,3] },
  { text: 'BEGINS',depth: [0,0,1,2,3,3] },
];

function Letter({ char, depth, delay, animate }) {
  const cls = `sl d${depth} ${animate ? 'in' : ''}`;
  return (
    <span className={cls} style={{ transitionDelay: `${delay}ms` }}>
      {char}
    </span>
  );
}

export default function OurStory() {
  const [sectionRef, inView] = useInView(0.25);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section className="story" ref={sectionRef}>
      {WORDS.map((word, wi) => (
        <div className="story__row" key={wi}>
          {word.text.split('').map((ch, li) => (
            <Letter
              key={li}
              char={ch}
              depth={word.depth[li]}
              delay={wi * 100 + li * 55}
              animate={animate}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
