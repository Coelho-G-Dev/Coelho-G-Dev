import { it, expect } from 'vitest';
import opentype from 'opentype.js';
import fs from 'node:fs';
import { textPath, textWidth } from '../src/text.mjs';
import { COPY } from '../src/data.mjs';
const options = {font:'display',size:96,x:0,y:100,fg:'marfim',bg:'ebano'};
it('renders deterministic paths without installed fonts',()=>{
  const p=textPath('Gabriel',options);
  expect(p).toMatch(/^<path d="M[^"]+" fill="#F4EEE3"\/>$/);
  expect(textPath('Gabriel',options)).toBe(p);
  expect(textWidth('Gabriel',options)).toBeGreaterThan(200);
});
it('centers the actual glyph bounds at the requested x',()=>{
  const d=textPath('Gabriel',{...options,x:600,anchor:'middle'}).match(/d="([^"]+)"/)[1];
  const b=fs.readFileSync(new URL('../src/fonts/bricolage-800.woff',import.meta.url));
  const font=opentype.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));
  const original=font.getPath('Gabriel',0,100,96);
  const box=original.getBoundingBox();
  const shift=Number(d.match(/^M([-\d.]+)/)[1])-original.commands[0].x;
  expect((box.x1+box.x2)/2+shift).toBeCloseTo(600,0);
});
it('rejects missing glyphs and text that exceeds its box',()=>{
  expect(()=>textPath('→',{...options,font:'mono'})).toThrow('→');
  const opts={...options,font:'mono',size:30,maxWidth:200};
  const width=textWidth(COPY.pt.role,opts);
  expect(()=>textPath(COPY.pt.role,opts)).toThrow(String(width));
});
it('enforces text size and color contracts',()=>{
  expect(()=>textPath('x',{...options,size:29})).toThrow();
  expect(()=>textPath('x',{...options,size:18,role:'label'})).not.toThrow();
  expect(()=>textPath('x',{...options,size:17,role:'label'})).toThrow();
  expect(()=>textPath('x',{...options,fg:'ambar',bg:'marfim'})).toThrow();
});
it('bundles fonts with the required Portuguese glyphs',()=>{
  for (const name of ['bricolage-800','mono-400','mono-500']) {
    const buffer=fs.readFileSync(new URL('../src/fonts/'+name+'.woff',import.meta.url));
    const font=opentype.parse(buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength));
    for (const char of 'ãçéº·') expect(font.charToGlyphIndex(char)).toBeGreaterThan(0);
  }
});
