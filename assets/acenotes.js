// ── AceNotes shared data & components ──────────────────────────

// ── Notes catalog data ──────────────────────────────────────────
const NOTES = [
  { id: 1, title: 'English Language Smart Revision ICSE', cls: '10', board: 'ICSE', subject: 'English Language', price: 80,
    cover: { light: '../assets/covers/english-light-pre.png', dark: '../assets/covers/eng-dark-pre.png' },
    description: 'A smart revision guide for <strong>English Language</strong> (ICSE Class 10) — covering all key grammar topics, writing formats, and comprehension strategies needed to score high in the board exam.',
    features: ['Complete Paper 1 breakdown (2 hours • 80 marks) with section-wise weightage','Composition mastery: narrative, descriptive, argumentative, story & picture-based writing','Formal & informal letter formats with exact structure and marking focus','Notice & email writing: format, examples, and scoring strategy','Comprehension techniques: how to read, locate answers, and avoid copying','Summary writing guide: 50-word rule, structure, and word-grid method','Functional grammar: tenses, voice, transformation, direct & indirect speech','Exam strategy: ideal attempt order, time management, and scoring tips']
  },
  { id: 2, title: 'Some Basic Concepts Of Chemistry', cls: '11', board: null, subject: 'Chemistry', price: 100,
    cover: { light: '../assets/covers/sbcc-light.png', dark: '../assets/covers/sbcc-dark.png' },
    description: 'A thorough set of notes covering <strong>Some Basic Concepts of Chemistry</strong> — the foundation chapter for JEE Chemistry. Covers mole concept, stoichiometry, concentration terms, and limiting reagent with clarity and precision.',
    features: ['Complete mole concept with solved numerical examples','Stoichiometry and balancing equations explained clearly','All concentration terms: molarity, molality, normality, mole fraction','Limiting reagent and percentage yield problems','JEE-pattern MCQs and tips included','Quick-reference formula sheet at the end']
  },
  { id: 3, title: 'Center Of Mass - Derivations of Center of Mass for Continuous Bodies', cls: '11', board: null, subject: 'Physics', price: 120,
    cover: { light: '../assets/covers/com-light.png', dark: '../assets/covers/com-dark.png' },
    description: 'These notes provide a complete, derivation-focused treatment of <strong>Center of Mass</strong> for continuous bodies — one of the most important and frequently tested topics in JEE Physics. Every derivation is built step-by-step from first principles.',
    features: ['Full derivations of COM for rods, discs, rings, hemispheres, and cones','Step-by-step integration approach — every step shown clearly','Includes important formulas with conditions and special cases','JEE Main & Advanced level problems with solved examples','Common mistakes and examiner tips highlighted throughout','Concise revision summary at the end of each derivation']
  },
  { id: 9, title: 'Trigonometric Functions', cls: '11', board: null, subject: 'Mathematics', price: 120,
    cover: { light: '../assets/covers/trigo-light.png', dark: '../assets/covers/trigo-dark.png' },
    description: 'Comprehensive notes on <strong>Trigonometric Functions</strong> for JEE Mathematics. Covers all identities, graphs, transformations, and inverse trigonometry with a focus on problem-solving techniques used in JEE.',
    features: ['All standard identities — sum, product, double angle, half angle','Graphs of all six trig functions with transformations','Inverse trigonometric functions with domain and range','JEE-level solved examples for each concept','Important results and shortcuts highlighted','Previous year JEE questions with solutions']
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
    <li><a href="${base}pages/buy-notes.html" ${cur==='catalog'?'class="active"':''}>Notes Catalog</a></li>
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
  <button class="bottom-bar-item an-theme-toggle" style="border:none;background:none;color:var(--text-faint);" title="Toggle dark mode">
    <svg class="an-theme-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg>
  </button>
</nav>`;

  document.querySelectorAll('.an-theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(getTheme() !== 'dark'));
  });
}
