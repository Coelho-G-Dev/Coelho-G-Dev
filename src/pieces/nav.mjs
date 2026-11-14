import { COPY } from '../data.mjs';
import { PALETTE as P } from '../palette.mjs';
import { textPath } from '../text.mjs';
export function renderNav({item,locale,theme}) {
  const dark=theme==='dark',bg=dark?'nogueiraEscura':'bordo',fg=dark?'bordo':'nogueiraEscura';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 96"><rect x="1" y="1" width="378" height="94" rx="8" fill="'+P[bg]+'" stroke="'+P[fg]+'" stroke-width="2"/>'+textPath(COPY[locale].nav[item],{font:'display',size:40,x:190,y:61,anchor:'middle',fg,bg,maxWidth:330})+'</svg>';
}
