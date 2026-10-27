/* ══════════════════════════════════════════════════════════════════
   JOYBOY STORE — SHARED PRODUCT LAYER
   Loaded by Store/index.html (renders the shop) and by
   Store/admin.html (staff panel).

   Data sources, in order of priority:
     1. localStorage  → the edits the staff makes in the admin panel,
                        visible instantly in that same browser.
     2. products-data.js → the published catalogue every visitor sees.
   ══════════════════════════════════════════════════════════════════ */
window.JBStore = (function () {
    'use strict';

    var STORAGE_KEY = 'joyboyStoreCatalog_v1';
    var BUY_URL = 'https://discord.gg/jHq6Ye6Qhj';

    var CATEGORIES = [
        { id: 'premiere', name: 'Premiere Pro', icon: 'fas fa-film' },
        { id: 'aftereffects', name: 'After Effects', icon: 'fas fa-wand-magic-sparkles' },
        { id: 'packs', name: 'Packs', icon: 'fas fa-box-open' },
        { id: 'diamond', name: 'Free Fire Diamonds', icon: 'fas fa-gem' },
        { id: 'discord', name: 'Discord', icon: 'fab fa-discord' }
    ];

    /* ── Helpers ─────────────────────────────────────────────────── */

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function clone(list) {
        return JSON.parse(JSON.stringify(list));
    }

    function categoryExists(id) {
        for (var i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].id === id) return true;
        }
        return false;
    }

    function categoryName(id) {
        for (var i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].id === id) return CATEGORIES[i].name;
        }
        return id;
    }

    /* A product is only accepted when it has everything the cards need,
       so a damaged storage entry can never break the store page. */
    function isValid(p) {
        return !!p &&
            typeof p === 'object' &&
            typeof p.id === 'string' && p.id !== '' &&
            typeof p.title === 'string' && p.title !== '' &&
            categoryExists(p.category);
    }

    function sanitise(list) {
        if (Object.prototype.toString.call(list) !== '[object Array]') return null;
        var out = [];
        for (var i = 0; i < list.length; i++) {
            if (!isValid(list[i])) return null;
            out.push(list[i]);
        }
        return out;
    }

    function uid() {
        return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
    }

    /* ── Storage ─────────────────────────────────────────────────── */

    function defaults() {
        return clone(window.JB_PRODUCTS || []);
    }

    function read() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return sanitise(JSON.parse(raw));
        } catch (err) {
            return null;
        }
    }

    function load() {
        return read() || defaults();
    }

    function save(list) {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            return { ok: true };
        } catch (err) {
            var full = err && (err.name === 'QuotaExceededError' || err.code === 22);
            return {
                ok: false,
                error: full
                    ? 'Browser storage is full. Delete a product with an uploaded image, or use an image path instead of an upload.'
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

    /* Rough size of what the catalogue takes in localStorage. */
    function storedBytes() {
        try {
            return (window.localStorage.getItem(STORAGE_KEY) || '').length;
        } catch (err) {
            return 0;
        }
    }

    /* ── Cards ───────────────────────────────────────────────────── */

    function buildPreview(p) {
        var preview = el('div', 'preview');

        if (p.image) {
            var img = document.createElement('img');
            img.alt = p.title + ' preview';
            img.loading = 'lazy';
            img.decoding = 'async';
            var reveal = function () {
                img.classList.add('loaded');
                img.setAttribute('data-loaded', 'true');
            };
            img.addEventListener('load', reveal);
            img.addEventListener('error', reveal);
            img.src = p.image;
            if (img.complete && img.naturalWidth) reveal();
            preview.appendChild(img);

            var overlay = el('div', 'preview-overlay');
            overlay.innerHTML = '<i class="fas fa-eye" aria-hidden="true"></i>';
            preview.appendChild(overlay);
            return preview;
        }

        /* No photo → illustrated tile (diamonds, Discord, new products) */
        preview.className = 'preview art-tile';
        var icon = el('i', p.icon || 'fas fa-box-open');
        icon.setAttribute('aria-hidden', 'true');
        preview.appendChild(icon);
        if (p.amount) preview.appendChild(el('div', 'art-tile-figure', p.amount));
        if (p.caption) preview.appendChild(el('div', 'art-tile-caption', p.caption));
        return preview;
    }

    function buildCard(p) {
        var card = el('div', 'card reveal');

        if (p.badge) {
            card.appendChild(el('div', 'card-badge' + (p.badgeStyle ? ' ' + p.badgeStyle : ''), p.badge));
        }
        card.appendChild(buildPreview(p));

        var body = el('div', 'card-body');
        body.appendChild(el('h3', '', p.title));
        if (p.desc) body.appendChild(el('p', '', p.desc));

        var footer = el('div', 'card-footer');
        var gift = String(p.price || '').toLowerCase() === 'gift';
        var price = el('span', 'price' + (gift ? ' gift-price' : ''));

        if (gift) {
            var giftIcon = el('i', 'fas fa-gift');
            giftIcon.setAttribute('aria-hidden', 'true');
            price.appendChild(giftIcon);
            price.appendChild(document.createTextNode(' Gift'));
        } else {
            price.textContent = p.price || '';
        }
        footer.appendChild(price);

        var buy = document.createElement('a');
        buy.href = BUY_URL;
        buy.target = '_blank';
        buy.rel = 'noopener noreferrer';
        buy.appendChild(document.createTextNode(gift ? 'Claim ' : 'Buy Now '));
        var arrow = el('i', 'fas fa-arrow-right');
        arrow.setAttribute('aria-hidden', 'true');
        buy.appendChild(arrow);
        footer.appendChild(buy);

        body.appendChild(footer);
        card.appendChild(body);
        return card;
    }

    /* Fills every [data-grid="category"] container found in the page. */
    function mount(root) {
        var scope = root || document;
        var grids = scope.querySelectorAll('[data-grid]');
        var list = load();

        for (var g = 0; g < grids.length; g++) {
            var grid = grids[g];
            var wanted = grid.getAttribute('data-grid');
            var count = 0;

            while (grid.firstChild) grid.removeChild(grid.firstChild);

            for (var i = 0; i < list.length; i++) {
                if (list[i].category !== wanted || list[i].hidden) continue;
                grid.appendChild(buildCard(list[i]));
                count++;
            }

            if (!count) {
                grid.appendChild(el('p', 'cards-empty', 'Nothing here yet. Add a product from the staff panel.'));
            }
        }

        return list;
    }

    /* ── Export / import (used by the staff panel) ───────────────── */

    function toSource(list) {
        var stamp = new Date().toISOString().slice(0, 10);
        return '/* ══════════════════════════════════════════════════════════════════\n' +
            '   JOYBOY STORE — PRODUCT CATALOGUE\n' +
            '   Generated by the staff panel on ' + stamp + '.\n' +
            '   Replace Store/products-data.js with this file to publish it.\n' +
            '   ══════════════════════════════════════════════════════════════════ */\n' +
            'window.JB_PRODUCTS = ' + JSON.stringify(list, null, 2) + ';\n';
    }

    /* Accepts a raw JSON array or a products-data.js file. */
    function fromSource(text) {
        var raw = String(text || '').trim();
        if (!raw) return null;

        var parsed = null;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            var start = raw.indexOf('[');
            var end = raw.lastIndexOf(']');
            if (start === -1 || end <= start) return null;
            try {
                parsed = JSON.parse(raw.slice(start, end + 1));
            } catch (err2) {
                return null;
            }
        }
        return sanitise(parsed);
    }

    return {
        STORAGE_KEY: STORAGE_KEY,
        BUY_URL: BUY_URL,
        CATEGORIES: CATEGORIES,
        categoryName: categoryName,
        defaults: defaults,
        read: read,
        load: load,
        save: save,
        clear: clear,
        isCustomised: isCustomised,
        storedBytes: storedBytes,
        uid: uid,
        buildCard: buildCard,
        buildPreview: buildPreview,
        mount: mount,
        toSource: toSource,
        fromSource: fromSource
    };
})();
