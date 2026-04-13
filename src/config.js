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
    parents: 'Smt. Sunita & Shri. Srinivas',
    relation: 'Son of',
  },
  bride: {
    name: 'Lakshmi',
    surname: 'Anagandula',
    parents: 'Smt. Vanita & Shri. Gopi',
    relation: 'Daughter of',
  },

  // ─── Blessings ───
  blessings: 'With the divine blessings of\nSmt. Sunita & Shri. Srinivas\nSmt. Vanita & Shri. Gopi',
  invitingText: 'Inviting',
  invitingSub: 'We warmly invite you to join us in our wedding celebration',

  // ─── Bride & Groom Intro ───
  introTitle: ['Introducing the', 'Groom and', 'Bride'],

  // ─── Events ───
  events: [
    {
      title: 'Marriage',
      lines: ['On Sunday, 26th April 2026', 'Morning'],
    },
    {
      title: 'Reception',
      lines: ['On Sunday, 26th April 2026', 'Evening'],
    },
  ],
  venue: {
    label: 'Venue',
    lines: ['Madhav Party Plot', 'Opp. Sky View Building, Shakti Nagar', 'Surat, Gujarat 395012'],
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
    couples: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/couples.png?v=1776098471',
    flower: 'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/flower.png?v=1776098476',
  },

  // ─── Gallery Images (5 columns) ───
  gallery: [
    [ // Column 1
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-01-9YDV0moFkmla4ieUc4kGqCFSw6s.jpg?v=1776098468',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-02-WGGQn50FvNh0FWeksRGwGc8HBD8.jpg?v=1776098476',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-03-s3bh1wj7UhZuPw6jWlABmne9BAg.jpg?v=1776098468',
    ],
    [ // Column 2
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-05-0opAgBbn5VhPicPurDiUPK1aLIk.jpg?v=1776098468',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-06-rwVokqRt0PQA9WuJRTOYtaREBs.jpg?v=1776098475',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-07-RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg?v=1776098469',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-08-6f5ryzjmmK15bl66yOGnKuUm9kU.jpg?v=1776098472',
    ],
    [ // Column 3 (center)
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-09-N8wCGjeLz7UhR7u8I2vheQO5iGI.jpg?v=1776098468',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-10-hKIXRnBHXi3BqsH7hPMLBWPsrg.jpg?v=1776098476',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-11-ScmcmQYBWSK01i1zUpGkfuog.jpg?v=1776098476',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-12-ckxQ3CnXt7t4fXmpYCa5suITG0k.jpg?v=1776098475',
    ],
    [ // Column 4
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-13-gQ2EefMmKTZenibE6p2qjF1ug.jpg?v=1776098474',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-14-dlOppuDRRNOuhdOxT4jkgRrSQ.jpg?v=1776098468',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-15-6A0UbuAYozvJAd8k5ue9gVKaTjQ.jpg?v=1776098474',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-05-0opAgBbn5VhPicPurDiUPK1aLIk.jpg?v=1776098468',
    ],
    [ // Column 5
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-07-RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg?v=1776098469',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-02-WGGQn50FvNh0FWeksRGwGc8HBD8.jpg?v=1776098476',
      'https://cdn.shopify.com/s/files/1/0688/7591/1222/files/gallery-08-6f5ryzjmmK15bl66yOGnKuUm9kU.jpg?v=1776098472',
    ],
  ],
};

export default config;
