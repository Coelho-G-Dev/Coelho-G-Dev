import { it, expect } from 'vitest';
import { renderCover } from '../src/pieces/cover.mjs';
import { expectSafeSvg, countAmber, stripMotion } from './svg-rules.mjs';
import { COPY } from '../src/data.mjs';
import { THEME } from '../src/palette.mjs';
import { textPath } from '../src/text.mjs';
for(const locale of ['en','pt']) for(const theme of ['light','dark']) it('renders safe animated cover '+locale+'/'+theme,()=>{
  const svg=renderCover({locale,theme});
  expectSafeSvg(svg);
  expect(countAmber(svg)).toBe(1);
  expect(svg).toContain('viewBox="0 0 1200 400"');
  expect(svg.match(/infinite/g)).toHaveLength(1);
  expect(svg).toContain('@media (prefers-reduced-motion: no-preference)');
  expect(stripMotion(svg)).toContain('<circle class="message motion" cx="815" cy="125"');
  expect(Buffer.byteLength(svg)).toBeLessThanOrEqual(100000);
  expect(svg.match(/class="house motion/g)).toHaveLength(5);
  expect(svg).toContain('8s');
});
it('changes colors and copy across themes and languages',()=>{
  expect(renderCover({locale:'en',theme:'dark'})).not.toBe(renderCover({locale:'en',theme:'light'}));
  expect(renderCover({locale:'en',theme:'dark'})).not.toBe(renderCover({locale:'pt',theme:'dark'}));
});
it('keeps each role part on its own line without a leading separator',()=>{
  for(const locale of ['en','pt']) for(const theme of ['light','dark']) {
    const t=THEME[theme],svg=renderCover({locale,theme});
    COPY[locale].role.split(' · ').forEach((part,i)=>{
      expect(svg).toContain(textPath(part,{font:'mono',size:30,x:40,y:282+i*42,fg:t.soft,bg:t.bg,maxWidth:560}));
    });
  }
});
it('returns every border to walnut within two percent of its active window',()=>{
  const svg=renderCover({locale:'en',theme:'dark'});
  for(let i=0;i<5;i++) {
    const frames=svg.match(new RegExp('@keyframes house'+i+'\\{([\\s\\S]*?)\\}\\s*\\.h'))[1]+'}';
    const base=frames.match(/([^{}]+)\{stroke:#8A6A4A\}/)[1].split(',');
    const active=frames.match(/([^{}]+)\{stroke:#F4EEE3\}/)[1].split(',');
    expect(base).toContain((i*20)+'%');
    expect(base).toContain((i*20+16)+'%');
    expect(active).toEqual([(i*20+2)+'%',(i*20+14)+'%']);
  }
});
