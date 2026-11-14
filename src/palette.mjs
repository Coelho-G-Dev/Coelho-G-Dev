export const PALETTE = {
  ebano: "#0E0F13",
  nogueiraEscura: "#2A2018",
  nogueira: "#8A6A4A",
  bordo: "#D9C3A0",
  marfim: "#F4EEE3",
  ambar: "#F5A524",
};
export const TEXT_PAIRS = [
  { fg: "marfim", bg: "ebano", min: 4.5 },
  { fg: "ebano", bg: "marfim", min: 4.5 },
  { fg: "bordo", bg: "ebano", min: 4.5 },
  { fg: "ebano", bg: "bordo", min: 4.5 },
  { fg: "marfim", bg: "nogueiraEscura", min: 4.5 },
  { fg: "bordo", bg: "nogueiraEscura", min: 4.5 },
  { fg: "nogueiraEscura", bg: "bordo", min: 4.5 },
  { fg: "nogueiraEscura", bg: "marfim", min: 4.5 },
  { fg: "ambar", bg: "ebano", min: 4.5 },
  { fg: "ambar", bg: "nogueiraEscura", min: 4.5 },
  { fg: "ebano", bg: "ambar", min: 4.5 },
];
export const DOOR_TONES = {
  backend: { claro: "#2F5A46", escuro: "#1B3529" },
  frontend: { claro: "#7A2F2A", escuro: "#471A17" },
  ia: { claro: "#2D4166", escuro: "#18243D" },
};
export const UI_PAIRS = [
  { fg: "nogueira", bg: "marfim" },
  { fg: "nogueira", bg: "ebano" },
  { fg: "nogueiraEscura", bg: "bordo" },
];
export const EXTRA = { xadrezClaro: '#E7DDC9', azulejoBase: '#FAF6F0', azulejoMadeira: '#C4A882' };
export const ALLOWED_HEX = new Set([...Object.values(PALETTE),...Object.values(DOOR_TONES).flatMap(Object.values),...Object.values(EXTRA)]);
export const THEME = { dark: { bg:'ebano',text:'marfim',soft:'bordo',line:'nogueira' }, light: { bg:'marfim',text:'ebano',soft:'nogueiraEscura',line:'nogueira' } };
export function assertTextPair(fg,bg) {
  if (Object.hasOwn(DOOR_TONES,bg) ? fg === 'marfim' : TEXT_PAIRS.some(p=>p.fg===fg && p.bg===bg)) return;
  throw new Error('Text pair not allowed: '+fg+' / '+bg);
}
export function contrast(a,b) {
  const lum = hex => {
    const rgb = hex.slice(1).match(/../g).map(c=>parseInt(c,16)/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);
    return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
  };
  const x=lum(a),y=lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}
