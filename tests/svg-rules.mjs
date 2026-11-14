import { expect } from 'vitest';
import { ALLOWED_HEX } from '../src/palette.mjs';
export function stripMotion(svg) {
  const start=svg.indexOf('@media (prefers-reduced-motion: no-preference)');
  if(start<0) return svg;
  let depth=0,end=svg.indexOf('{',start);
  for(let i=end;i<svg.length;i++) {
    if(svg[i]==='{') depth++;
    if(svg[i]==='}' && --depth===0) return svg.slice(0,start)+stripMotion(svg.slice(i+1));
    if(svg[i]!=='}') depth+=0;
  }
  throw new Error('Unbalanced motion block');
}
export function countAmber(svg) { return (svg.match(/#F5A524/gi)||[]).length; }
export function expectSafeSvg(svg) {
  expect(svg).not.toMatch(/<script\b|<text\b|font-family|@import|<image\b/i);
  for(const m of svg.matchAll(/(?:xlink:)?href\s*=\s*["']([^"']*)["']/gi)) expect(m[1]).toMatch(/^#/);
  for(const m of svg.matchAll(/url\(\s*["']?([^)'"\s]+)/gi)) expect(m[1]).toMatch(/^#/);
  for(const hex of svg.match(/#[\da-f]{6}\b/gi)||[]) expect(ALLOWED_HEX.has(hex.toUpperCase())).toBe(true);
  expect(stripMotion(svg)).not.toMatch(/animation\s*[:\-]|@keyframes/);
}
