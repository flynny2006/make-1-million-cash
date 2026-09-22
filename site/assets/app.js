export const GOAL_CENTS = 100_000_000;

export function formatUsd(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export function mountTopbar(active = '') {
  const root = document.getElementById('topbar');
  if (!root) return;

  const base = document.body.dataset.base || '.';
  const prefix = base === '.' ? '' : base;

  const links = [
    { href: `${prefix}/index.html`, label: 'Home', id: 'home' },
    { href: `${prefix}/tools/readme-score.html`, label: 'README Score', id: 'readme' },
    { href: `${prefix}/tools/json-forge.html`, label: 'JSON Forge', id: 'json' },
    { href: `${prefix}/tools/cron-speak.html`, label: 'Cron Speak', id: 'cron' },
    { href: `${prefix}/ledger.html`, label: 'Ledger', id: 'ledger' },
  ];

  root.innerHTML = `
    <a class="brand" href="${prefix}/index.html">
      <svg class="brand-mark" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="6" width="24" height="20" rx="4" stroke="#ff6b2c" stroke-width="2"/>
        <path d="M10 14h12M10 18h8" stroke="#f5f5f5" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="22" cy="20" r="5" fill="#ff6b2c" opacity="0.9"/>
        <path d="M20.5 20l1.2 1.2 2.8-2.8" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      CashLab
    </a>
    <nav class="nav">
      ${links
        .map(
          (l) =>
            `<a href="${l.href}" class="${active === l.id ? 'active' : ''}">${l.label}</a>`,
        )
        .join('')}
    </nav>
  `;
}

const LEDGER_KEY = 'cashlab-ledger-v1';

export function loadLedger() {
  try {
    const raw = localStorage.getItem(LEDGER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {
    entries: [
      {
        id: 'seed-1',
        date: new Date().toISOString().slice(0, 10),
        note: 'Day 1 — shipped CashLab static site',
        cents: 0,
      },
    ],
  };
}

export function saveLedger(data) {
  localStorage.setItem(LEDGER_KEY, JSON.stringify(data));
}

export function ledgerTotalCents(data) {
  return data.entries.reduce((s, e) => s + (Number(e.cents) || 0), 0);
}
