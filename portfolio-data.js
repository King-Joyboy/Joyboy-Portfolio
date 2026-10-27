/* ══════════════════════════════════════════════════════════════════
   JOYBOY PORTFOLIO — CONTENT DATA
   ──────────────────────────────────────────────────────────────────
   Drives index.html (banner, profile photo, name, tagline, stats,
   link cards and footer icons).

   To change it you have two options:
   1. Open Store/admin.html → "Portfolio" tab, edit visually, press
      "Download portfolio-data.js" and replace this file with it.
   2. Edit the values below by hand.

   Image fields accept either a path ("banner.webp") or a data URL
   produced by the upload button in the staff panel.
   ══════════════════════════════════════════════════════════════════ */
window.JB_PORTFOLIO = {
  banner: { image: 'banner.webp', alt: 'JOYBOY Banner' },
  profile: { image: 'logo.webp', alt: 'JOYBOY Logo' },

  /* Big glitch name under the profile photo */
  title: 'JOYBOY',

  /* Small icons + words under the name */
  tagline: [
    { icon: 'fas fa-gamepad', label: 'Gaming' },
    { icon: 'fas fa-film', label: 'Editing' },
    { icon: 'fas fa-video', label: 'Content Creator' }
  ],

  /* Counter under the tagline (value is a plain number) */
  stats: [
    { value: 4500, label: 'TikTok' },
    { value: 6500, label: 'Instagram' },
    { value: 600, label: 'Discord Members' }
  ],

  /* Link cards, in display order.
     accent = colour variant used by the icon (tiktok, instagram, discord,
     youtube, telegram, x, whatsapp, twitch, facebook or '' for red).
     footer = true also shows it in the footer icon row. */
  links: [
    { id: 'store', title: 'Store', subtitle: 'Presets, Packs, Diamonds & Nitro', url: 'Store/index.html', icon: 'fas fa-store', accent: '', footer: false },
    { id: 'tiktok', title: 'TikTok', subtitle: '@king_joyboy17', url: 'https://tiktok.com/@king_joyboy17', icon: 'fab fa-tiktok', accent: 'tiktok', footer: true },
    { id: 'instagram', title: 'Instagram', subtitle: '@joyboy_120fps', url: 'https://instagram.com/joyboy_120fps', icon: 'fab fa-instagram', accent: 'instagram', footer: true },
    { id: 'discord', title: 'Discord Server', subtitle: 'JOYBOY Community', url: 'https://discord.gg/hg8tCag54G', icon: 'fab fa-discord', accent: 'discord', footer: true },
    { id: 'youtube', title: 'YouTube', subtitle: 'JOYBOY 120FPS', url: 'https://www.youtube.com/@JoyBoy.120fps', icon: 'fab fa-youtube', accent: 'youtube', footer: true }
  ]
};
