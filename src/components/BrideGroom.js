import useInView from '../hooks/useInView';
import './BrideGroom.css';

const BG = 'https://framerusercontent.com/images/vW7TzQKDGECKvSTfLWxktyWBGcA.jpg';
const DIYAS = 'https://framerusercontent.com/images/WjFzTPZSKhcPu35iI1yXwup1p8.png';
const FOOD = 'https://framerusercontent.com/images/eSCu9LZTy5Jnp77W6mCvg0F9Io.png';

export default function BrideGroom() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="bridegroom" ref={ref}>
      <div className="bridegroom__bg" style={{ backgroundImage: `url(${BG})` }} />

      {/* Diya overlays */}
      <img className="bridegroom__diyas bridegroom__diyas--left" src={DIYAS} alt="" />
      <img className="bridegroom__diyas bridegroom__diyas--right" src={DIYAS} alt="" />

      <div className={`bridegroom__content ${inView ? 'show' : ''}`}>
        <div className="bridegroom__intro-small">Introducing the</div>
        <div className="bridegroom__intro-big">Groom and</div>
        <div className="bridegroom__intro-big">Bride</div>

        <img className="bridegroom__food" src={FOOD} alt="" loading="lazy" />
      </div>
    </section>
  );
}
