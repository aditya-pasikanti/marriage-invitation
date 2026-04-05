import useInView from '../hooks/useInView';
import './SaveTheDate.css';

const KOLAM = 'https://framerusercontent.com/images/ZJuwYsHXk0HnRjJnd4JPA93gI60.png';
const BANNER = 'https://framerusercontent.com/images/rRjOvPjTz2tlTxNt0USBngTEY.png';
const COUPLES = 'https://framerusercontent.com/images/HkGtJk9wSnZmN9N451qy8p9vpeI.png';
const FLOWER = 'https://framerusercontent.com/images/BgpcqMk4l313b21gEqjiSnECZPw.png';

export default function SaveTheDate() {
  const [couplesRef, couplesInView] = useInView(0.2);

  return (
    <section className="std">
      {/* Banner strip */}
      <div className="std__banner">
        <img src={BANNER} alt="Rahul Weds Lakshmi" />
      </div>

      {/* Couples circle */}
      <div
        className={`std__couples ${couplesInView ? 'show' : ''}`}
        ref={couplesRef}
      >
        <img src={COUPLES} alt="Rahul and Lakshmi" loading="lazy" />
      </div>

      {/* We Request text */}
      <p className="std__request grad">
        We Request your gracious presence on the Auspicious occasion of our marriage
      </p>

      {/* Kolam background section */}
      <div className="std__details">
        <div className="std__kolam" style={{ backgroundImage: `url(${KOLAM})` }} />

        <div className="std__content">
          <h1 className="std__title grad">Save the date</h1>

          <div className="std__events">
            <div className="std__event">
              <div className="std__ev-title grad">Subamuhurtham</div>
              <div className="std__ev-line grad">On Thursday, 14th October 2026</div>
              <div className="std__ev-line grad">At 09:30am</div>
              <div className="std__ev-line grad">Saravana Nakshatram</div>
              <div className="std__ev-line grad">Palani</div>
            </div>
            <div className="std__event">
              <div className="std__ev-title grad">Reception</div>
              <div className="std__ev-line grad">On Friday, 15th October 2026</div>
              <div className="std__ev-line grad">At 07:30pm</div>
              <div className="std__ev-line grad">Saravana Nakshatram</div>
              <div className="std__ev-line grad">Palani</div>
            </div>
          </div>

          <div className="std__venue">
            <div className="std__venue-label grad">Venue</div>
            <div className="std__ev-line grad">Padmavathi parinayan</div>
            <div className="std__ev-line grad">Near Priya Pickles, Poranki</div>
            <div className="std__ev-line grad">Vijayawada</div>
          </div>

          <img className="std__flower" src={FLOWER} alt="" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
