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
     category    premiere | aftereffects | packs | discord | diamond
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
  { id: 'v1', category: 'premiere', title: 'V1', desc: 'Professional Quality Method.', price: '$20', badge: 'POPULAR', image: 'Quality/V1.webp' },
  { id: 'v1-1', category: 'premiere', title: 'V1.1', desc: 'Old Quality Method.', price: '$18', image: 'Quality/V1.1.webp' },
  { id: 'v2', category: 'premiere', title: 'V2', desc: 'Ultimate Version.', price: '$20', image: 'Quality/V2.webp' },
  { id: 'v2-1', category: 'premiere', title: 'V2.1', desc: 'Professional Quality Method.', price: '$15', image: 'Quality/V2.1.webp' },
  { id: 'v3', category: 'premiere', title: 'V3', desc: 'Premium Editing Quality.', price: '$20', image: 'Quality/V3.webp' },
  { id: 'v3-1', category: 'premiere', title: 'V3.1', desc: 'Premium Editing Quality.', price: '$25', badge: 'BEST', badgeStyle: 'hot', image: 'Quality/V3.1.webp' },
  { id: 'v4', category: 'premiere', title: 'V4', desc: 'Advanced Premiere Method.', price: '$20', image: 'Quality/V4.webp' },
  { id: 'v4-1', category: 'premiere', title: 'V4.1', desc: 'Updated Version.', price: '$15', image: 'Quality/V4.1.webp' },
  { id: 'v5', category: 'premiere', title: 'V5', desc: 'Special Gift when you buy more than one quality.', price: 'Gift', badge: 'GIFT', badgeStyle: 'gift', image: 'Quality/V5.webp' },
  { id: 'v5-1', category: 'premiere', title: 'V5.1', desc: 'Optimized Method.', price: '$15', image: 'Quality/V5.1.webp' },
  { id: 'v6', category: 'premiere', title: 'V6', desc: 'Budget Version.', price: '$10', image: 'Quality/V6.webp' },
  { id: 'v7', category: 'premiere', title: 'V7', desc: 'Professional Quality.', price: '$15', image: 'Quality/V7.webp' },
  { id: 'v7-1', category: 'premiere', title: 'V7.1', desc: 'Best Quality.', price: '$20', image: 'Quality/V7.1.webp' },

  /* ── After Effects ────────────────────────────────────────────── */
  { id: 'ae-best', category: 'aftereffects', title: 'AE Best CC', desc: 'Professional Quality Method.', price: '$25', badge: 'TOP', image: 'Quality/After Effect Best CC.webp' },
  { id: 'ae-4k', category: 'aftereffects', title: 'AE 4K CC', desc: '4K Quality Method.', price: '$20', image: 'Quality/After Effect 4K CC.webp' },
  { id: 'ae-cold', category: 'aftereffects', title: 'AE COLD CC', desc: 'Cold Quality Method.', price: '$15', image: 'Quality/After Cold CC.webp' },
  { id: 'ae-joyboy', category: 'aftereffects', title: 'AE JOYBOY CC', desc: 'Joyboy Quality Method.', price: '$25', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/After Cold CC.webp' },
  { id: 'ae-line', category: 'aftereffects', title: 'Line Transition By Joyboy', desc: 'Line Transition With Your Custom Name.', price: '$5', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Line.webp' },
  { id: 'ae-shake', category: 'aftereffects', title: 'Shakes By Joyboy', desc: 'Pack Of Ultimate Shakes! +70 Shake.', price: '$5', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Shake.webp' },
  { id: 'ae-zoom', category: 'aftereffects', title: 'Zooms By Joyboy', desc: 'Pack Of Ultimate Zooms! +50 Zoom.', price: '$5', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Zoom.webp' },
  { id: 'ae-shatter', category: 'aftereffects', title: 'Shatters By Joyboy', desc: 'Pack Of Ultimate Shatters! +10 Shatter.', price: '$5', badge: 'NEW', badgeStyle: 'hot', image: 'Quality/Shatter.webp' },

  /* ── Packs ────────────────────────────────────────────────────── */
  { id: 'pack-pp', category: 'packs', title: 'Premiere Pro Full Pack', desc: 'Contains 20+ Quality presets, effects and more.', price: '$150', badge: 'VALUE', image: 'Quality/Premiere Pro Pack.webp' },
  { id: 'pack-ae', category: 'packs', title: 'After Effect Full Pack', desc: 'Contains 100+ CC, shakes, zooms, transitions and more.', price: '$100', image: 'Quality/After Effect Pack.webp' },
  { id: 'pack-full', category: 'packs', title: 'Full Pack', desc: 'The complete Joyboy Team full pack.', price: '$250', badge: 'ULTIMATE', badgeStyle: 'hot', image: 'Quality/Full Pack.webp' },

  /* ── Free Fire Diamonds ───────────────────────────────────────── */
  { id: 'ff-100', category: 'diamond', title: '100 Diamonds', desc: 'Free Fire top-up - 100 diamonds.', price: '5 DT', badge: 'POPULAR', icon: 'fas fa-gem', amount: '100', caption: 'Diamonds' },
  { id: 'ff-310', category: 'diamond', title: '310 Diamonds', desc: 'Free Fire top-up - 310 diamonds.', price: '15 DT', icon: 'fas fa-gem', amount: '310', caption: 'Diamonds' },
  { id: 'ff-520', category: 'diamond', title: '520 Diamonds', desc: 'Free Fire top-up - 520 diamonds.', price: '25 DT', icon: 'fas fa-gem', amount: '520', caption: 'Diamonds' },
  { id: 'ff-1060', category: 'diamond', title: '1060 Diamonds', desc: 'Free Fire top-up - 1060 diamonds.', price: '50 DT', badge: 'BEST VALUE', badgeStyle: 'hot', icon: 'fas fa-gem', amount: '1060', caption: 'Diamonds' },
  { id: 'ff-2180', category: 'diamond', title: '2180 Diamonds', desc: 'Free Fire top-up - 2180 diamonds.', price: '100 DT', icon: 'fas fa-gem', amount: '2180', caption: 'Diamonds' },

  /* ── Discord ──────────────────────────────────────────────────── */
  { id: 'dc-nitro', category: 'discord', title: 'Discord Nitro', desc: 'Full Nitro subscription activated on your own account.', price: '$10', badge: 'POPULAR', icon: 'fab fa-discord', caption: 'Nitro', amount: '' },
  { id: 'dc-boost', category: 'discord', title: 'Server Boost 14', desc: '14 server boosts - pushes your server straight to level 3.', price: '$10', icon: 'fab fa-discord', caption: 'Boost x14' }
];
