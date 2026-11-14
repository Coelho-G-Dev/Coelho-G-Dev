// Cover: name and role on the left, the request path on the right, with a message that walks it.
import { COPY } from "../data.mjs";
import { EXTRA, PALETTE as P, THEME } from "../palette.mjs";
import { textPath } from "../text.mjs";
import { PIECES } from "./chess.mjs";

// Centres of the five houses in the row.
export const HOUSE_X = [648, 762, 876, 990, 1104];
const ROW_Y = 125;
const ROW = ["peao", "cavalo", "torre", "bispo", "rei"];
const BRANCHES = [
  { house: 2, piece: "torre" },
  { house: 3, piece: "dama" },
];
// Still image: the message sits on the wire between the second and third houses.
const REST_X = (HOUSE_X[1] + HOUSE_X[2]) / 2;
// Moving: it stops at the top right corner of each house, so it never covers the piece.
const CORNER = { dx: 28, dy: -31 };
const CYCLE = "8s";

const move = (x, y) => `{transform:translate(${x}px,${y}px)}`;

function travelFrames() {
  const frames = [];
  HOUSE_X.forEach((x, i) => {
    const from = i === 0 ? "0%" : `${i * 20 + 2}%`;
    frames.push(`${from},${i * 20 + 14}%${move(x + CORNER.dx - REST_X, CORNER.dy)}`);
    if (i < HOUSE_X.length - 1) frames.push(`${i * 20 + 18}%${move((x + HOUSE_X[i + 1]) / 2 - REST_X, 0)}`);
  });
  frames.push(`100%${move(HOUSE_X[0] + CORNER.dx - REST_X, CORNER.dy)}`);
  return `@keyframes travel{${frames.join("")}}`;
}

// The border of a house is lit only while the message is in it.
function glowFrames(lit) {
  return HOUSE_X.map((_, i) => {
    const off = `0%,100%,${i * 20}%,${i * 20 + 16}%{stroke:${P.nogueira}}`;
    const on = `${i * 20 + 2}%,${i * 20 + 14}%{stroke:${lit}}`;
    return `@keyframes house${i}{${off}${on}} .h${i}{animation-name:house${i}}`;
  }).join("");
}

export function renderCover({ locale, theme }) {
  const copy = COPY[locale];
  const tone = THEME[theme];
  if (!copy || !tone) throw new Error("Unknown cover locale or theme");

  const light = theme === "light";
  const houseTone = light ? "marfim" : "nogueiraEscura";
  const pieceTone = light ? "ebano" : "bordo";
  const kingHouse = light ? "ebano" : "marfim";
  const kingPiece = light ? "marfim" : "ebano";

  const piece = (name, x, y, color) =>
    `<g transform="translate(${x - 31},${y - 44}) scale(0.12)" fill="${P[color]}">${PIECES[name]}</g>`;
  const label = (text, x, y) =>
    textPath(text, {
      font: "monoMedium",
      size: 18,
      x,
      y,
      anchor: "middle",
      fg: tone.soft,
      bg: tone.bg,
      role: "label",
      maxWidth: 110,
    });
  const line = (text, y, size, font, fg, maxWidth) =>
    textPath(text, { font, size, x: 40, y, fg, bg: tone.bg, maxWidth });

  const houses = HOUSE_X.map((x, i) => {
    const king = i === HOUSE_X.length - 1;
    const box = `<rect class="house motion h${i}" x="${x - 42}" y="80" width="84" height="90" rx="8" fill="${P[king ? kingHouse : houseTone]}" stroke="${P.nogueira}" stroke-width="2"/>`;
    return box + piece(ROW[i], x, ROW_Y, king ? kingPiece : pieceTone) + label(copy.houses[i], x, 200);
  }).join("");

  const branches = BRANCHES.map(({ house, piece: name }, i) => {
    const x = HOUSE_X[house];
    const wire = `<path d="M${x} 212V260" fill="none" stroke="${P.nogueira}" stroke-width="2" stroke-dasharray="4 5"/>`;
    const box = `<rect x="${x - 37}" y="260" width="74" height="76" rx="7" fill="${P[houseTone]}" stroke="${P.nogueira}" stroke-width="2"/>`;
    return wire + box + piece(name, x, 302, pieceTone) + label(copy.branches[i], x, 365);
  }).join("");

  const [firstName, ...rest] = copy.name.split(" ");
  const text =
    line(firstName, 115, 96, "display", tone.text, 520) +
    line(rest.join(" "), 210, 96, "display", tone.text, 520) +
    copy.role
      .split(" · ")
      .map((part, i) => line(part, 282 + i * 42, 30, "mono", tone.soft, 560))
      .join("");

  const board = light ? EXTRA.xadrezClaro : P.nogueiraEscura;
  const defs =
    `<defs><pattern id="board" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M0 0H40V40H0Z M40 40H80V80H40Z" fill="${board}"/></pattern>` +
    `<linearGradient id="fade"><stop stop-color="${P.marfim}" stop-opacity="0"/><stop offset="1" stop-color="${P.marfim}"/></linearGradient>` +
    `<mask id="board-mask" style="mask-type:alpha"><rect width="1200" height="400" fill="url(#fade)"/></mask></defs>`;
  const motion =
    `.motion{animation-duration:${CYCLE};animation-iteration-count:infinite;animation-timing-function:linear}` +
    `.message{animation-name:travel}${travelFrames()}${glowFrames(P[tone.text])}`;
  const style = `<style>@media (prefers-reduced-motion: no-preference){${motion}}</style>`;
  const background =
    `<rect width="1200" height="400" rx="18" fill="${P[tone.bg]}"/>` +
    `<rect width="1200" height="400" rx="18" fill="url(#board)" mask="url(#board-mask)"/>`;
  const wire = `<path d="M${HOUSE_X[0]} ${ROW_Y}H${HOUSE_X.at(-1)}" fill="none" stroke="${P.nogueira}" stroke-width="2"/>`;
  const message = `<circle class="message motion" cx="${REST_X}" cy="${ROW_Y}" r="8" fill="${P.ambar}" stroke="${P.ebano}" stroke-width="3"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400">${defs}${style}${background}${text}${wire}${houses}${branches}${message}</svg>`;
}
