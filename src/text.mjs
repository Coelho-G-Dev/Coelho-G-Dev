import fs from "node:fs";
import opentype from "opentype.js";
import { PALETTE, assertTextPair } from "./palette.mjs";

const fonts = Object.fromEntries(
  Object.entries({ display: "bricolage-800", mono: "mono-400", monoMedium: "mono-500" }).map(
    ([key, file]) => {
      const b = fs.readFileSync(new URL("./fonts/" + file + ".woff", import.meta.url));
      return [key, opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength))];
    },
  ),
);
function checkedFont(text, name, size) {
  const font = fonts[name];
  if (!font) throw new Error("Unknown font: " + name);
  if (!Number.isFinite(size) || size <= 0) throw new Error("Invalid font size: " + size);
  for (const char of text)
    if (!font.charToGlyphIndex(char)) throw new Error("Missing glyph: " + char + " (" + name + ")");
  return font;
}
export function textWidth(text, { font = "mono", size }) {
  return checkedFont(text, font, size).getAdvanceWidth(text, size);
}
export function textPath(
  text,
  { font = "mono", size, x, y, anchor = "start", fg, bg, role = "essential", maxWidth = Infinity },
) {
  const face = checkedFont(text, font, size);
  if (!["essential", "label"].includes(role) || size < (role === "label" ? 18 : 30))
    throw new Error("Text below minimum size: " + size + " (" + role + ")");
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error("Invalid text position");
  assertTextPair(fg, bg);
  const width = textWidth(text, { font, size });
  if (width > maxWidth) throw new Error("Text width " + width + " exceeds " + maxWidth + ": " + text);
  if (!["start", "middle", "end"].includes(anchor)) throw new Error("Invalid text anchor: " + anchor);
  const bounds = face.getPath(text, 0, 0, size).getBoundingBox();
  const offset = anchor === "middle" ? -(bounds.x1 + bounds.x2) / 2 : anchor === "end" ? -bounds.x2 : 0;
  return (
    '<path d="' + face.getPath(text, x + offset, y, size).toPathData(1) + '" fill="' + PALETTE[fg] + '"/>'
  );
}
