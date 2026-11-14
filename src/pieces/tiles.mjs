// "My year in tiles": one tile per week, fuller with more contributions.
import { COPY } from "../data.mjs";
import { EXTRA, PALETTE, THEME } from "../palette.mjs";
import { textPath } from "../text.mjs";

const WEEKS = 52;
const COLS = 26;
const SIZE = 100;
const GAP = 10;
const WIDTH = 1200;
const SCALE = WIDTH / (COLS * SIZE + (COLS - 1) * GAP);
const TEXT_SIZE = 30;

const CORNER = {
  tl: "M0,0 L50,0 A50,50 0 0 1 0,50 Z",
  tr: "M100,0 L100,50 A50,50 0 0 1 50,0 Z",
  br: "M100,100 L50,100 A50,50 0 0 1 100,50 Z",
  bl: "M0,100 L0,50 A50,50 0 0 1 50,100 Z",
};
const DIAMOND = "M50,22 L78,50 L50,78 L22,50 Z";

const round = (n) => Math.round(n * 10) / 10;
const shape = (d, fill) => `<path d="${d}" fill="${fill}"/>`;

function motif(level, flip, current) {
  const parts = [];
  if (level === 1) {
    const pair = flip ? [CORNER.tr, CORNER.bl] : [CORNER.tl, CORNER.br];
    parts.push(...pair.map((d) => shape(d, EXTRA.azulejoMadeira)));
  }
  if (level >= 2) {
    const fill = level === 2 ? EXTRA.azulejoMadeira : PALETTE.nogueira;
    parts.push(...Object.values(CORNER).map((d) => shape(d, fill)));
  }
  if (level >= 3) parts.push(shape(DIAMOND, PALETTE.nogueiraEscura));
  if (level === 4 && !current) parts.push(`<circle cx="50" cy="50" r="14" fill="${EXTRA.azulejoMadeira}"/>`);
  // The amber dot marks the current week, whatever its level.
  if (current) {
    parts.push(
      `<circle cx="50" cy="50" r="16" fill="${PALETTE.ambar}" stroke="${PALETTE.ebano}" stroke-width="5"/>`,
    );
  }
  return parts.join("");
}

export function renderTiles({ weeks, total, locale, theme }) {
  const shown = weeks.slice(-WEEKS);
  const rows = Math.max(1, Math.ceil(shown.length / COLS));
  const gridHeight = (rows * SIZE + (rows - 1) * GAP) * SCALE;
  const baseline = round(gridHeight + 46);
  const height = Math.ceil(baseline + 16);
  const border = theme === "light" ? ` stroke="${PALETTE.nogueira}" stroke-width="4"` : "";

  const tiles = shown
    .map((week, i) => {
      const x = (i % COLS) * (SIZE + GAP);
      const y = Math.floor(i / COLS) * (SIZE + GAP);
      const base = `<rect width="${SIZE}" height="${SIZE}" rx="6" fill="${EXTRA.azulejoBase}"${border}/>`;
      return `<g class="t" style="--i:${i}" transform="translate(${x} ${y})">${base}${motif(week.level, i % 2 === 1, i === shown.length - 1)}</g>`;
    })
    .join("\n");

  const label = textPath(COPY[locale].tilesTotal(total), {
    font: "mono",
    size: TEXT_SIZE,
    x: 0,
    y: baseline,
    fg: THEME[theme].text,
    bg: THEME[theme].bg,
    maxWidth: WIDTH,
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${height}" width="${WIDTH}" height="${height}">
<style>@media (prefers-reduced-motion: no-preference){.t{animation:rise .5s ease-out both;animation-delay:calc(var(--i)*25ms)}@keyframes rise{from{opacity:0}to{opacity:1}}}</style>
<g transform="scale(${round(SCALE * 10000) / 10000})">
${tiles}
</g>
${label}
</svg>
`;
}
