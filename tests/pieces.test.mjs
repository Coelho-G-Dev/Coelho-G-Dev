import { it, expect, vi } from "vitest";
import { listAssets } from "../src/assets.mjs";
import { expectSafeSvg, countAmber } from "./svg-rules.mjs";
import { COPY } from "../src/data.mjs";
import { textPath } from "../src/text.mjs";
it("lists every fixed asset once in deterministic path order", () => {
  const paths = listAssets().map((a) => a.path);
  expect(paths).toHaveLength(26);
  expect(new Set(paths).size).toBe(26);
  expect(paths).toEqual([...paths].sort());
  for (const p of [
    "assets/cover-en-dark.svg",
    "assets/nav-contact-pt-light.svg",
    "assets/button-pt.svg",
    "assets/featured-en.svg",
    "assets/door-ia-pt.svg",
  ])
    expect(paths).toContain(p);
});
it("keeps all SVGs safe, within weight, and limits amber and looping motion", () => {
  for (const { path, render } of listAssets()) {
    const svg = render();
    expectSafeSvg(svg);
    expect(Buffer.byteLength(svg), path).toBeLessThanOrEqual(100000);
    expect(countAmber(svg), path).toBe(/\/(cover|button|featured)-/.test(path) ? 1 : 0);
    if (!path.includes("/cover-")) expect(svg).not.toContain("animation");
  }
});
it("leaves at least 100 kB of the visit budget for activity", () => {
  for (const locale of ["en", "pt"])
    for (const theme of ["dark", "light"]) {
      const visit = listAssets().filter(
        (a) => a.path.endsWith("-" + locale + "-" + theme + ".svg") || a.path.endsWith("-" + locale + ".svg"),
      );
      expect(visit).toHaveLength(9);
      expect(visit.reduce((n, a) => n + Buffer.byteLength(a.render()), 0)).toBeLessThanOrEqual(300000);
    }
});
it("derives door counts from added projects", async () => {
  vi.resetModules();
  vi.doMock("../src/data.mjs", async (importOriginal) => {
    const original = await importOriginal();
    const lists = {
      ...original.DOOR_LISTS,
      frontend: [...original.DOOR_LISTS.frontend, { id: "authguard", link: "repo" }],
    };
    return { ...original, DOOR_LISTS: lists, doorCount: (door) => lists[door].length };
  });
  const { renderDoor } = await import("../src/pieces/door.mjs");
  const { textPath } = await import("../src/text.mjs");
  const output = renderDoor({ door: "frontend", locale: "en" });
  expect(output).toContain(
    textPath("3 projects", {
      font: "mono",
      size: 38,
      x: 1160,
      y: 72,
      anchor: "end",
      fg: "marfim",
      bg: "frontend",
    }),
  );
  vi.doUnmock("../src/data.mjs");
  vi.resetModules();
  const normal = await import("../src/pieces/door.mjs");
  expect(output).not.toBe(normal.renderDoor({ door: "frontend", locale: "en" }));
});
it("uses the reviewed mobile reading sizes for doors and featured copy", () => {
  for (const { path, render } of listAssets().filter((a) => /\/(door|featured)-/.test(a.path))) {
    const svg = render(),
      locale = path.endsWith("-pt.svg") ? "pt" : "en";
    if (path.includes("/door-")) {
      const door = path.match(/door-(\w+)-/)[1];
      expect(svg).toContain('viewBox="0 0 1200 200"');
      expect(svg).toContain(
        textPath(COPY[locale].doors[door].line, {
          font: "mono",
          size: 38,
          x: 40,
          y: 150,
          fg: "marfim",
          bg: door,
          maxWidth: 1120,
        }),
      );
    } else {
      expect(svg).toContain('viewBox="0 0 1200 220"');
      expect(svg).toContain(
        textPath(COPY[locale].award, {
          font: "mono",
          size: 36,
          x: 40,
          y: 50,
          fg: "ambar",
          bg: "nogueiraEscura",
          maxWidth: 1120,
        }),
      );
    }
  }
});
