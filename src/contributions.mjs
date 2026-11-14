// Reads the public contribution calendar, the same page the profile shows. No token needed.

export const CONTRIBUTIONS_URL = "https://github.com/users/Coelho-G-Dev/contributions";

const DAY_RE = /data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"[^>]*data-level="(\d)"/g;
const TIP_RE = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
const TOTAL_RE = /([\d,.]+)\s+contributions?\s+in the last year/;
const MIN_WEEKS = 26;

export function parseContributions(html) {
  const counts = new Map();
  for (const [, id, text] of html.matchAll(TIP_RE)) {
    const n = text.trim().match(/^(\d+)/);
    counts.set(id, n ? Number(n[1]) : 0);
  }

  const days = [...html.matchAll(DAY_RE)]
    .map(([, date, id, level]) => ({ date, count: counts.get(id) ?? 0, level: Number(level) }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    const slice = days.slice(i, i + 7);
    weeks.push({
      start: slice[0].date,
      count: slice.reduce((sum, day) => sum + day.count, 0),
      level: Math.max(...slice.map((day) => day.level)),
    });
  }

  const header = Number(html.match(TOTAL_RE)?.[1].replace(/[,.]/g, "") ?? 0);
  return { total: header || weeks.reduce((sum, week) => sum + week.count, 0), weeks };
}

export async function fetchContributions(fetchImpl = fetch) {
  const response = await fetchImpl(CONTRIBUTIONS_URL);
  if (!response.ok) throw new Error(`GitHub respondeu ${response.status} para o calendário`);
  const data = parseContributions(await response.text());
  if (data.weeks.length < MIN_WEEKS) {
    throw new Error(`Calendário incompleto: ${data.weeks.length} semanas (mínimo ${MIN_WEEKS})`);
  }
  return data;
}
