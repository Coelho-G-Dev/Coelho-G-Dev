import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { run, writeActivity } from "../src/activity.mjs";
import { CONTRIBUTIONS_URL, fetchContributions, parseContributions } from "../src/contributions.mjs";
import { renderTiles } from "../src/pieces/tiles.mjs";
import { countAmber, expectSafeSvg, stripMotion } from "./svg-rules.mjs";

const week = (i, level = 0, count = 0) => ({
  start: new Date(Date.UTC(2025, 10, 9) + i * 7 * 86400000).toISOString().slice(0, 10),
  level,
  count,
});
const weeksOf = (n, level = 0, count = 0) => Array.from({ length: n }, (_, i) => week(i, level, count));
const tiles = (svg) => (svg.match(/class="t"/g) ?? []).length;
const tempDir = () => mkdtempSync(join(tmpdir(), "activity-"));

const fixture = readFileSync(new URL("./fixtures/contributions.html", import.meta.url), "utf8");
const respond =
  (body, ok = true) =>
  async () => ({ ok, status: ok ? 200 : 503, text: async () => body });
const DAY = 24 * 60 * 60 * 1000;

describe("parseContributions", () => {
  it("lê o calendário público em semanas, da mais antiga para a mais nova", () => {
    const { total, weeks } = parseContributions(fixture);
    expect([52, 53]).toContain(weeks.length);
    expect(total).toBeGreaterThan(0);
    for (const week of weeks) {
      expect(week.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect([0, 1, 2, 3, 4]).toContain(week.level);
      expect(Number.isInteger(week.count)).toBe(true);
    }
    for (let i = 1; i < weeks.length; i += 1) {
      expect(Date.parse(weeks[i].start) - Date.parse(weeks[i - 1].start)).toBe(7 * DAY);
    }
  });

  it("usa o total que o GitHub escreve no cabeçalho", () => {
    const header = Number(
      fixture.match(/([\d,.]+)\s+contributions?\s+in the last year/)[1].replace(/[,.]/g, ""),
    );
    expect(parseContributions(fixture).total).toBe(header);
  });

  it("semana sem contribuição tem nível 0 e contagem 0", () => {
    const { weeks } = parseContributions(fixture);
    for (const week of weeks.filter((w) => w.level === 0)) expect(week.count).toBe(0);
  });

  it("devolve lista vazia quando a página não tem calendário", () => {
    expect(parseContributions("<html></html>")).toEqual({ total: 0, weeks: [] });
  });
});

describe("fetchContributions", () => {
  it("busca a página pública do perfil e devolve as semanas", async () => {
    const calls = [];
    const data = await fetchContributions(async (url) => {
      calls.push(url);
      return respond(fixture)();
    });
    expect(calls).toEqual([CONTRIBUTIONS_URL]);
    expect(CONTRIBUTIONS_URL).toBe("https://github.com/users/Coelho-G-Dev/contributions");
    expect(data.weeks.length).toBeGreaterThanOrEqual(52);
  });

  it("falha quando o GitHub não responde com sucesso", async () => {
    await expect(fetchContributions(respond(fixture, false))).rejects.toThrow(/503/);
  });

  it("falha quando a resposta não traz o calendário", async () => {
    await expect(fetchContributions(respond("<html></html>"))).rejects.toThrow(/0 semanas/);
  });
});

describe("renderTiles", () => {
  const base = { total: 120, locale: "en", theme: "dark" };

  it("desenha as últimas 52 semanas quando chegam 53", () => {
    expect(tiles(renderTiles({ ...base, weeks: weeksOf(53, 2, 3) }))).toBe(52);
  });

  it("desenha o que existe quando chegam menos de 52 semanas", () => {
    expect(tiles(renderTiles({ ...base, weeks: weeksOf(30, 1, 1) }))).toBe(30);
  });

  it("ano vazio: 52 azulejos lisos e o total zero escrito", () => {
    const empty = renderTiles({ ...base, total: 0, weeks: weeksOf(52) });
    const busy = renderTiles({ ...base, total: 0, weeks: weeksOf(52, 3, 5) });
    expect(tiles(empty)).toBe(52);
    expect(empty.length).toBeLessThan(busy.length);
    expect(renderTiles({ ...base, total: 0, weeks: weeksOf(52) })).not.toBe(
      renderTiles({ ...base, total: 7, weeks: weeksOf(52) }),
    );
  });

  it("o âmbar aparece uma vez, na semana atual, em qualquer nível", () => {
    for (const level of [0, 1, 2, 3, 4]) {
      const weeks = [...weeksOf(51, 4, 9), week(51, level, level)];
      expect(countAmber(renderTiles({ ...base, weeks }))).toBe(1);
    }
  });

  it("segue as regras de SVG, pesa até 100 kB e não tem animação em laço", () => {
    for (const theme of ["light", "dark"]) {
      for (const locale of ["en", "pt"]) {
        const svg = renderTiles({ total: 1234, locale, theme, weeks: parseContributions(fixture).weeks });
        expectSafeSvg(svg);
        expect(Buffer.byteLength(svg)).toBeLessThanOrEqual(100_000);
        expect(svg).not.toContain("infinite");
        expect(svg).toContain('viewBox="0 0 1200 ');
      }
    }
  });

  it("sem o bloco de movimento, todos os azulejos continuam visíveis", () => {
    const still = stripMotion(renderTiles({ ...base, weeks: weeksOf(52, 2, 2) }));
    expect(tiles(still)).toBe(52);
    expect(still).not.toMatch(/opacity\s*[:=]\s*["']?0\b/);
  });

  it("muda com o tema e com o idioma", () => {
    const weeks = weeksOf(52, 2, 2);
    expect(renderTiles({ ...base, weeks, theme: "light" })).not.toBe(
      renderTiles({ ...base, weeks, theme: "dark" }),
    );
    expect(renderTiles({ ...base, weeks, locale: "pt" })).not.toBe(
      renderTiles({ ...base, weeks, locale: "en" }),
    );
  });
});

describe("writeActivity e run", () => {
  it("grava os quatro arquivos, com fim de linha LF", () => {
    const dir = tempDir();
    const written = writeActivity(dir, parseContributions(fixture));
    expect(written.sort()).toEqual([
      "activity-en-dark.svg",
      "activity-en-light.svg",
      "activity-pt-dark.svg",
      "activity-pt-light.svg",
    ]);
    for (const name of written) {
      const text = readFileSync(join(dir, name), "utf8");
      expect(text).not.toContain("\r");
      expect(text.endsWith("\n")).toBe(true);
    }
  });

  it("não grava nada quando a busca falha", async () => {
    const dir = tempDir();
    await expect(run(dir, respond(fixture, false))).rejects.toThrow();
    await expect(run(dir, respond("<html></html>"))).rejects.toThrow();
    expect(readdirSync(dir)).toEqual([]);
  });

  it("grava quando a busca funciona", async () => {
    const dir = tempDir();
    await run(dir, respond(fixture));
    expect(readdirSync(dir)).toHaveLength(4);
  });
});

describe("parseContributions com o HTML reordenado", () => {
  it("lê os mesmos dias quando o GitHub troca a ordem dos atributos", () => {
    const reordered = fixture.replace(
      /(<td[^>]*?)\s(data-date="[^"]+")\s(id="[^"]+")([^>]*?)\s(data-level="\d")/g,
      "$1 $5 $3$4 $2",
    );
    expect(reordered).not.toBe(fixture);
    expect(reordered).toMatch(/<td[^>]*data-level="\d"[^>]*id="[^"]+"[^>]*data-date=/);
    expect(parseContributions(reordered)).toEqual(parseContributions(fixture));
  });
});
