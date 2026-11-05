/* ══════════════════════════════════════════════════════════════════
   JOYBOY STORE — PRODUCT CATALOGUE
   ──────────────────────────────────────────────────────────────────
   This file is the shop data that Store/index.html renders.

   To change it you have two options:
   1. Open Store/admin.html, edit visually, press
      "Download products-data.js" and replace this file with it.
   2. Edit the list below by hand (keep the same field names).

   Fields
     id          unique id, never reuse one
     category    premiere | aftereffects | packs | ai | discord | diamond
     title       product name
     desc        short description
     price       free text: "$20", "5 DT", "Gift" ("Gift" gets a green badge)
     badge       optional corner label, e.g. "POPULAR"
     badgeStyle  '' (red) | 'hot' (orange) | 'gift' (green)
     image       path to the preview picture, e.g. "Quality/V1.webp"
     icon        fallback Font Awesome class when there is no image
     amount      big figure shown on the fallback preview (diamonds)
     caption     small caption under the figure
     hidden      true = not shown on the store page
   ══════════════════════════════════════════════════════════════════ */
window.JB_PRODUCTS = [
  /* ── Premiere Pro ─────────────────────────────────────────────── */
  { id: 'v1', category: 'premiere', title: 'V1', desc: 'Professional Quality Method.', price: '20$ | 60 DT', badge: 'POPULAR', image: 'Quality/V1.webp' },
  { id: 'v1-1', category: 'premiere', title: 'V1.1', desc: 'Old Quality Method.', price: '18$ | 55 DT', image: 'Quality/V1.1.webp' },
  { id: 'v2', category: 'premiere', title: 'V2', desc: 'Ultimate Version.', price: '20$ | 60 DT', image: 'Quality/V2.webp' },
  { id: 'v2-1', category: 'premiere', title: 'V2.1', desc: 'Professional Quality Method.', price: '15$ | 45 DT', image: 'Quality/V2.1.webp' },
  { id: 'v3', category: 'premiere', title: 'V3', desc: 'Premium Editing Quality.', price: '20$ | 60 DT', image: 'Quality/V3.webp' },
  { id: 'v3-1', category: 'premiere', title: 'V3.1', desc: 'Premium Editing Quality.', price: '25$ | 75 DT', badge: 'BEST', badgeStyle: 'hot', image: 'Quality/V3.1.webp' },
  { id: 'v4', category: 'premiere', title: 'V4', desc: 'Advanced Premiere Method.', price: '20$ | 60 DT', image: 'Quality/V4.webp' },
  { id: 'v4-1', category: 'premiere', title: 'V4.1', desc: 'Updated Version.', price: '15$ | 45 DT', image: 'Quality/V4.1.webp' },
  { id: 'v5', category: 'premiere', title: 'V5', desc: 'Special Gift when you buy more than one quality.', price: 'Gift', badge: 'GIFT', badgeStyle: 'gift', image: 'Quality/V5.webp' },
  { id: 'v5-1', category: 'premiere', title: 'V5.1', desc: 'Optimized Method.', price: '15$ | 45 DT', image: 'Quality/V5.1.webp' },
  { id: 'v6', category: 'premiere', title: 'V6', desc: 'Budget Version.', price: '10$ | 30 DT', image: 'Quality/V6.webp' },
  { id: 'v7', category: 'premiere', title: 'V7', desc: 'Professional Quality.', price: '15$ | 45 DT', image: 'Quality/V7.webp' },
  { id: 'v7-1', category: 'premiere', title: 'V7.1', desc: 'Best Quality.', price: '20$ | 60 DT', image: 'Quality/V7.1.webp' },

  /* ── After Effects ────────────────────────────────────────────── */
  { id: 'ae-best', category: 'aftereffects', title: 'AE Best CC', desc: 'Professional Quality Method.', price: '25$ | 75 DT', badge: 'TOP', image: 'Quality/After Effect Best CC.webp' },
  { id: 'ae-4k', category: 'aftereffects', title: 'AE 4K CC', desc: '4K Quality Method.', price: '20$ | 60 DT', image: 'Quality/After Effect 4K CC.webp' },
  { id: 'ae-cold', category: 'aftereffects', title: 'AE COLD CC', desc: 'Cold Quality Method.', price: '15$ | 45 DT', image: 'Quality/After Cold CC.webp' },
  { id: 'ae-joyboy', category: 'aftereffects', title: 'AE JOYBOY CC', desc: 'Joyboy Quality Method.', price: '25$ | 75 DT', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/After Cold CC.webp' },
  { id: 'ae-line', category: 'aftereffects', title: 'Line Transition By Joyboy', desc: 'Line Transition With Your Custom Name.', price: '5$ | 15 DT', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Line.webp' },
  { id: 'ae-shake', category: 'aftereffects', title: 'Shakes By Joyboy', desc: 'Pack Of Ultimate Shakes! +70 Shake.', price: '5$ | 15 DT', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Shake.webp' },
  { id: 'ae-zoom', category: 'aftereffects', title: 'Zooms By Joyboy', desc: 'Pack Of Ultimate Zooms! +50 Zoom.', price: '5$ | 15 DT', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Zoom.webp' },
  { id: 'ae-shatter', category: 'aftereffects', title: 'Shatters By Joyboy', desc: 'Pack Of Ultimate Shatters! +10 Shatter.', price: '5$ | 15 DT', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Shatter.webp' },

  /* ── Packs ────────────────────────────────────────────────────── */
  { id: 'pack-pp', category: 'packs', title: 'Premiere Pro Full Pack', desc: 'Contains 20+ Quality presets, effects and more.', price: '150$ | 450 DT', badge: 'VALUE', image: 'Quality/Premiere Pro Pack.webp' },
  { id: 'pack-ae', category: 'packs', title: 'After Effect Full Pack', desc: 'Contains 100+ CC, shakes, zooms, transitions and more.', price: '100$ | 300 DT', image: 'Quality/After Effect Pack.webp' },
  { id: 'pack-full', category: 'packs', title: 'Full Pack', desc: 'The complete Joyboy Team full pack.', price: '250$ | 750 DT', badge: 'ULTIMATE', badgeStyle: 'hot', image: 'Quality/Full Pack.webp' },

  /* ── AI ───────────────────────────────────────────────────────── */
  { id: 'ai-google-one', category: 'ai', title: 'Google One (Gemini)', desc: 'Google One pack with Gemini Advanced AI and cloud storage.', price: '10$ | 30 DT', badge: 'POPULAR', icon: 'fab fa-google', amount: 'GEMINI', caption: 'Google One Pack' },
  { id: 'ai-chatgpt', category: 'ai', title: 'ChatGPT', desc: 'ChatGPT Plus subscription with full access to advanced OpenAI models.', price: '15$ | 45 DT', badge: 'HOT', badgeStyle: 'hot', icon: 'fas fa-robot', amount: 'GPT', caption: 'ChatGPT Plus' },
  { id: 'ai-claude', category: 'ai', title: 'Claude', desc: 'Claude Pro subscription for advanced AI reasoning, writing and coding.', price: '15$ | 45 DT', badge: 'NEW', badgeStyle: 'hot', icon: 'fas fa-brain', amount: 'CLAUDE', caption: 'Claude Pro' },

  /* ── Free Fire Diamonds ───────────────────────────────────────── */
  { id: 'ff-100', category: 'diamond', title: '100 Diamonds', desc: 'Free Fire top-up - 100 diamonds.', price: '1.5$ | 5 DT', badge: 'POPULAR', icon: 'fas fa-gem', amount: '100', caption: 'Diamonds' },
  { id: 'ff-310', category: 'diamond', title: '310 Diamonds', desc: 'Free Fire top-up - 310 diamonds.', price: '5$ | 15 DT', icon: 'fas fa-gem', amount: '310', caption: 'Diamonds' },
  { id: 'ff-520', category: 'diamond', title: '520 Diamonds', desc: 'Free Fire top-up - 520 diamonds.', price: '8$ | 25 DT', icon: 'fas fa-gem', amount: '520', caption: 'Diamonds' },
  { id: 'ff-1060', category: 'diamond', title: '1060 Diamonds', desc: 'Free Fire top-up - 1060 diamonds.', price: '16$ | 50 DT', badge: 'BEST VALUE', badgeStyle: 'hot', icon: 'fas fa-gem', amount: '1060', caption: 'Diamonds' },
  { id: 'ff-2180', category: 'diamond', title: '2180 Diamonds', desc: 'Free Fire top-up - 2180 diamonds.', price: '32$ | 100 DT', icon: 'fas fa-gem', amount: '2180', caption: 'Diamonds' },

  /* ── Discord ──────────────────────────────────────────────────── */
  { id: 'dc-nitro', category: 'discord', title: 'Discord Nitro', desc: 'Full Nitro subscription activated on your own account.', price: '10$ | 30 DT', badge: 'POPULAR', icon: 'fab fa-discord', caption: 'Nitro', amount: '' },
  { id: 'dc-boost', category: 'discord', title: 'Server Boost 14', desc: '14 server boosts - pushes your server straight to level 3.', price: '10$ | 30 DT', icon: 'fab fa-discord', caption: 'Boost x14' }
];

/* ══════════════════════════════════════════════════════════════════
   JOYBOY STORE — PAYMENT METHODS
   ──────────────────────────────────────────────────────────────────
   Drives the "How To Pay" section in Store/index.html.
   Can be edited visually in Store/admin.html → "Payment methods" tab.
   ══════════════════════════════════════════════════════════════════ */
window.JB_PAYMENTS = [
  {
    id: 'orange',
    title: 'Orange',
    tag: 'Carte de recharge',
    desc: 'Buy an Orange recharge card covering the order plus the fee, then send the card code in your ticket.',
    detail: 'Carte de recharge Orange',
    fee: '25% fees on the order amount',
    icon: 'fas fa-mobile-screen-button',
    accent: 'orange'
  },
  {
    id: 'ooredoo',
    title: 'Ooredoo',
    tag: 'Carte de recharge',
    desc: 'Same as Orange - buy an Ooredoo recharge card covering the order plus the fee and send the code.',
    detail: 'Carte de recharge Ooredoo',
    fee: '25% fees on the order amount',
    icon: 'fas fa-sim-card',
    accent: 'ooredoo'
  },
  {
    id: 'd17',
    title: 'D17',
    tag: 'La Poste Tunisienne',
    desc: 'Top up the D17 wallet below and keep the transaction ID. No extra fees.',
    detail: '23621140',
    fee: '',
    icon: 'fas fa-wallet',
    accent: 'd17'
  },
  {
    id: 'binance',
    title: 'Binance',
    tag: 'Binance Pay / USDT',
    desc: 'Pay instantly via Binance Pay or USDT transfer with zero extra fees, then send the screenshot in your ticket.',
    detail: 'Binance ID in Discord ticket',
    fee: '',
    icon: 'fas fa-coins',
    accent: 'binance'
  },
  {
    id: 'bank',
    title: 'Virement Bancaire',
    tag: 'Bank Transfer',
    desc: 'Bank transfer (virement) - account details sent with the ticket if needed.',
    detail: 'Details in Discord ticket',
    fee: '',
    icon: 'fas fa-building-columns',
    accent: 'bank'
  },
  {
    id: 'visa',
    title: 'Visa / Mastercard',
    tag: 'Card Payment',
    desc: 'Secure card payment link, sent inside your Discord ticket on request.',
    detail: 'Link delivered via Discord',
    fee: '',
    icon: 'fab fa-cc-visa',
    accent: 'visa'
  }
];
