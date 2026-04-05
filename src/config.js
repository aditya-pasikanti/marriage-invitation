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
    heroBg: 'https://framerusercontent.com/images/VKwTAxJTadPFJjcSoijjd7dAH0.png?format=webp',
    diyas: 'https://framerusercontent.com/images/WjFzTPZSKhcPu35iI1yXwup1p8.png?format=webp',
    temple: 'https://framerusercontent.com/images/1deqTu3xOXWaU9hMeZsUz2IvL0.png?format=webp',
    card: 'https://framerusercontent.com/images/ZrKMdp6WI7ax9IR0VJA7Ffcse4.webp',
    vinayagar: 'https://framerusercontent.com/images/uvb64QVa5gS1weQWcsq8K2041s.png?format=webp',
    garland: 'https://framerusercontent.com/images/NpoaMQsRueVleyBsPsOyW3HDNgg.png?format=webp',
    brideGroomBg: 'https://framerusercontent.com/images/vW7TzQKDGECKvSTfLWxktyWBGcA.jpg?format=webp',
    food: 'https://framerusercontent.com/images/eSCu9LZTy5Jnp77W6mCvg0F9Io.png?format=webp',
    kolam: 'https://framerusercontent.com/images/ZJuwYsHXk0HnRjJnd4JPA93gI60.png?format=webp',
    banner: 'https://framerusercontent.com/images/rRjOvPjTz2tlTxNt0USBngTEY.png?format=webp',
    couples: 'https://framerusercontent.com/images/HkGtJk9wSnZmN9N451qy8p9vpeI.png?format=webp',
    flower: 'https://framerusercontent.com/images/BgpcqMk4l313b21gEqjiSnECZPw.png?format=webp',
  },

  // ─── Gallery Images (5 columns) ───
  gallery: [
    [ // Column 1
      'https://framerusercontent.com/images/9YDV0moFkmla4ieUc4kGqCFSw6s.jpg?format=webp',
      'https://framerusercontent.com/images/WGGQn50FvNh0FWeksRGwGc8HBD8.jpg?format=webp',
      'https://framerusercontent.com/images/s3bh1wj7UhZuPw6jWlABmne9BAg.jpg?format=webp',
      'https://framerusercontent.com/images/nQd4zhBHAOPycZHYbz6qtWqUA.jpg?format=webp',
    ],
    [ // Column 2
      'https://framerusercontent.com/images/0opAgBbn5VhPicPurDiUPK1aLIk.jpg?format=webp',
      'https://framerusercontent.com/images/rwVokqRt0PQA9WuJRTOYtaREBs.jpg?format=webp',
      'https://framerusercontent.com/images/RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg?format=webp',
      'https://framerusercontent.com/images/6f5ryzjmmK15bl66yOGnKuUm9kU.jpg?format=webp',
    ],
    [ // Column 3 (center)
      'https://framerusercontent.com/images/N8wCGjeLz7UhR7u8I2vheQO5iGI.jpg?format=webp',
      'https://framerusercontent.com/images/hKIXRnBHXi3BqsH7hPMLBWPsrg.jpg?format=webp',
      'https://framerusercontent.com/images/ScmcmQYBWSK01i1zUpGkfuog.jpg?format=webp',
      'https://framerusercontent.com/images/ckxQ3CnXt7t4fXmpYCa5suITG0k.jpg?format=webp',
    ],
    [ // Column 4
      'https://framerusercontent.com/images/gQ2EefMmKTZenibE6p2qjF1ug.jpg?format=webp',
      'https://framerusercontent.com/images/dlOppuDRRNOuhdOxT4jkgRrSQ.jpg?format=webp',
      'https://framerusercontent.com/images/6A0UbuAYozvJAd8k5ue9gVKaTjQ.jpg?format=webp',
      'https://framerusercontent.com/images/0opAgBbn5VhPicPurDiUPK1aLIk.jpg?format=webp',
    ],
    [ // Column 5
      'https://framerusercontent.com/images/RdO6MWVCFTYCzG1iCNThtKY1pQ.jpg?format=webp',
      'https://framerusercontent.com/images/nQd4zhBHAOPycZHYbz6qtWqUA.jpg?format=webp',
      'https://framerusercontent.com/images/WGGQn50FvNh0FWeksRGwGc8HBD8.jpg?format=webp',
      'https://framerusercontent.com/images/6f5ryzjmmK15bl66yOGnKuUm9kU.jpg?format=webp',
    ],
  ],
};

export default config;
