import { COPY, PROJECTS } from "../data.mjs";
import { PALETTE as P } from "../palette.mjs";
import { textPath } from "../text.mjs";
export function renderFeatured({ locale }) {
  const c = COPY[locale];
  const line = (text, font, size, y, fg) =>
    textPath(text, { font, size, x: 40, y, fg, bg: "nogueiraEscura", maxWidth: 1120 });
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 220"><rect width="1200" height="220" rx="10" fill="' +
    P.nogueiraEscura +
    '"/>' +
    line(c.award, "mono", 36, 50, "ambar") +
    line(PROJECTS.cidade.title, "display", 64, 130, "marfim") +
    line(c.featuredLine, "mono", 36, 190, "bordo") +
    "</svg>"
  );
}
