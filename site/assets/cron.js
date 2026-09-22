const FIELDS = ['minute', 'hour', 'dayMonth', 'month', 'dayWeek'];

const PRESETS = [
  { label: 'Every minute', expr: '* * * * *' },
  { label: 'Every hour', expr: '0 * * * *' },
  { label: 'Daily midnight', expr: '0 0 * * *' },
  { label: 'Weekdays 9am', expr: '0 9 * * 1-5' },
  { label: 'Sunday midnight', expr: '0 0 * * 0' },
];

function expandPart(part, min, max, names) {
  if (part === '*') return `every ${names || 'value'}`;
  if (part.includes('/')) {
    const [base, step] = part.split('/');
    const baseTxt = base === '*' ? '' : `${base} `;
    return `every ${step} ${names || 'units'}${baseTxt ? ` from ${base}` : ''}`;
  }
  if (part.includes('-')) {
    const [a, b] = part.split('-');
    return `${names ? names : 'from'} ${a} through ${b}`;
  }
  if (part.includes(',')) {
    return `at ${part.split(',').join(', ')}`;
  }
  return `at ${part}`;
}

export function explainCron(expr) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { ok: false, error: 'Need exactly 5 fields: minute hour day month weekday' };
  }

  const [min, hour, dom, mon, dow] = parts;
  const lines = [
    `Minute: ${expandPart(min, 0, 59, 'minute(s)')}`,
    `Hour: ${expandPart(hour, 0, 23, 'hour(s)')}`,
    `Day of month: ${expandPart(dom, 1, 31, 'day(s) of month')}`,
    `Month: ${expandPart(mon, 1, 12, 'month(s)')}`,
    `Day of week: ${expandPart(dow, 0, 6, 'weekday(s) (0=Sun)')}`,
  ];

  return { ok: true, summary: lines.join('\n'), parts: { min, hour, dom, mon, dow } };
}

export function buildFromSimple({ minute, hour, dom, month, dow }) {
  const m = minute === '' ? '*' : minute;
  const h = hour === '' ? '*' : hour;
  const d = dom === '' ? '*' : dom;
  const mo = month === '' ? '*' : month;
  const w = dow === '' ? '*' : dow;
  return `${m} ${h} ${d} ${mo} ${w}`;
}

export { PRESETS };
