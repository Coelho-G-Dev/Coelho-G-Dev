import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { listAssets } from "../src/assets.mjs";
import { COPY, DOORS, LOCALES, NUMBERS, SITE } from "../src/data.mjs";
import { DOOR_MODE, NAV_MARKUP, escapeHtml, renderReadme } from "../src/readme.mjs";

const OUTPUT_URL = /^https:\/\/raw\.githubusercontent\.com\/Coelho-G-Dev\/Coelho-G-Dev\/output\/activity-(en|pt)-(light|dark)\.svg$/;
const BANNED = ["passionate", "robust", "seamless", "cutting-edge", "innovative", "leverage", "apaixonado", "robusto", "inovador", "de ponta"];

const attrs = (html, name) => [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, "g"))].map((m) => m[1]);
const slug = (title) => title.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-");
const headings = (md) => [...md.matchAll(/^(#{1,6}) (.+)$/gm)].map((m) => ({ level: m[1].length, title: m[2] }));
const tags = (md) => [...md.matchAll(/<\/?([a-z][a-z0-9]*)/g)].map((m) => m[0]);
const count = (text, part) => text.split(part).length - 1;

afterEach(() => {
  vi.doUnmock("../src/data.mjs");
  vi.resetModules();
});

describe.each(LOCALES)("README em %s", (locale) => {
  const md = renderReadme(locale);
  const copy = COPY[locale];

  it("usa as marcações que passaram na prova do GitHub", () => {
    expect(DOOR_MODE).toBe("picture");
    expect(NAV_MARKUP).toBe("inline33");
  });

  it("só aponta para imagens do próprio repositório", () => {
    const assets = new Set(listAssets().map((asset) => asset.path));
    const sources = [...attrs(md, "src"), ...attrs(md, "srcset")];
    expect(sources.length).toBeGreaterThan(10);
    for (const source of sources) {
      if (source.startsWith("assets/")) expect(assets.has(source)).toBe(true);
      else expect(source).toMatch(OUTPUT_URL);
    }
    expect(sources.filter((source) => OUTPUT_URL.test(source))).toEqual([
      `https://raw.githubusercontent.com/Coelho-G-Dev/Coelho-G-Dev/output/activity-${locale}-light.svg`,
      `https://raw.githubusercontent.com/Coelho-G-Dev/Coelho-G-Dev/output/activity-${locale}-dark.svg`,
    ]);
  });

  it("não traz nada do README antigo nem WhatsApp", () => {
    for (const old of ["shields.io", "github-readme-stats", "readme-typing", "wa.me", "WhatsApp", "tokyonight"]) {
      expect(md).not.toContain(old);
    }
  });

  it("toda imagem tem alt, e o da capa diz o nome e o cargo", () => {
    const images = md.match(/<img\b[^>]*>/g);
    for (const image of images) expect(image).toMatch(/\salt="[^"]+"/);
    const cover = images.find((image) => image.includes("assets/cover-"));
    expect(cover).toContain(escapeHtml(copy.name));
    expect(cover).toContain(escapeHtml(copy.role));
  });

  it("nenhuma imagem fica solta: o GitHub transforma imagem solta em link para o arquivo", () => {
    const rest = md.replace(/<a\b[\s\S]*?<\/a>/g, "").replace(/<picture>[\s\S]*?<\/picture>/g, "");
    expect(rest).not.toContain("<img");
  });

  it("toda âncora interna tem um título", () => {
    const slugs = headings(md).map((heading) => slug(heading.title));
    const anchors = attrs(md, "href").filter((href) => href.startsWith("#"));
    expect(anchors).toEqual(["work", "skills", "contact"].map((item) => `#${slug(copy.nav[item])}`));
    for (const anchor of anchors) expect(slugs).toContain(anchor.slice(1));
  });

  it("tem três portas, fechadas, com a imagem dentro de picture", () => {
    expect(count(md, "<details>")).toBe(3);
    expect(md).not.toMatch(/<details[^>]*\sopen/);
    for (const door of DOORS) {
      expect(md).toContain(`<summary><picture><img src="assets/door-${door}-${locale}.svg" width="94%" align="middle"`);
    }
  });

  it("cada projeto leva à porta certa do site", () => {
    expect(count(md, `href="${SITE}/#porta-backend"`)).toBe(6);
    expect(count(md, `href="${SITE}/#porta-frontend"`)).toBe(2);
    expect(count(md, `href="${SITE}/#porta-ia"`)).toBe(3);
  });

  it("não tem travessão, emoji nem palavra vetada", () => {
    expect(md).not.toContain("—");
    expect(md).not.toMatch(/\p{Extended_Pictographic}/u);
    for (const word of BANNED) expect(md.toLowerCase()).not.toContain(word);
  });

  it("traz os números dos dados", () => {
    expect(md).toContain(String(NUMBERS.testsCidade));
    expect(md).toContain(String(NUMBERS.testsAuthguard));
  });

  it("termina com uma quebra de linha e não usa CRLF", () => {
    expect(md.endsWith("\n")).toBe(true);
    expect(md.endsWith("\n\n")).toBe(false);
    expect(md).not.toContain("\r");
  });
});

describe("os dois idiomas", () => {
  it("têm a mesma estrutura", () => {
    const en = renderReadme("en");
    const pt = renderReadme("pt");
    expect(tags(pt)).toEqual(tags(en));
    expect(headings(pt).map((heading) => heading.level)).toEqual(headings(en).map((heading) => heading.level));
  });

  it("apontam um para o outro", () => {
    expect(renderReadme("en")).toContain('<a href="README.pt-BR.md">Português</a>');
    expect(renderReadme("pt")).toContain('<a href="https://github.com/Coelho-G-Dev">English</a>');
  });
});

describe("o código do README", () => {
  it("não escreve número solto", () => {
    // Larguras em porcentagem (width="94%") são medida de layout, não dado.
    const source = readFileSync(new URL("../src/readme.mjs", import.meta.url), "utf8").replace(/\d+%/g, "");
    for (const number of ["435", "94", "2026"]) expect(source).not.toContain(number);
  });

  it("escapeHtml troca os cinco caracteres", () => {
    expect(escapeHtml(`R&D "Lab" <x> 'y'`)).toBe("R&amp;D &quot;Lab&quot; &lt;x&gt; &#39;y&#39;");
  });
});

describe("com dados diferentes", () => {
  const mockData = (change) => {
    vi.resetModules();
    vi.doMock("../src/data.mjs", async (importOriginal) => change(structuredCloneCopy(await importOriginal())));
    return import("../src/readme.mjs");
  };
  // Module namespaces are frozen and hold functions, so copy one level and clone the plain data.
  const structuredCloneCopy = (real) => ({
    ...real,
    PROJECTS: structuredClone(real.PROJECTS),
    DOOR_LISTS: structuredClone(real.DOOR_LISTS),
    COPY: { en: { ...real.COPY.en, doors: structuredClone(real.COPY.en.doors) }, pt: { ...real.COPY.pt } },
  });

  it("escapa nome de projeto e texto de alt com &, < e aspas", async () => {
    const { renderReadme: render } = await mockData((data) => {
      data.PROJECTS.authguard.title = 'R&D "Lab" <x>';
      data.COPY.en.doors.backend.name = 'R&D "Lab" <x>';
      return data;
    });
    const md = render("en");
    expect(md).toContain("<strong>R&amp;D &quot;Lab&quot; &lt;x&gt;</strong>");
    expect(md).toMatch(/alt="R&amp;D &quot;Lab&quot; &lt;x&gt;\./);
    expect(md).not.toContain("<x>");
  });

  it("porta com um projeto fica no singular e com um item", async () => {
    const { renderReadme: render } = await mockData((data) => {
      data.DOOR_LISTS.frontend = data.DOOR_LISTS.frontend.slice(0, 1);
      return data;
    });
    const md = render("en");
    const door = md.match(/<details>\s*<summary><picture><img src="assets\/door-frontend-en\.svg"[\s\S]*?<\/details>/)[0];
    expect(door).toMatch(/alt="[^"]*1 project"/);
    expect(count(door, "<li>")).toBe(1);
  });

  it("projeto novo nos dados aparece sem mexer no modelo", async () => {
    const { renderReadme: render } = await mockData((data) => {
      data.PROJECTS.novo = { title: "Projeto Novo", repo: "https://github.com/Coelho-G-Dev/novo" };
      data.DOOR_LISTS.ia.push({ id: "novo", link: "repo", en: "A new fact.", pt: "Um fato novo." });
      return data;
    });
    const md = render("en");
    expect(md).toContain("<strong>Projeto Novo</strong>: A new fact.");
    expect(md).toMatch(/alt="[^"]*4 projects"/);
  });
});
