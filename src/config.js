/**
 * ============================================
 * WEDDING SITE CONFIGURATION
 * Edit all text, images, dates, and names here
 * ============================================
 */

const config = {
  // ─── Couple Names ───
  groom: {
    name: 'Rahul',
    surname: 'Amanchi',
    parents: 'Shri. Amanchi Srinivas & Smt. Sunita',
    relation: 'Son of',
  },
  bride: {
    name: 'laxmi',
    surname: 'Anagandula',
    parents: 'Shri. Anagandula Gopi & Smt. Uma',
    relation: 'Daughter of',
  },

  // ─── Blessings ───
  blessings: 'With the divine blessings of\nShri. Amanchi Srinivas & Smt. Sunita\nShri. Anagandula Gopi & Smt. Uma',
  invitingText: 'Inviting',
  invitingSub: 'We warmly invite you to join us in our wedding celebration',

  // ─── Bride & Groom Intro ───
  introTitle: ['Introducing the', 'Groom and', 'Bride'],

  // ─── Events ───
  events: [
    {
      title: 'Marriage',
      lines: ['On Sunday, 26th April 2026', '10:49 AM'],
    },
    {
      title: 'Reception',
      lines: ['On Sunday, 26th April 2026', '07:30 PM'],
    },
  ],
  venue: {
    label: 'Venue',
    lines: ['Madhav Party Plot, Beside Midas Square, Godadara, Surat'],
    mapsUrl: 'https://shorturl.at/Kz8Cz',
  },
  requestText: 'We Request your gracious presence on the Auspicious occasion of our marriage',

  // ─── Story Words ───
  storyWords: [
    { text: 'WHERE', depths: [3, 3, 3, 3, 3] },
    { text: 'OUR', depths: [2, 2, 2] },
    { text: 'STORY', depths: [1, 0, 1, 2, 3] },
    { text: 'BEGINS', depths: [0, 0, 1, 2, 3, 3] },
  ],

  // ─── Credits ───
  credit: '',
  creditFull: '',

  // ─── Images ───
  // All PNGs/JPGs served as WebP via ?format=webp for massive size savings
  images: {
    heroBg: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/hero-bg.png?v=1776098475',
    diyas: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/diyas.png?v=1776098469',
    temple: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/temple.png?v=1776098472',
    card: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/card.webp?v=1776099133',
    vinayagar: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/vinayagar.png?v=1776098471',
    garland: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/garland.png?v=1776098470',
    brideGroomBg: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/bride-groom-bg.jpg?v=1776098473',
    food: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/food.png?v=1776098477',
    kolam: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/kolam.png?v=1776098480',
    banner: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/banner.png?v=1776098478',
    couples: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/couple-main.jpg?v=1776360651',
    flower: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/flower.png?v=1776098476',
  },

  // ─── Audio ───
  audio: {
    src: `${process.env.PUBLIC_URL || ''}/audio/marriage-song.mp3`,
    volume: 0.55,
  },

  // ─── Gallery Images (5 columns) ───
  gallery: [
    [ // Column 1
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-9.jpg?v=1776099659',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-6.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-3.jpg?v=1776099659',
    ],
    [ // Column 2
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-5.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-1.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-4.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-7.jpg?v=1776099660',
    ],
    [ // Column 3 (center)
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-11.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-8.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-2.jpg?v=1776099661',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-10.jpg?v=1776099661',
    ],
    [ // Column 4
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-9.jpg?v=1776099659',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-6.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-3.jpg?v=1776099659',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-5.jpg?v=1776099660',
    ],
    [ // Column 5
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-1.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-4.jpg?v=1776099660',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-7.jpg?v=1776099660',
    ],
  ],
};

export default config;
