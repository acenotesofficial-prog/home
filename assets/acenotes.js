// ── AceNotes shared data & components ──────────────────────────

// ── PWA Install Prompt ──────────────────────────────────────────
(function(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  let deferredPrompt = null;
  const DISMISSED_KEY = 'acenotes-pwa-dismissed';

  function buildPopup() {
    if (document.getElementById('pwa-install-popup')) return;
    const base = document.querySelector('link[rel="manifest"]')?.href.includes('/pages/') ? '../' : '';
    const el = document.createElement('div');
    el.id = 'pwa-install-popup';
    el.className = 'pwa-popup';
    el.innerHTML = `
      <div class="pwa-popup-top">
        <img class="pwa-popup-logo" src="${base}assets/avatars/LOGO.png" alt="AceNotes">
        <div><div class="pwa-popup-title">Install AceNotes</div><div class="pwa-popup-sub">Add to your home screen</div></div>
      </div>
      <ul class="pwa-popup-features">
        <li>Opens in a focused, distraction-free window</li>
        <li>Faster access to notes &amp; tests</li>
        <li>Works like a native app</li>
      </ul>
      <div class="pwa-popup-actions">
        <button class="pwa-install-btn" id="pwa-install-btn">Install</button>
        <button class="pwa-dismiss-btn" id="pwa-dismiss-btn">Not now</button>
      </div>`;
    document.body.appendChild(el);

    document.getElementById('pwa-install-btn').addEventListener('click', () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => { deferredPrompt = null; hidePopup(); });
    });
    document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
      try { sessionStorage.setItem(DISMISSED_KEY, '1'); } catch(e) {}
      hidePopup();
    });
  }

  function showPopup() {
    try { if (sessionStorage.getItem(DISMISSED_KEY)) return; } catch(e) {}
    buildPopup();
    setTimeout(() => document.getElementById('pwa-install-popup')?.classList.add('show'), 100);
  }

  function hidePopup() {
    const el = document.getElementById('pwa-install-popup');
    if (el) { el.classList.remove('show'); }
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showPopup();
  });

  window.addEventListener('appinstalled', hidePopup);
})();


// ── Notes catalog data ──────────────────────────────────────────
const NOTES = [
  { id: 1, title: 'English Language Smart Revision ICSE', cls: '10', board: 'ICSE', subject: 'English Language', price: 80,
    cover: { light: '../assets/covers/english-light-pre.png', dark: '../assets/covers/eng-dark-pre.png' },
    description: 'Smart revision guide for <strong>English Language</strong> ICSE Class 10 — grammar, writing formats, comprehension, and exam strategy.',
    features: ['Complete Paper 1 breakdown (2 hours • 80 marks) with section-wise weightage','Composition mastery: narrative, descriptive, argumentative, story & picture-based writing','Formal & informal letter formats with exact structure and marking focus','Notice & email writing: format, examples, and scoring strategy','Comprehension techniques: how to read, locate answers, and avoid copying','Summary writing guide: 50-word rule, structure, and word-grid method','Functional grammar: tenses, voice, transformation, direct & indirect speech','Exam strategy: ideal attempt order, time management, and scoring tips']
  },
  { id: 2, title: 'Some Basic Concepts Of Chemistry', cls: '11', board: null, subject: 'Chemistry', price: 100,
    cover: { light: '../assets/covers/sbcc-light.png', dark: '../assets/covers/sbcc-dark.png' },
    preview: 'https://drive.google.com/file/d/143C3mVQ97s5cvXNNM4dn8GgTRnyOloMk/view?usp=sharing',
    description: 'Foundation notes for <strong>Some Basic Concepts of Chemistry</strong> — mole concept, stoichiometry, concentration terms, and limiting reagent for JEE.',
    features: ['Complete mole concept with solved numerical examples','Stoichiometry and balancing equations explained clearly','All concentration terms: molarity, molality, normality, mole fraction','Limiting reagent and percentage yield problems','JEE-pattern MCQs and tips included','Quick-reference formula sheet at the end']
  },
  { id: 3, title: 'Center Of Mass - Derivations of Center of Mass for Continuous Bodies', cls: '11', board: null, subject: 'Physics', price: 120,
    cover: { light: '../assets/covers/com-light.png', dark: '../assets/covers/com-dark.png' },
    description: 'Derivation-focused notes on <strong>Center of Mass</strong> for continuous bodies — every result built step-by-step from first principles for JEE Physics.',
    features: ['Full derivations of COM for rods, discs, rings, hemispheres, and cones','Step-by-step integration approach — every step shown clearly','Includes important formulas with conditions and special cases','JEE Main & Advanced level problems with solved examples','Common mistakes and examiner tips highlighted throughout','Concise revision summary at the end of each derivation']
  },
  { id: 9, title: 'Trigonometric Functions', cls: '11', board: null, subject: 'Mathematics', price: 120,
    cover: { light: '../assets/covers/trigo-light.png', dark: '../assets/covers/trigo-dark.png' },
    preview: 'https://drive.google.com/file/d/13plJI-Tw_dgEO9d6--BcQhXXvDeVv9RR/view?usp=drive_link',
    description: 'Complete notes on <strong>Trigonometric Functions</strong> for JEE — identities, graphs, transformations, and inverse trig with exam-focused problem-solving.',
    features: ['All standard identities — sum, product, double angle, half angle','Graphs of all six trig functions with transformations','Inverse trigonometric functions with domain and range','JEE-level solved examples for each concept','Important results and shortcuts highlighted','Previous year JEE questions with solutions']
  },
  { id: 10, title: 'Quadratic Equations', cls: '11', board: null, subject: 'Mathematics', price: 120,
    cover: { light: '../assets/covers/quad-light.png', dark: '../assets/covers/quad-dark.png' },
    preview: 'https://drive.google.com/file/d/1Hj4jwQ8U-_7N836lrhaXF9tEp6sWnFjv/view?usp=drive_link',
    description: 'JEE-focused notes on <strong>Quadratic Equations</strong> — decision frameworks, attack protocols, and trap libraries built for fast, accurate exam execution.',
    features: [
      '<strong>Nature of Roots via Δ + Sign Logic</strong><br><span style="font-size:13px;">Real / equal / complex with correct condition handling (including edge cases)</span>',
      '<strong>Vieta\'s Framework (p, q method)</strong><br><span style="font-size:13px;">Sum, product, symmetric expressions, and fast evaluation of root-based expressions</span>',
      '<strong>Root Transformations</strong><br><span style="font-size:13px;">Shift, scaling, reciprocals, and forming new equations without solving roots</span>',
      '<strong>Location of Roots (Core JEE Topic)</strong><br><span style="font-size:13px;">Point &amp; interval methods using: Δ condition + af(k) sign + vertex position</span>',
      '<strong>Decision Tree for All Cases (6-case system)</strong><br><span style="font-size:13px;">Instantly classify any "roots relative to k / interval" problem</span>',
      '<strong>Newton\'s Sums (Power Expressions)</strong><br><span style="font-size:13px;">Efficient handling of αⁿ + βⁿ without expansion</span>',
      '<strong>Descartes\' Rule of Signs (Screening Tool)</strong><br><span style="font-size:13px;">Quick elimination strategy for MCQs</span>',
      '<strong>Quadratic Inequalities &amp; Sign Analysis</strong><br><span style="font-size:13px;">Systematic approach using graph + sign logic</span>',
      '<strong>Attack Protocol (Core Feature)</strong><br><span style="font-size:13px;">Step-by-step method: classify → choose tool → execute → trap-check</span>',
      '<strong>Trap Library (High Value)</strong><br><span style="font-size:13px;">Common JEE mistakes explicitly highlighted: sign errors in Vieta, misuse of f(k), confusion between S₂ and p², vertex condition misses</span>',
      '<strong>Practice Sets (Exam-Oriented)</strong><br><span style="font-size:13px;">Each set includes: Direct → Disguised → Integrated → Trap questions, designed to simulate actual JEE thinking patterns</span>'
    ]
  },
  { id: 11, title: 'Structure of Atom', cls: '11', board: null, subject: 'Chemistry', price: 120,
    cover: { light: '../assets/covers/soa-light.png', dark: '../assets/covers/soa-dark.png' },
    preview: 'https://drive.google.com/file/d/143C3mVQ97s5cvXNNM4dn8GgTRnyOloMk/view?usp=sharing',
   
    description: 'Comprehensive notes on <strong>Structure of Atom</strong> for JEE — atomic models, quantum mechanics, electronic configuration, and dual nature of matter with exam-focused problem-solving.',
    features: [
      '<strong>Historical Atomic Models</strong><br><span style="font-size:13px;">Thomson, Rutherford, and Bohr models with limitations and experimental basis</span>',
      '<strong>Quantum Mechanical Model</strong><br><span style="font-size:13px;">Wave-particle duality, de Broglie equation, Heisenberg uncertainty principle</span>',
      '<strong>Quantum Numbers & Orbitals</strong><br><span style="font-size:13px;">n, l, mₗ, mₛ with shapes, nodes, and energy ordering of all orbitals</span>',
      '<strong>Electronic Configuration Rules</strong><br><span style="font-size:13px;">Aufbau principle, Pauli exclusion, Hund\'s rule with exceptions (Cr, Cu, etc.)</span>',
      '<strong>Photoelectric Effect & Radiation</strong><br><span style="font-size:13px;">Einstein\'s equation, work function, threshold frequency, and numerical problems</span>',
      '<strong>Hydrogen Spectrum</strong><br><span style="font-size:13px;">Rydberg formula, spectral series (Lyman, Balmer, Paschen), and energy calculations</span>',
      '<strong>Bohr\'s Model Calculations</strong><br><span style="font-size:13px;">Radius, velocity, energy, and angular momentum of electrons in hydrogen-like atoms</span>',
      '<strong>JEE-Level Solved Examples</strong><br><span style="font-size:13px;">Step-by-step solutions to previous year JEE Main & Advanced questions</span>',
      '<strong>Common Traps & Mistakes</strong><br><span style="font-size:13px;">Frequent errors in quantum number problems, configuration exceptions, and formula misapplication</span>',
      '<strong>Quick Formula Sheet</strong><br><span style="font-size:13px;">All important formulas and constants compiled for last-minute revision</span>'
    ]
  },
];

// Build catalog map: cls → boardKey → subject → [notes]
const CATALOG = {};
NOTES.forEach(n => {
  const boardKey = n.board || 'JEE';
  if (!CATALOG[n.cls]) CATALOG[n.cls] = {};
  if (!CATALOG[n.cls][boardKey]) CATALOG[n.cls][boardKey] = {};
  if (!CATALOG[n.cls][boardKey][n.subject]) CATALOG[n.cls][boardKey][n.subject] = [];
  CATALOG[n.cls][boardKey][n.subject].push(n);
});

// ── Theme ───────────────────────────────────────────────────────
const SUN  = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

function getTheme() {
  try { const ls = localStorage.getItem('acenotes-theme'); if (ls) return ls; } catch(e) {}
  const m = document.cookie.match(/acenotes-theme=(dark|light)/);
  return m ? m[1] : 'light';
}
function saveTheme(dark) {
  try { localStorage.setItem('acenotes-theme', dark ? 'dark' : 'light'); } catch(e) {}
  document.cookie = 'acenotes-theme=' + (dark ? 'dark' : 'light') + ';path=/;max-age=31536000';
}
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  saveTheme(dark);
  document.querySelectorAll('.an-theme-icon').forEach(el => el.innerHTML = dark ? SUN : MOON);
}
(function(){ applyTheme(getTheme() === 'dark'); })();

// ── Navbar ──────────────────────────────────────────────────────
function renderNavbar(opts) {
  const base = (opts && opts.base) || '';
  const cur  = (opts && opts.cur)  || '';
  const dark = getTheme() === 'dark';
  const icon = dark ? SUN : MOON;

  document.getElementById('navbar-mount').innerHTML = `
<nav class="navbar" style="padding-left:5%;padding-right:5%;">
  <a href="${base}index.html" class="logo">
    <img src="${base}assets/avatars/LOGO.png" alt="AceNotes Logo">
  </a>
  <ul class="nav-links">
    <li><a href="${base}index.html" ${cur==='index'?'class="active"':''}>Home</a></li>
    <li class="nav-dropdown-wrap">
      <button class="nav-dropdown-btn ${cur==='catalog'||cur==='testpapers'?'active':''}" aria-expanded="false">
        Catalog
        <svg class="nav-dd-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="nav-dropdown">
        <a href="${base}pages/buy-notes.html" class="nav-dd-item ${cur==='catalog'?'nav-dd-active':''}"><span class="nav-dd-icon">📚</span><span>Notes</span></a>
        <a href="${base}pages/test-papers.html" class="nav-dd-item ${cur==='testpapers'?'nav-dd-active':''}"><span class="nav-dd-icon">📝</span><span>Test Papers</span></a>
      </div>
    </li>
    <li><a href="${base}index.html#pricing">Pricing</a></li>
    <li><a href="${base}index.html#contact">Contact</a></li>
    <li>
      <button class="nav-theme-btn an-theme-toggle" title="Toggle dark mode" aria-label="Toggle dark mode">
        <svg class="an-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
      </button>
    </li>
  </ul>
  <div class="navbar-mobile-right">
    <button class="nav-theme-btn an-theme-toggle" title="Toggle dark mode" aria-label="Toggle dark mode">
      <svg class="an-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
    </button>
  </div>
</nav>
<nav class="bottom-bar">
  <a href="${base}index.html" class="bottom-bar-item ${cur==='index'?'active':''}">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </a>
  <a href="${base}pages/buy-notes.html" class="bottom-bar-item ${cur==='catalog'?'active':''}">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  </a>
  <a href="${base}pages/test-papers.html" class="bottom-bar-item ${cur==='testpapers'?'active':''}">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  </a>
</nav>`;

  document.querySelectorAll('.an-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(getTheme() !== 'dark'));
  });

  // Catalog dropdown
  const ddWrap = document.querySelector('.nav-dropdown-wrap');
  if (ddWrap) {
    const ddBtn = ddWrap.querySelector('.nav-dropdown-btn');
    const dd = ddWrap.querySelector('.nav-dropdown');
    ddBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = ddWrap.classList.toggle('open');
      ddBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => { ddWrap.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); });
    dd.addEventListener('click', e => e.stopPropagation());
  }
}
