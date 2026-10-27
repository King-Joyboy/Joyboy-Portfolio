/* ══════════════════════════════════════════════════════════════════
   JOYBOY PORTFOLIO — SHARED CONTENT LAYER
   Loaded by index.html (renders the page) and by Store/admin.html
   (staff panel).

   Data sources, in order of priority:
     1. localStorage  → edits made in the staff panel, visible instantly
                        in that same browser.
     2. portfolio-data.js → the published content every visitor sees.
   ══════════════════════════════════════════════════════════════════ */
window.JBPortfolio = (function () {
    'use strict';

    var STORAGE_KEY = 'joyboyPortfolio_v1';

    /* Platforms offered by the staff panel: id → icon + icon colour. */
    var PLATFORMS = [
        { id: 'store', name: 'Store', icon: 'fas fa-store', accent: '' },
        { id: 'tiktok', name: 'TikTok', icon: 'fab fa-tiktok', accent: 'tiktok' },
        { id: 'instagram', name: 'Instagram', icon: 'fab fa-instagram', accent: 'instagram' },
        { id: 'discord', name: 'Discord', icon: 'fab fa-discord', accent: 'discord' },
        { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube', accent: 'youtube' },
        { id: 'telegram', name: 'Telegram', icon: 'fab fa-telegram', accent: 'telegram' },
        { id: 'x', name: 'X / Twitter', icon: 'fab fa-x-twitter', accent: 'x' },
        { id: 'whatsapp', name: 'WhatsApp', icon: 'fab fa-whatsapp', accent: 'whatsapp' },
        { id: 'twitch', name: 'Twitch', icon: 'fab fa-twitch', accent: 'twitch' },
        { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', accent: 'facebook' },
        { id: 'globe', name: 'Website', icon: 'fas fa-globe', accent: '' },
        { id: 'custom', name: 'Custom icon', icon: '', accent: '' }
    ];

    /* ── Helpers ─────────────────────────────────────────────────── */

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function str(value) {
        return typeof value === 'string' ? value : '';
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    function isObject(value) {
        return !!value && Object.prototype.toString.call(value) === '[object Object]';
    }

    function uid() {
        return 'l' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
    }

    /* Accepts anything, always returns a renderable shape. */
    function normalise(raw) {
        if (!isObject(raw)) return null;

        var out = {
            banner: {
                image: str(raw.banner && raw.banner.image),
                alt: str(raw.banner && raw.banner.alt) || 'Banner'
            },
            profile: {
                image: str(raw.profile && raw.profile.image),
                alt: str(raw.profile && raw.profile.alt) || 'Profile photo'
            },
            title: str(raw.title) || 'JOYBOY',
            tagline: [],
            stats: [],
            links: []
        };

        if (isArray(raw.tagline)) {
            for (var t = 0; t < raw.tagline.length; t++) {
                var item = raw.tagline[t];
                if (!isObject(item)) continue;
                /* Empty rows are kept so the staff panel can finish typing,
                   they are simply skipped when the page renders. */
                out.tagline.push({ icon: str(item.icon) || 'fas fa-star', label: str(item.label) });
            }
        }

        if (isArray(raw.stats)) {
            for (var s = 0; s < raw.stats.length; s++) {
                var stat = raw.stats[s];
                if (!isObject(stat)) continue;
                var value = Math.max(0, Math.round(Number(stat.value) || 0));
                out.stats.push({ value: value, label: str(stat.label) });
            }
        }

        if (isArray(raw.links)) {
            for (var l = 0; l < raw.links.length; l++) {
                var link = raw.links[l];
                if (!isObject(link)) continue;
                out.links.push({
                    id: str(link.id) || uid(),
                    title: str(link.title),
                    subtitle: str(link.subtitle),
                    url: str(link.url),
                    icon: str(link.icon) || 'fas fa-link',
                    accent: str(link.accent),
                    footer: link.footer === true
                });
            }
        }

        return out;
    }

    /* ── Storage ─────────────────────────────────────────────────── */

    function defaults() {
        return normalise(window.JB_PORTFOLIO) || normalise({});
    }

    function read() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return normalise(JSON.parse(raw));
        } catch (err) {
            return null;
        }
    }

    function load() {
        return read() || defaults();
    }

    function save(data) {
        var clean = normalise(data);
        if (!clean) return { ok: false, error: 'Nothing to save.' };
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
            return { ok: true, data: clean };
        } catch (err) {
            var full = err && (err.name === 'QuotaExceededError' || err.code === 22);
            return {
                ok: false,
                error: full
                    ? 'Browser storage is full. Use an image path instead of an uploaded banner/photo.'
                    : 'Could not save: ' + (err && err.message ? err.message : 'storage unavailable')
            };
        }
    }

    function clear() {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
            /* storage disabled — nothing to clear */
        }
    }

    function isCustomised() {
        return read() !== null;
    }

    function storedBytes() {
        try {
            return (window.localStorage.getItem(STORAGE_KEY) || '').length;
        } catch (err) {
            return 0;
        }
    }

    /* ── Pages ───────────────────────────────────────────────────── */

    function buildCard(link) {
        var card = document.createElement('a');
        card.className = 'card reveal';
        card.href = link.url || '#';
        if (/^https?:/i.test(link.url || '')) {
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
        }

        card.appendChild(el('div', 'card-bg'));

        var content = el('div', 'card-content');

        var icon = el('div', 'icon' + (link.accent ? ' ' + link.accent : ''));
        var glyph = el('i', link.icon || 'fas fa-link');
        glyph.setAttribute('aria-hidden', 'true');
        icon.appendChild(glyph);
        icon.appendChild(el('div', 'icon-pulse'));
        content.appendChild(icon);

        var text = el('div', 'text');
        text.appendChild(el('h2', '', link.title));
        if (link.subtitle) text.appendChild(el('span', '', link.subtitle));
        content.appendChild(text);

        var arrow = el('i', 'fas fa-arrow-right arrow');
        arrow.setAttribute('aria-hidden', 'true');
        content.appendChild(arrow);

        card.appendChild(content);
        card.appendChild(el('div', 'card-border'));
        return card;
    }

    /* Rewrites the static markup of index.html with the current data,
       so the page still works (with its original content) if this
       script never runs. */
    function mount(root) {
        var doc = root || document;
        var data = load();

        var bannerImg = doc.querySelector('.banner img');
        if (bannerImg && data.banner.image) {
            bannerImg.src = data.banner.image;
            bannerImg.alt = data.banner.alt;
            var preload = doc.querySelector('link[rel="preload"][as="image"]');
            if (preload && data.banner.image.indexOf('data:') !== 0) preload.href = data.banner.image;
        }

        var logoImg = doc.querySelector('.logo img');
        if (logoImg && data.profile.image) {
            logoImg.src = data.profile.image;
            logoImg.alt = data.profile.alt;
        }

        var nameEl = doc.querySelector('.glitch');
        if (nameEl && data.title) {
            nameEl.textContent = data.title;
            nameEl.setAttribute('data-text', data.title);
        }

        var taglineEl = doc.querySelector('.tagline');
        if (taglineEl) {
            while (taglineEl.firstChild) taglineEl.removeChild(taglineEl.firstChild);
            for (var t = 0; t < data.tagline.length; t++) {
                if (!data.tagline[t].label) continue;
                if (taglineEl.firstChild) {
                    var dot = el('span', 'dot');
                    dot.setAttribute('aria-hidden', 'true');
                    taglineEl.appendChild(dot);
                }
                var wrap = el('span', 'tagline-icon');
                var icon = el('i', data.tagline[t].icon);
                icon.setAttribute('aria-hidden', 'true');
                wrap.appendChild(icon);
                taglineEl.appendChild(wrap);
                taglineEl.appendChild(el('span', '', data.tagline[t].label));
            }
        }

        var statsEl = doc.querySelector('.stats');
        if (statsEl) {
            while (statsEl.firstChild) statsEl.removeChild(statsEl.firstChild);
            for (var s = 0; s < data.stats.length; s++) {
                if (!data.stats[s].label) continue;
                if (statsEl.firstChild) {
                    var divider = el('div', 'stat-divider');
                    divider.setAttribute('aria-hidden', 'true');
                    statsEl.appendChild(divider);
                }
                var item = el('div', 'stat-item');
                var number = el('div', 'stat-number', '0');
                number.setAttribute('data-target', String(data.stats[s].value));
                item.appendChild(number);
                item.appendChild(el('div', 'stat-label', data.stats[s].label));
                statsEl.appendChild(item);
            }
        }

        var cardsEl = doc.querySelector('.cards-wrapper');
        if (cardsEl) {
            while (cardsEl.firstChild) cardsEl.removeChild(cardsEl.firstChild);
            for (var l = 0; l < data.links.length; l++) {
                if (!data.links[l].title || !data.links[l].url) continue;
                cardsEl.appendChild(buildCard(data.links[l]));
            }
        }

        var socialsEl = doc.querySelector('.footer-socials');
        if (socialsEl) {
            while (socialsEl.firstChild) socialsEl.removeChild(socialsEl.firstChild);
            for (var f = 0; f < data.links.length; f++) {
                if (!data.links[f].footer || !data.links[f].title || !data.links[f].url) continue;
                var social = document.createElement('a');
                social.href = data.links[f].url;
                social.setAttribute('aria-label', data.links[f].title);
                if (/^https?:/i.test(data.links[f].url)) {
                    social.target = '_blank';
                    social.rel = 'noopener noreferrer';
                }
                social.appendChild(el('i', data.links[f].icon));
                socialsEl.appendChild(social);
            }
        }

        return data;
    }

    /* ── Export / import (used by the staff panel) ───────────────── */

    function toSource(data) {
        var stamp = new Date().toISOString().slice(0, 10);
        return '/* ══════════════════════════════════════════════════════════════════\n' +
            '   JOYBOY PORTFOLIO — CONTENT DATA\n' +
            '   Generated by the staff panel on ' + stamp + '.\n' +
            '   Replace portfolio-data.js with this file to publish it.\n' +
            '   ══════════════════════════════════════════════════════════════════ */\n' +
            'window.JB_PORTFOLIO = ' + JSON.stringify(data, null, 2) + ';\n';
    }

    function fromSource(text) {
        var raw = String(text || '').trim();
        if (!raw) return null;

        var parsed = null;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            var start = raw.indexOf('{');
            var end = raw.lastIndexOf('}');
            if (start === -1 || end <= start) return null;
            try {
                parsed = JSON.parse(raw.slice(start, end + 1));
            } catch (err2) {
                return null;
            }
        }
        /* Reject unrelated JSON files before they can wipe the content. */
        if (!isObject(parsed)) return null;
        if (!isArray(parsed.links) && !isArray(parsed.stats) && !isArray(parsed.tagline)) return null;
        return normalise(parsed);
    }

    return {
        STORAGE_KEY: STORAGE_KEY,
        PLATFORMS: PLATFORMS,
        defaults: defaults,
        read: read,
        load: load,
        save: save,
        clear: clear,
        isCustomised: isCustomised,
        storedBytes: storedBytes,
        normalise: normalise,
        uid: uid,
        buildCard: buildCard,
        mount: mount,
        toSource: toSource,
        fromSource: fromSource
    };
})();
