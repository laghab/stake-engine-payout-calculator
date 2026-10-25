/* ==========================================================================
   Praxis theme kit — one theme engine shared by every Praxis tool.

   Canonical copy lives in ~/work/projects/theme-kit/. Each site carries a
   copy (run ./sync.sh after editing); never edit a site's copy directly.

   A theme is three axes, written onto <html> before first paint:
     data-family   structure: shapes, borders, fonts, materials, motion
     data-palette  colour: three seeds per mode (bg, fg, accent [+ accent2])
     data-mode     light | dark (unset in storage = follow the OS)

   Sync: every tool lives on its own *.vercel.app origin, and browsers keep
   those strictly apart (vercel.app is a public suffix), so there is no shared
   storage. Instead the theme rides along in a `tk=` query param whenever you
   follow a link from one Praxis tool to another; the receiving tool adopts it,
   stores it, and strips it from the address bar.

   Load it as a plain (blocking) <script> in <head>, then call
   ThemeKit.mount(el) wherever the Theme button + light/dark toggle go.
   ========================================================================== */
(function () {
  'use strict';
  if (window.ThemeKit) return;

  var FAMILIES = [
    { id: 'modern',   name: 'Modern',        desc: 'Clean panels, soft depth' },
    { id: 'glass',    name: 'Liquid Glass',  desc: 'Frosted, translucent, specular' },
    { id: 'factorio', name: 'Factorio',      desc: 'Beveled frames, drag bars, orange glow', schemes: 'factorio',
      fonts: 'family=Titillium+Web:wght@400;600;700' },
    { id: 'xp',       name: 'Windows XP',    desc: 'Luna windows, bevels, Bliss', schemes: 'xp' },
    { id: 'cyber',    name: 'Cyberpunk',     desc: 'Neon edges, notches, scanlines', schemes: 'cyber',
      fonts: 'family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700' },
    { id: 'arcade',   name: 'Slots Arcade',  desc: 'Gold bevels, marquee lights', schemes: 'arcade',
      fonts: 'family=Bungee&family=Rubik:wght@400;500;600;700' }
  ];

  // Shared by Modern and Liquid Glass.
  var PALETTES = [
    { id: 'classic', name: 'Classic',
      light: { bg: '#f6f7f9', fg: '#12141a', accent: '#3457e0' },
      dark:  { bg: '#0c0e13', fg: '#edeff4', accent: '#5b7cff' } },
    { id: 'emerald', name: 'Emerald',
      light: { bg: '#f4f6f5', fg: '#12151a', accent: '#17976a' },
      dark:  { bg: '#0b0d10', fg: '#eef1f5', accent: '#3ddc97' } },
    { id: 'amber', name: 'Amber',
      light: { bg: '#faf6ee', fg: '#1c1509', accent: '#b56a00' },
      dark:  { bg: '#100c07', fg: '#f6efe4', accent: '#ffb454' } },
    { id: 'ice', name: 'Ice',
      light: { bg: '#f0f6f9', fg: '#0d1a20', accent: '#00778c' },
      dark:  { bg: '#080e12', fg: '#e6f4fa', accent: '#4dd0e1' } },
    { id: 'violet', name: 'Violet',
      light: { bg: '#f6f4fc', fg: '#170f24', accent: '#6d40d8' },
      dark:  { bg: '#0d0a14', fg: '#efe9fb', accent: '#a78bfa' } },
    { id: 'rose', name: 'Rose',
      light: { bg: '#fdf4f7', fg: '#210f16', accent: '#c2185b' },
      dark:  { bg: '#120a0d', fg: '#fbeaf0', accent: '#fb7fa8' } },
    { id: 'nord', name: 'Nord',
      light: { bg: '#eceff4', fg: '#2e3440', accent: '#5e81ac' },
      dark:  { bg: '#2e3440', fg: '#eceff4', accent: '#88c0d0' } },
    { id: 'tokyo', name: 'Tokyo Night',
      light: { bg: '#e6e7ed', fg: '#343b58', accent: '#34548a' },
      dark:  { bg: '#1a1b26', fg: '#c0caf5', accent: '#7aa2f7' } },
    { id: 'catppuccin', name: 'Catppuccin',
      light: { bg: '#eff1f5', fg: '#4c4f69', accent: '#8839ef' },
      dark:  { bg: '#1e1e2e', fg: '#cdd6f4', accent: '#cba6f7' } },
    { id: 'solarized', name: 'Solarized',
      light: { bg: '#fdf6e3', fg: '#073642', accent: '#197f78' },
      dark:  { bg: '#002b36', fg: '#eee8d5', accent: '#2aa198' } },
    { id: 'gruvbox', name: 'Gruvbox',
      light: { bg: '#fbf1c7', fg: '#3c3836', accent: '#af3a03' },
      dark:  { bg: '#282828', fg: '#ebdbb2', accent: '#fe8019' } },
    { id: 'graphite', name: 'Graphite',
      light: { bg: '#fafafa', fg: '#0a0a0a', accent: '#171717' },
      dark:  { bg: '#0a0a0a', fg: '#fafafa', accent: '#e5e5e5' } }
  ];

  // Families that only make sense in their own colours carry their own schemes.
  var SCHEMES = {
    // XP's three Luna schemes; dark is a Royale Noir-style night.
    xp: [
      { id: 'xp-blue', name: 'Luna Blue',
        light: { bg: '#ece9d8', fg: '#000000', accent: '#0a5ae0', accentFg: '#ffffff' },
        dark:  { bg: '#2a2c30', fg: '#e8e8e8', accent: '#1d4cb0', accentFg: '#ffffff' } },
      { id: 'xp-olive', name: 'Olive Green',
        light: { bg: '#ece9d8', fg: '#000000', accent: '#8aa05a', accentFg: '#ffffff' },
        dark:  { bg: '#2a2c28', fg: '#e8e8e8', accent: '#56692f', accentFg: '#ffffff' } },
      { id: 'xp-silver', name: 'Silver',
        light: { bg: '#eeedf2', fg: '#000000', accent: '#b4b3c8', accentFg: '#000000' },
        dark:  { bg: '#2a2a30', fg: '#e8e8e8', accent: '#56566a', accentFg: '#ffffff' } }
    ],
    cyber: [
      { id: 'cyber-night', name: 'Night City',
        light: { bg: '#e9e8dc', fg: '#0b0b0f', accent: '#8a7f00', accent2: '#008c9e', accentFg: '#ffffff' },
        dark:  { bg: '#07070b', fg: '#f2f2e8', accent: '#fcee0a', accent2: '#00f0ff', accentFg: '#07070b' } },
      { id: 'cyber-neon', name: 'Neon Grid',
        light: { bg: '#f1ecf7', fg: '#140a22', accent: '#b0169a', accent2: '#0077a8', accentFg: '#ffffff' },
        dark:  { bg: '#0a0614', fg: '#f4ecff', accent: '#ff2bd6', accent2: '#00e5ff', accentFg: '#0a0614' } },
      { id: 'cyber-toxic', name: 'Toxic',
        light: { bg: '#eaf1e8', fg: '#07120a', accent: '#1f8a12', accent2: '#7a1fb8', accentFg: '#ffffff' },
        dark:  { bg: '#040a06', fg: '#e6ffe9', accent: '#39ff14', accent2: '#c13bff', accentFg: '#040a06' } }
    ],
    arcade: [
      { id: 'arcade-vegas', name: 'Vegas Gold',
        light: { bg: '#fff5e3', fg: '#2a0a12', accent: '#c8102e', accent2: '#c08a00', accentFg: '#ffffff' },
        dark:  { bg: '#1a0710', fg: '#fff4de', accent: '#ffc53d', accent2: '#ff3b5c', accentFg: '#2a0a00' } },
      { id: 'arcade-neon', name: 'Neon Nights',
        light: { bg: '#fbf0ff', fg: '#23063a', accent: '#b5179e', accent2: '#0a84c6', accentFg: '#ffffff' },
        dark:  { bg: '#12062a', fg: '#fbeaff', accent: '#ff4fd8', accent2: '#3de8ff', accentFg: '#1a0030' } },
      { id: 'arcade-clover', name: 'Lucky Clover',
        light: { bg: '#f1fbf3', fg: '#062014', accent: '#12824a', accent2: '#b88a00', accentFg: '#ffffff' },
        dark:  { bg: '#04160e', fg: '#effff4', accent: '#ffd24a', accent2: '#2ee88a', accentFg: '#1c1400' } }
    ],
    // One per Space Age planet. accent = the orange hover/selection glow,
    // accent2 = the green confirm button. Light mode is a lighter steel.
    factorio: [
      { id: 'factorio-nauvis', name: 'Nauvis',
        light: { bg: '#b9b6b1', fg: '#141312', accent: '#e38500', accent2: '#3f8f45', accentFg: '#000000' },
        dark:  { bg: '#1e1d1e', fg: '#e8e3dc', accent: '#ff9f1b', accent2: '#5eb663', accentFg: '#000000' } },
      { id: 'factorio-vulcanus', name: 'Vulcanus',
        light: { bg: '#c7b3a5', fg: '#1a0d07', accent: '#c2410c', accent2: '#8f6a00', accentFg: '#ffffff' },
        dark:  { bg: '#1f1512', fg: '#f2e2d6', accent: '#ff6a1a', accent2: '#ffc14a', accentFg: '#000000' } },
      { id: 'factorio-gleba', name: 'Gleba',
        light: { bg: '#b8c1a7', fg: '#10160a', accent: '#7a7000', accent2: '#3c7a1c', accentFg: '#ffffff' },
        dark:  { bg: '#161c12', fg: '#e5ecd6', accent: '#d6c728', accent2: '#7dc242', accentFg: '#000000' } },
      { id: 'factorio-fulgora', name: 'Fulgora',
        light: { bg: '#bdb5c9', fg: '#140f1d', accent: '#6a3fd1', accent2: '#0a7fb8', accentFg: '#ffffff' },
        dark:  { bg: '#17131f', fg: '#e7e0f4', accent: '#b28cff', accent2: '#4fc3ff', accentFg: '#000000' } },
      { id: 'factorio-aquilo', name: 'Aquilo',
        light: { bg: '#b6c6d0', fg: '#0b1620', accent: '#0a6c9c', accent2: '#2f7f99', accentFg: '#ffffff' },
        dark:  { bg: '#121a20', fg: '#e2eef5', accent: '#7fd4ff', accent2: '#b8f0ff', accentFg: '#000000' } }
    ]
  };

  // Every Praxis tool; links between them carry the theme.
  var SISTERS = [
    'dashboardstake.vercel.app',
    'gamecontent.vercel.app',
    'soundjsonpreview.vercel.app',
    'spine-viewer-rho.vercel.app',
    'stake-engine-payout-calculator.vercel.app',
    'dev-inspect-omega.vercel.app'
  ];
  var DASHBOARD = 'https://dashboardstake.vercel.app/';
  var KEY = 'praxis-theme';

  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function family(id) { return byId(FAMILIES, id) || FAMILIES[0]; }
  function palettesFor(fam) {
    var f = family(fam);
    return f.schemes ? SCHEMES[f.schemes] : PALETTES;
  }
  function slotFor(fam) { return family(fam).schemes || 'general'; }
  function allPalettes() {
    return PALETTES.concat(SCHEMES.xp, SCHEMES.cyber, SCHEMES.arcade, SCHEMES.factorio);
  }
  function osMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch {}
    return null;
  }

  // ---- state -------------------------------------------------------------
  // { family, mode: 'light'|'dark'|null, pal: { general, xp, cyber, arcade } }
  function defaults() {
    return { family: 'modern', mode: null,
      pal: { general: 'classic', xp: 'xp-blue', cyber: 'cyber-night', arcade: 'arcade-vegas', factorio: 'factorio-nauvis' } };
  }

  // First visit after the kit landed: pick up whatever the site used to store.
  function migrate(s) {
    var mode = ls('gc_mode') || ls('mode') || ls('gc_theme') || ls('theme') || ls('sjp-theme');
    if (mode === 'light' || mode === 'dark') s.mode = mode;
    var fam = ls('gc_family') || ls('family');
    if (byId(FAMILIES, fam)) s.family = fam;
    var pal = ls('gc_palette') || ls('palette');
    if (byId(PALETTES, pal)) s.pal.general = pal;
    var xp = ls('gc_xp_scheme') || ls('xpScheme');
    if (byId(SCHEMES.xp, xp)) s.pal.xp = xp;
    try {
      var calc = JSON.parse(ls('stakeCalc.theme') || 'null');
      if (calc) {
        if (calc.mode === 'light' || calc.mode === 'dark') s.mode = s.mode || calc.mode;
        var map = { studio: 'modern', casino: 'arcade', glass: 'glass', cyber: 'cyber' };
        if (map[calc.family] && s.family === 'modern') s.family = map[calc.family];
        if (byId(PALETTES, calc.palette)) s.pal.general = calc.palette;
      }
    } catch {}
    return s;
  }

  function load() {
    var s = defaults();
    var raw = ls(KEY);
    if (!raw) return migrate(s);
    try {
      var got = JSON.parse(raw);
      if (byId(FAMILIES, got.family)) s.family = got.family;
      if (got.mode === 'light' || got.mode === 'dark') s.mode = got.mode;
      if (got.pal) {
        if (byId(PALETTES, got.pal.general)) s.pal.general = got.pal.general;
        ['xp', 'cyber', 'arcade', 'factorio'].forEach(function (k) {
          if (byId(SCHEMES[k], got.pal[k])) s.pal[k] = got.pal[k];
        });
      }
    } catch {}
    return s;
  }

  function save() { ls(KEY, JSON.stringify(state)); }

  var state = load();

  // A theme handed over from another Praxis tool: ?tk=family.palette.mode
  (function adoptFromUrl() {
    var m = /[?&]tk=([a-z0-9-]+)\.([a-z0-9-]+)\.(light|dark)(?:&|$)/.exec(location.search);
    if (!m) return;
    if (byId(FAMILIES, m[1])) {
      state.family = m[1];
      if (byId(palettesFor(m[1]), m[2])) state.pal[slotFor(m[1])] = m[2];
    }
    state.mode = m[3];
    save();
    try {
      var url = new URL(location.href);
      url.searchParams.delete('tk');
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    } catch {}
  })();

  function currentMode() { return state.mode || osMode(); }
  function currentPalette() { return state.pal[slotFor(state.family)]; }
  function token() { return state.family + '.' + currentPalette() + '.' + currentMode(); }

  // ---- applying ----------------------------------------------------------
  (function injectPaletteCss() {
    function seeds(s) {
      return '--bg:' + s.bg + ';--fg:' + s.fg + ';--accent:' + s.accent +
        (s.accent2 ? ';--accent-2:' + s.accent2 : '') +
        (s.accentFg ? ';--accent-fg:' + s.accentFg : '');
    }
    var css = allPalettes().map(function (p) {
      return 'html:root[data-palette="' + p.id + '"]{' + seeds(p.light) + '}\n' +
        'html:root[data-palette="' + p.id + '"][data-mode="dark"]{' + seeds(p.dark) + '}';
    }).join('\n');
    var el = document.createElement('style');
    el.id = 'tk-palettes';
    el.textContent = css;
    document.head.appendChild(el);
  })();

  var loadedFonts = {};
  function loadFonts(fam) {
    var f = family(fam);
    if (!f.fonts || loadedFonts[f.id]) return;
    loadedFonts[f.id] = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + f.fonts + '&display=swap';
    document.head.appendChild(link);
  }

  function apply() {
    root.setAttribute('data-family', state.family);
    root.setAttribute('data-palette', currentPalette());
    root.setAttribute('data-mode', currentMode());
    loadFonts(state.family);
    try { root.dispatchEvent(new CustomEvent('tk:change', { detail: api.get() })); } catch {}
  }

  // ---- transitions -------------------------------------------------------
  // Reveal shapes, centred on the control clicked:
  //   grow   — the new theme expands out of the control (light, styles, palettes)
  //   shrink — the old theme collapses back into the control (dark)
  function change(mutate, origin, reveal) {
    var run = function () { mutate(); save(); apply(); render(); };
    if (!origin || reduced || !document.startViewTransition) { run(); return; }
    var r = origin.getBoundingClientRect();
    var x = r.left + r.width / 2;
    var y = r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var small = 'circle(0px at ' + x + 'px ' + y + 'px)';
    var full = 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)';
    var grow = reveal !== 'shrink';

    root.setAttribute('data-vt', grow ? 'grow' : 'shrink');
    root.classList.add('tk-no-trans');
    var vt = document.startViewTransition(run);
    vt.ready.then(function () {
      root.animate({ clipPath: grow ? [small, full] : [full, small] }, {
        duration: grow ? 560 : 620,
        easing: grow ? 'cubic-bezier(0.65, 0, 0.35, 1)' : 'cubic-bezier(0.55, 0, 0.3, 1)',
        pseudoElement: grow ? '::view-transition-new(root)' : '::view-transition-old(root)'
      });
    }).catch(function () {});
    vt.finished.then(done, done);
    function done() {
      root.removeAttribute('data-vt');
      root.classList.remove('tk-no-trans');
    }
  }

  // ---- links between tools carry the theme --------------------------------
  function isSister(url) {
    return SISTERS.indexOf(url.hostname) >= 0;
  }
  function decorate(href) {
    try {
      var url = new URL(href, location.href);
      if (!isSister(url) || url.origin === location.origin) return href;
      url.searchParams.set('tk', token());
      return url.toString();
    } catch { return href; }
  }
  function onLinkActivate(e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (a) a.href = decorate(a.getAttribute('href'));
  }
  document.addEventListener('click', onLinkActivate, true);
  document.addEventListener('auxclick', onLinkActivate, true);

  // ---- picker ------------------------------------------------------------
  var ICON_SUN = '<svg class="tk-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MOON = '<svg class="tk-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"/></svg>';

  var mounts = [];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mount(el) {
    if (!el || el.__tk) return;
    el.__tk = true;
    el.classList.add('tk-controls');
    var onDashboard = location.hostname === 'dashboardstake.vercel.app';
    el.innerHTML =
      '<button type="button" class="tk-btn tk-open" aria-haspopup="dialog" aria-expanded="false" title="Theme">' +
        '<span class="tk-dot" aria-hidden="true"></span><span class="tk-label">Theme</span></button>' +
      '<button type="button" class="tk-btn tk-mode" aria-label="Toggle light/dark mode">' + ICON_SUN + ICON_MOON + '</button>' +
      '<div class="tk-menu" role="dialog" aria-label="Choose a theme" hidden>' +
        '<p class="tk-menu-head">Style</p><div class="tk-fam-grid"></div>' +
        '<p class="tk-menu-head tk-pal-head">Palette</p><div class="tk-pal-grid"></div>' +
        '<div class="tk-menu-foot"><span>Synced across Praxis tools</span>' +
          (onDashboard ? '' : '<a class="tk-dash" href="' + DASHBOARD + '">Dashboard &#8599;</a>') +
        '</div>' +
      '</div>';

    var openBtn = el.querySelector('.tk-open');
    var modeBtn = el.querySelector('.tk-mode');
    var menu = el.querySelector('.tk-menu');
    var famGrid = el.querySelector('.tk-fam-grid');
    var palGrid = el.querySelector('.tk-pal-grid');

    famGrid.innerHTML = FAMILIES.map(function (f, i) {
      return '<button type="button" class="tk-fam" data-id="' + f.id + '" aria-pressed="false" style="--i:' + i + '">' +
        '<span class="tk-chip" data-fam="' + f.id + '" aria-hidden="true"><i></i></span>' +
        '<span class="tk-fam-name">' + esc(f.name) + '</span>' +
        '<span class="tk-fam-desc">' + esc(f.desc) + '</span></button>';
    }).join('');

    function setOpen(open) {
      menu.hidden = !open;
      openBtn.setAttribute('aria-expanded', String(open));
      if (open) renderOne(m);
    }
    openBtn.addEventListener('click', function () { setOpen(menu.hidden); });
    document.addEventListener('pointerdown', function (e) { if (!menu.hidden && !el.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    modeBtn.addEventListener('click', function () {
      var next = currentMode() === 'dark' ? 'light' : 'dark';
      change(function () { state.mode = next; }, modeBtn, next === 'dark' ? 'shrink' : 'grow');
    });
    famGrid.addEventListener('click', function (e) {
      var b = e.target.closest('.tk-fam');
      if (b) change(function () { state.family = b.getAttribute('data-id'); }, b, 'grow');
    });
    palGrid.addEventListener('click', function (e) {
      var b = e.target.closest('.tk-pal');
      if (b) change(function () { state.pal[slotFor(state.family)] = b.getAttribute('data-id'); }, b, 'grow');
    });

    var m = { el: el, menu: menu, famGrid: famGrid, palGrid: palGrid, modeBtn: modeBtn };
    mounts.push(m);
    renderOne(m);
  }

  function renderOne(m) {
    var mode = currentMode();
    var active = currentPalette();
    var list = palettesFor(state.family);
    m.modeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    m.modeBtn.title = mode === 'dark' ? 'Light mode' : 'Dark mode';
    Array.prototype.forEach.call(m.famGrid.children, function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-id') === state.family));
    });
    m.el.querySelector('.tk-pal-head').textContent = family(state.family).schemes ? 'Colour scheme' : 'Palette';
    if (m.menu.hidden) return;
    m.palGrid.innerHTML = list.map(function (p, i) {
      var s = p[mode];
      var edge = 'color-mix(in oklab, ' + s.bg + ', ' + s.fg + ' 18%)';
      return '<button type="button" class="tk-pal" data-id="' + p.id + '" aria-pressed="' + (p.id === active) + '" style="--i:' + i + '">' +
        '<span class="tk-swatch" style="background:' + s.bg + ';border-color:' + edge + '">' +
          '<i style="background:color-mix(in oklab, ' + s.bg + ', ' + s.fg + ' 12%)"></i>' +
          '<i style="background:' + s.accent + '"></i>' +
          (s.accent2 ? '<i style="background:' + s.accent2 + '"></i>' : '') +
          '<i style="background:' + s.fg + '"></i></span>' +
        '<span class="tk-pal-name">' + esc(p.name) + '</span></button>';
    }).join('');
  }

  function render() { mounts.forEach(renderOne); }

  // ---- misc helpers sites use ---------------------------------------------
  // Number the given elements for the staggered .tk-rise entrance.
  function stagger(nodes, start) {
    var i = start || 0;
    Array.prototype.forEach.call(nodes, function (n) { n.style.setProperty('--i', i++); });
    return i;
  }

  // Until the visitor picks light/dark themselves, keep following the OS.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!state.mode) { apply(); render(); }
    });
  }

  // A page restored from the back/forward cache may be showing a stale theme.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    state = load();
    apply();
    render();
  });

  // Page-level effects layer (scanlines etc.), added once the body exists.
  function addFx() {
    if (!document.body || document.querySelector('.tk-fx')) return;
    var fx = document.createElement('div');
    fx.className = 'tk-fx';
    fx.setAttribute('aria-hidden', 'true');
    document.body.appendChild(fx);
  }
  if (document.body) addFx();
  else document.addEventListener('DOMContentLoaded', addFx);

  var api = {
    FAMILIES: FAMILIES,
    PALETTES: PALETTES,
    SCHEMES: SCHEMES,
    get: function () { return { family: state.family, palette: currentPalette(), mode: currentMode() }; },
    mount: mount,
    decorate: decorate,
    stagger: stagger,
    setFamily: function (id, origin) { if (byId(FAMILIES, id)) change(function () { state.family = id; }, origin, 'grow'); },
    setMode: function (mode, origin) { change(function () { state.mode = mode; }, origin, mode === 'dark' ? 'shrink' : 'grow'); }
  };
  window.ThemeKit = api;

  apply();
})();
