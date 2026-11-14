import { describe, it, expect } from "vitest";
import { PALETTE, DOOR_TONES, TEXT_PAIRS, contrast, assertTextPair } from "../src/palette.mjs";
describe("palette contracts", () => {
  it("preserves the site palette", () =>
    expect(Object.values(PALETTE)).toEqual([
      "#0E0F13",
      "#2A2018",
      "#8A6A4A",
      "#D9C3A0",
      "#F4EEE3",
      "#F5A524",
    ]));
  it("allows only readable text pairs", () => {
    for (const { fg, bg, min } of TEXT_PAIRS)
      expect(contrast(PALETTE[fg], PALETTE[bg])).toBeGreaterThanOrEqual(min);
    expect(contrast("#F5A524", "#F4EEE3")).toBeLessThan(3);
    expect(() => assertTextPair("ambar", "marfim")).toThrow();
    expect(() => assertTextPair("nogueira", "ebano")).toThrow();
    expect(() => assertTextPair("marfim", "backend")).not.toThrow();
    expect(() => assertTextPair("bordo", "backend")).toThrow();
  });
  it("keeps door text readable", () => {
    for (const door of Object.values(DOOR_TONES))
      expect(contrast(PALETTE.marfim, door.claro)).toBeGreaterThanOrEqual(4.5);
  });
});
