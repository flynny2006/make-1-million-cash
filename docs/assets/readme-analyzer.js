const CHECKS = [
  {
    id: 'title',
    label: 'Project title (H1)',
    test: (t) => /^#\s+\S/m.test(t),
    weight: 10,
    tip: 'Start with `# Your Project Name`',
  },
  {
    id: 'desc',
    label: 'Short description (first 120 chars)',
    test: (t) => {
      const body = t.replace(/^#.+$/m, '').trim();
      return body.length >= 40;
    },
    weight: 12,
    tip: 'Add 2–3 sentences under the title before badges',
  },
  {
    id: 'install',
    label: 'Install / usage section',
    test: (t) => /##\s*(install|usage|getting started|quick start)/i.test(t),
    weight: 15,
    tip: 'Add `## Installation` or `## Usage`',
  },
  {
    id: 'code',
    label: 'Code example (fenced block)',
    test: (t) => /```[\s\S]*?```/.test(t),
    weight: 12,
    tip: 'Show one copy-paste command or snippet',
  },
  {
    id: 'license',
    label: 'License mentioned',
    test: (t) => /license|mit|apache|gpl/i.test(t),
    weight: 8,
    tip: 'Link LICENSE or state MIT/Apache',
  },
  {
    id: 'contrib',
    label: 'Contributing or issues',
    test: (t) => /contribut|issues|pull request|pr welcome/i.test(t),
    weight: 6,
    tip: 'Invite contributors or link Issues',
  },
  {
    id: 'badges',
    label: 'Status badges (optional but common)',
    test: (t) => /!\[.*\]\(http/i.test(t),
    weight: 5,
    tip: 'CI, npm version, or license badge',
  },
  {
    id: 'screenshot',
    label: 'Screenshot or demo',
    test: (t) => /!\[.*\]\([^)]+\.(png|jpg|gif|webp)/i.test(t) || /<img/i.test(t),
    weight: 10,
    tip: 'One image doubles click-through on GitHub',
  },
  {
    id: 'links',
    label: 'Docs / demo link',
    test: (t) => /\[.*\]\(https?:\/\//i.test(t),
    weight: 10,
    tip: 'Link live demo, docs, or npm',
  },
  {
    id: 'length',
    label: 'Enough depth (400+ chars)',
    test: (t) => t.trim().length >= 400,
    weight: 12,
    tip: 'Thin READMEs scare stars away',
  },
];

export function analyzeReadme(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return { score: 0, max: 100, results: CHECKS.map((c) => ({ ...c, pass: false })) };
  }

  let earned = 0;
  const max = CHECKS.reduce((s, c) => s + c.weight, 0);
  const results = CHECKS.map((c) => {
    const pass = c.test(trimmed);
    if (pass) earned += c.weight;
    return { ...c, pass };
  });

  const score = Math.round((earned / max) * 100);
  return { score, max: 100, results };
}

export function grade(score) {
  if (score >= 85) return 'Ship it';
  if (score >= 65) return 'Almost there';
  if (score >= 40) return 'Needs love';
  return 'Blank slate';
}
