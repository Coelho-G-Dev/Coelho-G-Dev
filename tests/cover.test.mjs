import { it, expect } from "vitest";
import { HOUSE_X, renderCover } from "../src/pieces/cover.mjs";
import { expectSafeSvg, countAmber, stripMotion } from "./svg-rules.mjs";
import { COPY } from "../src/data.mjs";
import { THEME } from "../src/palette.mjs";
import { textPath, textWidth } from "../src/text.mjs";
for (const locale of ["en", "pt"])
  for (const theme of ["light", "dark"])
    it("renders safe animated cover " + locale + "/" + theme, () => {
      const svg = renderCover({ locale, theme });
      expectSafeSvg(svg);
      expect(countAmber(svg)).toBe(1);
      expect(svg).toContain('viewBox="0 0 1200 400"');
      expect(svg.match(/infinite/g)).toHaveLength(1);
      expect(svg).toContain("@media (prefers-reduced-motion: no-preference)");
      expect(stripMotion(svg)).toContain('<circle class="message motion" cx="819" cy="125"');
      expect(Buffer.byteLength(svg)).toBeLessThanOrEqual(100000);
      expect(svg.match(/class="house motion/g)).toHaveLength(5);
      expect(svg).toContain("8s");
    });
it("changes colors and copy across themes and languages", () => {
  expect(renderCover({ locale: "en", theme: "dark" })).not.toBe(
    renderCover({ locale: "en", theme: "light" }),
  );
  expect(renderCover({ locale: "en", theme: "dark" })).not.toBe(renderCover({ locale: "pt", theme: "dark" }));
});
it("keeps each role part on its own line without a leading separator", () => {
  for (const locale of ["en", "pt"])
    for (const theme of ["light", "dark"]) {
      const t = THEME[theme],
        svg = renderCover({ locale, theme });
      COPY[locale].role.split(" · ").forEach((part, i) => {
        expect(svg).toContain(
          textPath(part, {
            font: "mono",
            size: 30,
            x: 40,
            y: 282 + i * 42,
            fg: t.soft,
            bg: t.bg,
            maxWidth: 560,
          }),
        );
      });
    }
});
it("returns every border to walnut within two percent of its active window", () => {
  const svg = renderCover({ locale: "en", theme: "dark" });
  for (let i = 0; i < 5; i++) {
    const frames = svg.match(new RegExp("@keyframes house" + i + "\\{([\\s\\S]*?)\\}\\s*\\.h"))[1] + "}";
    const base = frames.match(/([^{}]+)\{stroke:#8A6A4A\}/)[1].split(",");
    const active = frames.match(/([^{}]+)\{stroke:#F4EEE3\}/)[1].split(",");
    expect(base).toContain(i * 20 + "%");
    expect(base).toContain(i * 20 + 16 + "%");
    expect(active).toEqual([i * 20 + 2 + "%", i * 20 + 14 + "%"]);
  }
});
it("keeps at least ten units between neighbouring house labels in both languages", () => {
  for (const locale of ["en", "pt"]) {
    const widths = COPY[locale].houses.map((label) => textWidth(label, { font: "monoMedium", size: 18 }));
    for (let i = 0; i < 4; i += 1) {
      const gap = HOUSE_X[i + 1] - HOUSE_X[i] - (widths[i] + widths[i + 1]) / 2;
      expect(gap, locale + " " + COPY[locale].houses[i]).toBeGreaterThanOrEqual(10);
    }
  }
});
it("draws the pieces in ebony on the light theme and in maple on the dark one, with the king inverted", () => {
  const pieces = (theme, hex) =>
    renderCover({ locale: "en", theme }).split('scale(0.12)" fill="' + hex + '"').length - 1;
  expect(pieces("light", "#0E0F13")).toBe(6);
  expect(pieces("light", "#F4EEE3")).toBe(1);
  expect(pieces("dark", "#D9C3A0")).toBe(6);
  expect(pieces("dark", "#0E0F13")).toBe(1);
});
it("rests the message on the wire between the second and third houses when still", () => {
  expect((HOUSE_X[1] + HOUSE_X[2]) / 2).toBe(819);
});
it("stops the message at the top right corner of each house, off the piece, and rides the wire in between", () => {
  const svg = renderCover({ locale: "en", theme: "dark" });
  const travel = svg.match(/@keyframes travel\{([\s\S]*?\})\}/)[1];
  HOUSE_X.forEach((x, i) => {
    const from = i === 0 ? "0%" : i * 20 + 2 + "%";
    expect(travel).toContain(
      from + "," + (i * 20 + 14) + "%{transform:translate(" + (x + 28 - 819) + "px,-31px)}",
    );
  });
  for (let i = 0; i < 4; i += 1) {
    const middle = (HOUSE_X[i] + HOUSE_X[i + 1]) / 2 - 819;
    expect(travel).toContain(i * 20 + 18 + "%{transform:translate(" + middle + "px,0px)}");
  }
  expect(travel).toContain("100%{transform:translate(" + (HOUSE_X[0] + 28 - 819) + "px,-31px)}");
});
