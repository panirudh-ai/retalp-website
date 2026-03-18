const fs = require('fs');

/* ══════════════════════════════════════
   1. FIX retalp_landing.html EXTERNAL LINKS
══════════════════════════════════════ */
let landing = fs.readFileSync('retalp_landing.html', 'utf8');

const landingRules = [
  // Hero CTA buttons
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#final-cta"/g, 'href="index3.html#pilot"'],
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#e3-engine"/g, 'href="index3.html#e3-engine"'],
  // Main CTA button (bare #)
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#" class="btn-primary-xl"/g, 'href="index3.html#pilot" class="btn-primary-xl"'],
  // Footer brand logo
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#" class="footer-brand-logo"/g, 'href="retalp_landing.html" class="footer-brand-logo"'],
  // Footer nav links
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#capabilities"/g, 'href="retalp_capabilities.html"'],
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#impact"/g, 'href="index3.html#impact"'],
  // Capabilities section links → retalp_capabilities.html
  [/(<li><a href=")https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#"(>(?:Inventory Intel|Production Planning|Supply Chain|Sales Analytics)<\/a><\/li>)/g, '$1retalp_capabilities.html$2'],
  // Company/misc links → keep local with #
  [/href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#"(?= class="(?!footer-brand-logo))/g, 'href="#"'],
  // Remaining bare # links in footer lists
  [/<li><a href="https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#">(About|Industries|Contact|Privacy)<\/a><\/li>/g, '<li><a href="#">$1</a></li>'],
];

for (const [pattern, replacement] of landingRules) {
  landing = landing.replace(pattern, replacement);
}

// Catch any remaining emergentagent links
landing = landing.replace(/https:\/\/e3-platform-2\.preview\.emergentagent\.com\/api\/retalp#[^"']*/g, '#');

fs.writeFileSync('retalp_landing.html', landing, 'utf8');
console.log('✓ retalp_landing.html links fixed');
console.log('  Remaining emergentagent refs:', (landing.match(/emergentagent/g)||[]).length);

/* ══════════════════════════════════════
   2. LIGHT-THEME OVERRIDE FOR retalp_capabilities.html
══════════════════════════════════════ */
let caps = fs.readFileSync('retalp_capabilities.html', 'utf8');

// Add missing CSS vars to :root
caps = caps.replace(
  '--mono: \'DM Mono\', monospace;',
  `--mono: 'DM Mono', monospace;
  --muted:    #6a7d72;
  --surface:  #f5f9f6;`
);

const lightOverride = `
/* ══════════════════════════════════════
   LIGHT-THEME OVERRIDES (match index3.html)
══════════════════════════════════════ */

/* Body & canvas */
body { background: var(--white) !important; color: var(--ink) !important; }
::-webkit-scrollbar-track { background: var(--surface) !important; }
#bg-canvas { display: none !important; }

/* Nav — light pill */
.nav-island {
  background: rgba(255,255,255,.95) !important;
  border-color: rgba(61,184,112,.2) !important;
  box-shadow: 0 4px 32px rgba(0,0,0,.08), 0 0 0 1px rgba(61,184,112,.08) inset !important;
}
.nav-island.scrolled {
  background: rgba(255,255,255,.98) !important;
  box-shadow: 0 8px 40px rgba(0,0,0,.12), 0 0 0 1px rgba(61,184,112,.15) inset !important;
}
.nav-logo-text { color: var(--ink) !important; }
.nav-sep { background: rgba(0,0,0,.1) !important; }
.nav-link { color: var(--muted) !important; }
.nav-link:hover { color: var(--ink) !important; }

/* Typography */
.t-body { color: var(--muted) !important; }
.t-small { color: var(--muted) !important; }

/* Buttons */
.btn-ghost-lg {
  color: var(--muted) !important;
  border-color: rgba(0,0,0,.12) !important;
}
.btn-ghost-lg:hover {
  color: var(--ink) !important;
  border-color: rgba(0,0,0,.3) !important;
  background: rgba(0,0,0,.02) !important;
}

/* Hero grid bg — subtle on white */
.hero-grid-bg {
  background-image:
    linear-gradient(rgba(0,0,0,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.025) 1px, transparent 1px) !important;
}
.hero-mini-card {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
}
.hero-mini-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,.08) !important; }
.hmc-name { color: var(--ink) !important; }

/* Category cards */
.cat-card {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
}
.cat-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,.08) !important; }
.cat-title { color: var(--ink) !important; }
.cat-benefit { color: var(--muted) !important; }
.cat-bullets li { color: var(--muted) !important; }

/* Spotlight / case panels */
.case-title-text { color: var(--ink) !important; }
.case-desc { color: var(--muted) !important; }
.metric-label { color: var(--muted) !important; }

/* Replenishment */
.wh-name { color: var(--muted) !important; }
.replen-sku { color: var(--muted) !important; }
.replen-qty { color: var(--ink) !important; }

/* Supply chain steps */
.sc-step {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
}
.sc-step:hover { box-shadow: 0 12px 40px rgba(0,0,0,.08) !important; }
.sc-step-icon {
  border-color: rgba(0,0,0,.08) !important;
  background: var(--white) !important;
}
.sc-step:hover .sc-step-icon {
  border-color: rgba(61,184,112,.3) !important;
  background: rgba(61,184,112,.08) !important;
}
.sc-step-title { color: var(--ink) !important; }
.sc-step-desc { color: var(--muted) !important; }

/* Carousel track fade */
.cap-track-wrap::before { background: linear-gradient(90deg, var(--white), transparent) !important; }
.cap-track-wrap::after  { background: linear-gradient(-90deg, var(--white), transparent) !important; }

/* Carousel cards */
.cap-card {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
}
.cap-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,.08), 0 0 30px rgba(61,184,112,.06) !important; }
.cap-outcome { color: var(--muted) !important; }
.cap-bullets li { color: var(--muted) !important; }

/* Spider map */
.spider-node {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
  backdrop-filter: none !important;
}
.spider-node:hover { box-shadow: 0 12px 40px rgba(0,0,0,.08) !important; }
.spider-node-name { color: var(--ink) !important; }

/* Pilot cards */
.pilot-card {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
}
.pilot-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,.08) !important; }
.pilot-desc { color: var(--muted) !important; }

/* CTA glass */
.cta-glass {
  background: var(--white) !important;
  border-color: rgba(61,184,112,.2) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: 0 0 80px rgba(45,122,79,.08), 0 20px 60px rgba(0,0,0,.06) !important;
}
.cta-note { color: var(--muted) !important; }

/* Mini matrix */
.mini-matrix-row-label { color: var(--muted) !important; border-bottom-color: rgba(0,0,0,.06) !important; }
.mini-cell {
  background: var(--surface) !important;
  border-color: rgba(0,0,0,.06) !important;
  color: var(--muted) !important;
}

/* Footer */
.footer { border-top-color: rgba(0,0,0,.08) !important; }
.footer-tagline { color: var(--muted) !important; }
.footer-col-title { color: var(--muted) !important; }
.footer-links a { color: var(--muted) !important; }
.footer-copy { color: var(--muted) !important; }
.footer-bottom { border-top-color: rgba(0,0,0,.06) !important; }
`;

// Insert override CSS just before </style>
caps = caps.replace('</style>', lightOverride + '\n</style>');

fs.writeFileSync('retalp_capabilities.html', caps, 'utf8');
console.log('✓ retalp_capabilities.html light-theme applied');
