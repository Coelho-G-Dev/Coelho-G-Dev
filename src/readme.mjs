// Builds README.md (English) and README.pt-BR.md from the data file.
import { COPY, DOORS, DOOR_LISTS, LINKS, NAV, PROJECTS, SITE, SKILLS, countLabel } from "./data.mjs";

// Both were chosen on a real GitHub page:
// - an image alone inside <summary> becomes a link to its own file; inside <picture> it toggles the door;
// - three images at 33% with no whitespace between the tags stay on one line, with no gap.
export const DOOR_MODE = "picture";
export const NAV_MARKUP = "inline33";

const PROFILE = "https://github.com/Coelho-G-Dev";
const OUTPUT = "https://raw.githubusercontent.com/Coelho-G-Dev/Coelho-G-Dev/output";
const PT_FILE = "README.pt-BR.md";

// Words only the README needs (link labels and alt text).
const WORDS = {
  en: {
    repository: "Repository",
    diagram: (houses, branches) =>
      `Diagram: a message travels from ${houses[0]} to ${houses.slice(1, -1).join(", ")} and ${houses.at(-1)}, with ${branches.join(" and ")} branches.`,
    tilesAlt: "One tile per week of contributions on GitHub over the last twelve months.",
  },
  pt: {
    repository: "Repositório",
    diagram: (houses, branches) =>
      `Diagrama: uma mensagem vai de ${houses[0]} a ${houses.slice(1, -1).join(", ")} e ${houses.at(-1)}, com os ramos ${branches.join(" e ")}.`,
    tilesAlt: "Um azulejo por semana de contribuições no GitHub nos últimos doze meses.",
  },
};

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ESCAPES[char]);

const slug = (title) =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
const link = (href, label) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
const img = (src, alt, extra = 'width="100%"') => `<img src="${src}" ${extra} alt="${escapeHtml(alt)}">`;
const themed = (dark, light, alt, extra) =>
  `<picture><source media="(prefers-color-scheme: dark)" srcset="${dark}">${img(light, alt, extra)}</picture>`;

function nav(locale, copy) {
  const houses = NAV.map((item) => {
    const file = (theme) => `assets/nav-${item}-${locale}-${theme}.svg`;
    return `<a href="#${slug(copy.nav[item])}">${themed(file("dark"), file("light"), copy.nav[item], 'width="33%"')}</a>`;
  });
  return `<p align="center">${houses.join("")}</p>`;
}

function featured(locale, copy) {
  const { app, docs, repo, front } = PROJECTS.cidade;
  const links = [app, docs, repo, front].map((href, i) => link(href, copy.featuredLinks[i]));
  const alt = `${copy.award}. ${PROJECTS.cidade.title}. ${copy.featuredLine}`;
  return [
    `<a href="${SITE}/#projetos">${img(`assets/featured-${locale}.svg`, alt)}</a>`,
    `<p>${links.join(" · ")}</p>`,
    `<p>${escapeHtml(copy.builtWith)}</p>`,
  ].join("\n\n");
}

function door(door, locale, copy, words) {
  const { name, line } = copy.doors[door];
  const entries = DOOR_LISTS[door];
  const alt = `${name}. ${line} ${countLabel(entries.length, locale)}`;
  const items = entries.map((entry) => {
    const project = PROJECTS[entry.id];
    const links = [
      link(project[entry.link], words.repository),
      link(`${SITE}/#porta-${door}`, copy.inPortfolio),
    ];
    return `<li><strong>${escapeHtml(project.title)}</strong>: ${escapeHtml(entry[locale])} ${links.join(" · ")}</li>`;
  });
  return [
    "<details>",
    `<summary><picture>${img(`assets/door-${door}-${locale}.svg`, alt, 'width="94%" align="middle"')}</picture></summary>`,
    "<ul>",
    ...items,
    "</ul>",
    "</details>",
  ].join("\n");
}

function skills(locale, copy) {
  const rows = SKILLS[locale].map(
    (group) =>
      `<li><strong>${escapeHtml(group.name)}:</strong> ${group.items.map(escapeHtml).join(" · ")}</li>`,
  );
  return ["<ul>", ...rows, "</ul>", "", `<p>${link(`${SITE}/#sobre`, copy.skillsMore)}</p>`].join("\n");
}

export function renderReadme(locale) {
  const copy = COPY[locale];
  const words = WORDS[locale];
  const other = locale === "en" ? PT_FILE : PROFILE;
  const coverAlt = `${copy.name}. ${copy.role}. ${words.diagram(copy.houses, copy.branches)}`;
  const contact = [SITE, LINKS.linkedin, LINKS.email].map((href, i) => link(href, copy.contact[i]));

  const blocks = [
    `<p align="right">${link(other, copy.otherLanguage)}</p>`,
    `<a href="${SITE}">${themed(`assets/cover-${locale}-dark.svg`, `assets/cover-${locale}-light.svg`, coverAlt)}</a>`,
    nav(locale, copy),
    `<p>${escapeHtml(copy.intro)}</p>`,
    `<a href="${SITE}">${img(`assets/button-${locale}.svg`, copy.button)}</a>`,
    `## ${escapeHtml(copy.nav.work)}`,
    featured(locale, copy),
    ...DOORS.map((id) => door(id, locale, copy, words)),
    `## ${escapeHtml(copy.nav.skills)}`,
    skills(locale, copy),
    `## ${escapeHtml(copy.tilesTitle)}`,
    themed(`${OUTPUT}/activity-${locale}-dark.svg`, `${OUTPUT}/activity-${locale}-light.svg`, words.tilesAlt),
    `<p>${escapeHtml(copy.tilesLegend)}</p>`,
    `## ${escapeHtml(copy.nav.contact)}`,
    `<p>${contact.join(" · ")}</p>`,
  ];
  return `${blocks.join("\n\n")}\n`;
}
