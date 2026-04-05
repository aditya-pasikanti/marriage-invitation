import useInView from '../hooks/useInView';
import './StarringCard.css';

const CARD_IMG = 'https://framerusercontent.com/images/ZrKMdp6WI7ax9IR0VJA7Ffcse4.webp';
const VINAYAGAR = 'https://framerusercontent.com/images/uvb64QVa5gS1weQWcsq8K2041s.png';

export default function StarringCard() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="starring" ref={ref}>
      {/* 3D tilted card */}
      <div className="starring__perspective">
        <div
          className="starring__card"
          style={{ backgroundImage: `url(${CARD_IMG})` }}
        />
      </div>

      {/* Blessings overlay — appears on top of the card area */}
      <div className={`starring__blessings ${inView ? 'show' : ''}`}>
        <img className="starring__vinayagar" src={VINAYAGAR} alt="Vinayagar" />
        <p className="starring__bless-text">
          With the divine blessings of<br />
          Smt. Parvathi Amma &amp; Shri Sivan,
        </p>
      </div>
    </section>
  );
}
