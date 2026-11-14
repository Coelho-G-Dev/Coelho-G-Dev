import { LOCALES, THEMES, NAV, DOORS } from "./data.mjs";
import { renderCover } from "./pieces/cover.mjs";
import { renderNav } from "./pieces/nav.mjs";
import { renderButton } from "./pieces/button.mjs";
import { renderFeatured } from "./pieces/featured.mjs";
import { renderDoor } from "./pieces/door.mjs";
export function listAssets() {
  const assets = [];
  for (const locale of LOCALES) {
    for (const theme of THEMES) {
      assets.push({
        path: "assets/cover-" + locale + "-" + theme + ".svg",
        render: () => renderCover({ locale, theme }),
      });
      for (const item of NAV)
        assets.push({
          path: "assets/nav-" + item + "-" + locale + "-" + theme + ".svg",
          render: () => renderNav({ item, locale, theme }),
        });
    }
    assets.push({ path: "assets/button-" + locale + ".svg", render: () => renderButton({ locale }) });
    assets.push({ path: "assets/featured-" + locale + ".svg", render: () => renderFeatured({ locale }) });
    for (const door of DOORS)
      assets.push({
        path: "assets/door-" + door + "-" + locale + ".svg",
        render: () => renderDoor({ door, locale }),
      });
  }
  return assets.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}
