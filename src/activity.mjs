// Writes the four activity images (language x theme). Run by the workflow: `npm run activity`.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { fetchContributions } from "./contributions.mjs";
import { LOCALES, THEMES } from "./data.mjs";
import { renderTiles } from "./pieces/tiles.mjs";

export function writeActivity(outDir, { total, weeks }) {
  const files = LOCALES.flatMap((locale) =>
    THEMES.map((theme) => [`activity-${locale}-${theme}.svg`, renderTiles({ weeks, total, locale, theme })]),
  );
  mkdirSync(outDir, { recursive: true });
  for (const [name, svg] of files) writeFileSync(join(outDir, name), svg);
  return files.map(([name]) => name);
}

// Fetch first: when GitHub fails, nothing is written and the previous images stay published.
export async function run(outDir, fetchImpl) {
  return writeActivity(outDir, await fetchContributions(fetchImpl));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run("dist").then(
    (files) => console.log(`dist: ${files.join(", ")}`),
    (error) => {
      console.error(error.message);
      process.exit(1);
    },
  );
}
