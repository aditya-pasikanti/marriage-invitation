import './NamesSection.css';

const FLOWER = 'https://framerusercontent.com/images/NpoaMQsRueVleyBsPsOyW3HDNgg.png';
const CARD_BG = 'https://framerusercontent.com/images/ZrKMdp6WI7ax9IR0VJA7Ffcse4.webp';

export default function NamesSection() {
  return (
    <section className="names">
      {/* Full-width card image as background */}
      <div className="names__bg" style={{ backgroundImage: `url(${CARD_BG})` }} />

      <div className="names__content">
        {/* Flower garland divider */}
        <img className="names__flower" src={FLOWER} alt="" />

        <div className="names__row">
          <span className="names__person">Rahul</span>
        </div>

        <div className="names__family">
          Son of<br />Smt. Janani &amp; Shri. Vijay
        </div>

        <div className="names__weds-big">Weds</div>

        <div className="names__row">
          <span className="names__person">laxmi</span>
        </div>

        <div className="names__family">
          Daughter of<br />Smt. Shalini &amp; Shri. Ajith Kumar
        </div>
      </div>
    </section>
  );
}
