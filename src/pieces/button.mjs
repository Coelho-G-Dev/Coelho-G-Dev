import { COPY } from '../data.mjs';
import { PALETTE as P } from '../palette.mjs';
import { textPath } from '../text.mjs';
export function renderButton({locale}) {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 96"><rect width="1200" height="96" rx="8" fill="'+P.ambar+'"/>'+textPath(COPY[locale].button,{font:'monoMedium',size:36,x:600,y:61,anchor:'middle',fg:'ebano',bg:'ambar',maxWidth:1000})+'<path d="M1090 48H1126M1112 34L1126 48L1112 62" fill="none" stroke="'+P.ebano+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
