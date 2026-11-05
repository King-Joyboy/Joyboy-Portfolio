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

    var STORAGE_KEY = 'joyboyStoreCatalog_v2';
    var PAYMENT_STORAGE_KEY = 'joyboyStorePayments_v1';
    var BUY_URL = 'https://discord.gg/jHq6Ye6Qhj';

    var CATEGORIES = [
        { id: 'premiere', name: 'Premiere Pro', icon: 'fas fa-film' },
        { id: 'aftereffects', name: 'After Effects', icon: 'fas fa-wand-magic-sparkles' },
        { id: 'packs', name: 'Packs', icon: 'fas fa-box-open' },
        { id: 'ai', name: 'AI', icon: 'fas fa-robot' },
        { id: 'diamond', name: 'Free Fire Diamonds', icon: 'fas fa-gem' },
        { id: 'discord', name: 'Discord', icon: 'fab fa-discord' }
    ];

    var PAYMENT_STYLES = [
        { id: 'binance', name: 'Binance (Yellow)', icon: 'fas fa-coins', accent: 'binance' },
        { id: 'orange', name: 'Orange', icon: 'fas fa-mobile-screen-button', accent: 'orange' },
        { id: 'ooredoo', name: 'Ooredoo (Red)', icon: 'fas fa-sim-card', accent: 'ooredoo' },
        { id: 'd17', name: 'D17 (Gold)', icon: 'fas fa-wallet', accent: 'd17' },
        { id: 'bank', name: 'Bank Transfer (Blue)', icon: 'fas fa-building-columns', accent: 'bank' },
        { id: 'visa', name: 'Visa / Card (Indigo)', icon: 'fab fa-cc-visa', accent: 'visa' },
        { id: 'paypal', name: 'PayPal (Cyan)', icon: 'fab fa-paypal', accent: 'paypal' },
        { id: 'green', name: 'Cash / Green', icon: 'fas fa-money-bill-wave', accent: 'green' },
        { id: 'purple', name: 'Crypto / Purple', icon: 'fab fa-bitcoin', accent: 'purple' },
        { id: 'red', name: 'Custom (Red)', icon: 'fas fa-credit-card', accent: 'red' }
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
            var list = sanitise(JSON.parse(raw));
            if (!list) return null;
            /* If new default categories (such as AI) were added to products-data.js
               after localStorage was first saved, append their default items so
               they appear right away without losing existing edits. */
            var defs = defaults();
            var hasAi = false;
            for (var i = 0; i < list.length; i++) {
                if (list[i].category === 'ai') {
                    hasAi = true;
                    break;
                }
            }
            if (!hasAi) {
                for (var d = 0; d < defs.length; d++) {
                    if (defs[d].category === 'ai') list.push(defs[d]);
                }
            }
            return list;
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

    /* Rough size of what the catalogue + payments take in localStorage. */
    function storedBytes() {
        try {
            var a = (window.localStorage.getItem(STORAGE_KEY) || '').length;
            var b = (window.localStorage.getItem(PAYMENT_STORAGE_KEY) || '').length;
            return a + b;
        } catch (err) {
            return 0;
        }
    }

    /* ── Payment Methods Storage ─────────────────────────────────── */

    function isValidPayment(m) {
        return !!m &&
            typeof m === 'object' &&
            typeof m.id === 'string' && m.id !== '' &&
            typeof m.title === 'string' && m.title !== '';
    }

    function sanitisePayments(list) {
        if (Object.prototype.toString.call(list) !== '[object Array]') return null;
        var out = [];
        for (var i = 0; i < list.length; i++) {
            var m = list[i];
            if (!isValidPayment(m)) return null;
            out.push({
                id: String(m.id),
                title: String(m.title),
                tag: typeof m.tag === 'string' ? m.tag : '',
                desc: typeof m.desc === 'string' ? m.desc : '',
                detail: typeof m.detail === 'string' ? m.detail : '',
                fee: typeof m.fee === 'string' ? m.fee : '',
                icon: typeof m.icon === 'string' && m.icon ? m.icon : 'fas fa-credit-card',
                accent: typeof m.accent === 'string' ? m.accent : 'red',
                hidden: m.hidden === true
            });
        }
        return out;
    }

    function defaultPayments() {
        return clone(window.JB_PAYMENTS || []);
    }

    function readPayments() {
        try {
            var raw = window.localStorage.getItem(PAYMENT_STORAGE_KEY);
            if (!raw) return null;
            return sanitisePayments(JSON.parse(raw));
        } catch (err) {
            return null;
        }
    }

    function loadPayments() {
        return readPayments() || defaultPayments();
    }

    function savePayments(list) {
        var clean = sanitisePayments(list);
        if (!clean) return { ok: false, error: 'Invalid payment methods list.' };
        try {
            window.localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(clean));
            return { ok: true };
        } catch (err) {
            var full = err && (err.name === 'QuotaExceededError' || err.code === 22);
            return {
                ok: false,
                error: full
                    ? 'Browser storage is full.'
                    : 'Could not save: ' + (err && err.message ? err.message : 'storage unavailable')
            };
        }
    }

    function clearPayments() {
        try {
            window.localStorage.removeItem(PAYMENT_STORAGE_KEY);
        } catch (err) {
            /* storage disabled */
        }
    }

    function isPaymentsCustomised() {
        return readPayments() !== null;
    }

    function buildPaymentCard(m) {
        var card = el('div', 'payment-card reveal');

        var iconWrap = el('div', 'payment-icon' + (m.accent ? ' ' + m.accent : ''));
        var icon = el('i', m.icon || 'fas fa-credit-card');
        icon.setAttribute('aria-hidden', 'true');
        iconWrap.appendChild(icon);
        card.appendChild(iconWrap);

        card.appendChild(el('h3', '', m.title));
        if (m.tag) card.appendChild(el('span', 'payment-tag', m.tag));
        if (m.desc) card.appendChild(el('p', '', m.desc));
        if (m.detail) card.appendChild(el('div', 'payment-detail', m.detail));

        if (m.fee) {
            var fee = el('div', 'payment-fee');
            var plus = el('i', 'fas fa-plus');
            plus.setAttribute('aria-hidden', 'true');
            fee.appendChild(plus);
            fee.appendChild(document.createTextNode(' ' + m.fee));
            card.appendChild(fee);
        }

        return card;
    }

    function mountPayments(root) {
        var scope = root || document;
        var grids = scope.querySelectorAll('[data-payment-grid], .payment-grid');
        var payments = loadPayments();

        for (var g = 0; g < grids.length; g++) {
            var grid = grids[g];
            var count = 0;
            while (grid.firstChild) grid.removeChild(grid.firstChild);

            for (var i = 0; i < payments.length; i++) {
                if (payments[i].hidden) continue;
                grid.appendChild(buildPaymentCard(payments[i]));
                count++;
            }

            if (!count) {
                grid.appendChild(el('p', 'cards-empty', 'No payment methods configured yet.'));
            }
        }

        return payments;
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
                preview.classList.add('loaded');
            };
            var handleError = function () {
                preview.classList.add('loaded', 'art-tile');
                preview.innerHTML = '';
                var fallbackIcon = el('i', p.icon || 'fas fa-box-open');
                fallbackIcon.setAttribute('aria-hidden', 'true');
                preview.appendChild(fallbackIcon);
                if (p.amount) preview.appendChild(el('div', 'art-tile-figure', p.amount));
                if (p.caption) preview.appendChild(el('div', 'art-tile-caption', p.caption));
            };
            img.addEventListener('load', reveal);
            img.addEventListener('error', handleError);
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
        } else if (String(p.price || '').indexOf('|') !== -1) {
            var parts = String(p.price).split('|');
            price.appendChild(el('span', 'price-usd', parts[0].trim()));
            price.appendChild(el('span', 'price-sep', '|'));
            price.appendChild(el('span', 'price-dt', parts.slice(1).join('|').trim()));
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

        mountPayments(scope);
        return list;
    }

    /* ── Export / import (used by the staff panel) ───────────────── */

    function toSource(list, paymentsList) {
        var stamp = new Date().toISOString().slice(0, 10);
        var payments = paymentsList || loadPayments();
        return '/* ══════════════════════════════════════════════════════════════════\n' +
            '   JOYBOY STORE — PRODUCT CATALOGUE & PAYMENT METHODS\n' +
            '   Generated by the staff panel on ' + stamp + '.\n' +
            '   Replace Store/products-data.js with this file to publish it.\n' +
            '   ══════════════════════════════════════════════════════════════════ */\n' +
            'window.JB_PRODUCTS = ' + JSON.stringify(list, null, 2) + ';\n\n' +
            'window.JB_PAYMENTS = ' + JSON.stringify(payments, null, 2) + ';\n';
    }

    /* Accepts a raw JSON array or a products-data.js file. */
    function fromSource(text) {
        var raw = String(text || '').trim();
        if (!raw) return null;

        var parsed = null;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            var prodMarker = raw.indexOf('window.JB_PRODUCTS');
            var searchFrom = prodMarker !== -1 ? prodMarker : 0;
            var start = raw.indexOf('[', searchFrom);
            var end = -1;
            if (start !== -1) {
                var depth = 0;
                var inStr = false;
                var esc = false;
                for (var i = start; i < raw.length; i++) {
                    var ch = raw[i];
                    if (esc) { esc = false; continue; }
                    if (ch === '\\') { esc = true; continue; }
                    if (ch === '"') { inStr = !inStr; continue; }
                    if (!inStr) {
                        if (ch === '[') depth++;
                        else if (ch === ']') {
                            depth--;
                            if (depth === 0) { end = i; break; }
                        }
                    }
                }
            }
            if (start === -1 || end <= start) return null;
            try {
                parsed = JSON.parse(raw.slice(start, end + 1));
            } catch (err2) {
                return null;
            }
        }
        return sanitise(parsed);
    }

    function paymentsFromSource(text) {
        var raw = String(text || '').trim();
        if (!raw) return null;

        var parsed = null;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            var payMarker = raw.indexOf('window.JB_PAYMENTS');
            if (payMarker === -1) return null;
            var start = raw.indexOf('[', payMarker);
            var end = -1;
            if (start !== -1) {
                var depth = 0;
                var inStr = false;
                var esc = false;
                for (var i = start; i < raw.length; i++) {
                    var ch = raw[i];
                    if (esc) { esc = false; continue; }
                    if (ch === '\\') { esc = true; continue; }
                    if (ch === '"') { inStr = !inStr; continue; }
                    if (!inStr) {
                        if (ch === '[') depth++;
                        else if (ch === ']') {
                            depth--;
                            if (depth === 0) { end = i; break; }
                        }
                    }
                }
            }
            if (start === -1 || end <= start) return null;
            try {
                parsed = JSON.parse(raw.slice(start, end + 1));
            } catch (err2) {
                return null;
            }
        }
        return sanitisePayments(parsed);
    }

    return {
        STORAGE_KEY: STORAGE_KEY,
        PAYMENT_STORAGE_KEY: PAYMENT_STORAGE_KEY,
        BUY_URL: BUY_URL,
        CATEGORIES: CATEGORIES,
        PAYMENT_STYLES: PAYMENT_STYLES,
        categoryName: categoryName,
        defaults: defaults,
        read: read,
        load: load,
        save: save,
        clear: clear,
        isCustomised: isCustomised,
        defaultPayments: defaultPayments,
        readPayments: readPayments,
        loadPayments: loadPayments,
        savePayments: savePayments,
        clearPayments: clearPayments,
        isPaymentsCustomised: isPaymentsCustomised,
        storedBytes: storedBytes,
        uid: uid,
        buildCard: buildCard,
        buildPreview: buildPreview,
        buildPaymentCard: buildPaymentCard,
        mount: mount,
        mountPayments: mountPayments,
        toSource: toSource,
        fromSource: fromSource,
        paymentsFromSource: paymentsFromSource
    };
})();
