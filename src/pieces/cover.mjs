import { COPY } from '../data.mjs';
import { PALETTE as P, THEME, EXTRA } from '../palette.mjs';
import { textPath } from '../text.mjs';
import { PIECES } from './chess.mjs';

export function renderCover({locale,theme}) {
  const c=COPY[locale],t=THEME[theme];
  if(!c || !t) throw new Error('Unknown cover locale or theme');
  const light=theme==='light',houseBg=light?'marfim':'nogueiraEscura';
  const positions=[650,760,870,980,1090];
  const names=['peao','cavalo','torre','bispo','rei'];
  const icon=(name,x,y,color)=>'<g transform="translate('+(x-31)+','+(y-44)+') scale(0.12)" fill="'+P[color]+'">'+PIECES[name]+'</g>';
  const label=(s,x,y)=>textPath(s,{font:'monoMedium',size:18,x,y,anchor:'middle',fg:t.soft,bg:t.bg,role:'label',maxWidth:110});
  const houses=positions.map((x,i)=>{
    const king=i===4,bg=king?(light?'ebano':'marfim'):houseBg,fg=king?(light?'marfim':'ebano'):t.soft;
    return '<rect class="house motion h'+i+'" x="'+(x-42)+'" y="80" width="84" height="90" rx="8" fill="'+P[bg]+'" stroke="'+P.nogueira+'" stroke-width="2"/>'+icon(names[i],x,125,fg)+label(c.houses[i],x,200);
  }).join('');
  const branches=[{x:870,name:'torre',label:c.branches[0]},{x:980,name:'dama',label:c.branches[1]}].map(b=>'<path d="M'+b.x+' 212V260" fill="none" stroke="'+P.nogueira+'" stroke-width="2" stroke-dasharray="4 5"/><rect x="'+(b.x-37)+'" y="260" width="74" height="76" rx="7" fill="'+P[houseBg]+'" stroke="'+P.nogueira+'" stroke-width="2"/>'+icon(b.name,b.x,302,t.soft)+label(b.label,b.x,365)).join('');
  const glows=positions.map((_,i)=>'@keyframes house'+i+'{0%,100%,'+(i*20)+'%,'+(i*20+16)+'%{stroke:'+P.nogueira+'}'+(i*20+2)+'%,'+(i*20+14)+'%{stroke:'+P[t.text]+'}} .h'+i+'{animation-name:house'+i+'}').join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400">'+
    '<defs><pattern id="board" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M0 0H40V40H0Z M40 40H80V80H40Z" fill="'+(light?EXTRA.xadrezClaro:P.nogueiraEscura)+'"/></pattern><linearGradient id="fade"><stop stop-color="'+P.marfim+'" stop-opacity="0"/><stop offset="1" stop-color="'+P.marfim+'"/></linearGradient><mask id="board-mask" style="mask-type:alpha"><rect width="1200" height="400" fill="url(#fade)"/></mask></defs>'+
    '<style>@media (prefers-reduced-motion: no-preference){.motion{animation-duration:8s;animation-iteration-count:infinite;animation-timing-function:linear}.message{animation-name:travel}@keyframes travel{0%,14%{transform:translateX(-165px)}20%,34%{transform:translateX(-55px)}40%,54%{transform:translateX(55px)}60%,74%{transform:translateX(165px)}80%,94%{transform:translateX(275px)}100%{transform:translateX(-165px)}}'+glows+'}</style>'+
    '<rect width="1200" height="400" rx="18" fill="'+P[t.bg]+'"/><rect width="1200" height="400" rx="18" fill="url(#board)" mask="url(#board-mask)"/>'+
    textPath(c.name.split(' ')[0],{font:'display',size:96,x:40,y:115,fg:t.text,bg:t.bg,maxWidth:520})+
    textPath(c.name.split(' ').slice(1).join(' '),{font:'display',size:96,x:40,y:210,fg:t.text,bg:t.bg,maxWidth:520})+
    c.role.split(' · ').map((line,i)=>textPath(line,{font:'mono',size:30,x:40,y:282+i*42,fg:t.soft,bg:t.bg,maxWidth:560})).join('')+
    '<path d="M650 125H1090" fill="none" stroke="'+P.nogueira+'" stroke-width="2"/>'+houses+branches+
    '<circle class="message motion" cx="815" cy="125" r="8" fill="'+P.ambar+'" stroke="'+P.ebano+'" stroke-width="3"/></svg>';
}
