import { useEffect, useState } from 'react';
import './Hero.css';

const IMG = {
  bg: 'https://framerusercontent.com/images/VKwTAxJTadPFJjcSoijjd7dAH0.png',
  diyas: 'https://framerusercontent.com/images/WjFzTPZSKhcPu35iI1yXwup1p8.png',
  temple: 'https://framerusercontent.com/images/1deqTu3xOXWaU9hMeZsUz2IvL0.png',
};

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className={`hero ${loaded ? 'loaded' : ''}`}>
      <div className="hero__bg" style={{ backgroundImage: `url(${IMG.bg})` }} />

      <div className="hero__text">
        <div className="hero__name">Rahul</div>
        <div className="hero__weds">weds</div>
        <div className="hero__name">laxmi</div>
      </div>

      <img className="hero__diyas hero__diyas--left" src={IMG.diyas} alt="" />
      <img className="hero__diyas hero__diyas--right" src={IMG.diyas} alt="" />

      <img className="hero__temple" src={IMG.temple} alt="Temple" />

    </section>
  );
}
