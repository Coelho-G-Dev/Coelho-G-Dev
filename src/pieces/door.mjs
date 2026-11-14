import { COPY, doorCount, countLabel } from '../data.mjs';
import { DOOR_TONES } from '../palette.mjs';
import { textPath } from '../text.mjs';
export function renderDoor({door,locale}) {
  const tones=DOOR_TONES[door],c=COPY[locale].doors[door];
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200"><rect width="1200" height="200" rx="8" fill="'+tones.escuro+'"/><rect x="8" y="8" width="1184" height="184" rx="4" fill="'+tones.claro+'"/>'+textPath(c.name,{font:'display',size:64,x:40,y:72,fg:'marfim',bg:door,maxWidth:700})+textPath(countLabel(doorCount(door),locale),{font:'mono',size:38,x:1160,y:72,anchor:'end',fg:'marfim',bg:door})+textPath(c.line,{font:'mono',size:38,x:40,y:150,fg:'marfim',bg:door,maxWidth:1120})+'</svg>';
}
