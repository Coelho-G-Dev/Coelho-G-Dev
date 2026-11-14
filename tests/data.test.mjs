import { it, expect } from 'vitest';
import { DOOR_LISTS, PROJECTS, COPY, SKILLS, NUMBERS, doorCount, countLabel } from '../src/data.mjs';
it('keeps the site door order and repository facets', () => {
  expect(DOOR_LISTS.backend.map(p=>p.id)).toEqual(['cidade','authguard','guia','buscasus','rag','financeira']);
  expect(DOOR_LISTS.frontend.map(p=>p.id)).toEqual(['cidade','buscasus']);
  expect(DOOR_LISTS.ia.map(p=>p.id)).toEqual(['rag','financeira','cidade']);
  for (const list of Object.values(DOOR_LISTS)) for (const p of list) expect(PROJECTS[p.id][p.link]).toMatch(/^https:\/\//);
});
it('derives counts and uses singular labels', () => {
  expect(['backend','frontend','ia'].map(doorCount)).toEqual([6,2,3]);
  expect(countLabel(1,'en')).toBe('1 project');
  expect(countLabel(6,'en')).toBe('6 projects');
  expect(countLabel(1,'pt')).toBe('1 projeto');
  DOOR_LISTS.frontend.push({id:'authguard',link:'repo'});
  expect(doorCount('frontend')).toBe(3);
  DOOR_LISTS.frontend.pop();
});
const shape = value => typeof value === 'object' && value !== null ? Object.fromEntries(Object.entries(value).map(([k,v])=>[k,shape(v)])) : typeof value;
it('keeps both languages complete', () => {
  expect(shape(COPY.en)).toEqual(shape(COPY.pt));
  expect(SKILLS.en.map(c=>c.items.length)).toEqual(SKILLS.pt.map(c=>c.items.length));
  expect(SKILLS.en).toHaveLength(5);
  expect(COPY.en.intro).toContain(String(NUMBERS.testsCidade));
  expect(COPY.en.intro).toContain(String(NUMBERS.testsAuthguard));
  expect(COPY.en.award).toContain('OCT 23, 2026');
});
it('avoids decorative and sales language', () => {
  const strings = JSON.stringify({COPY,PROJECTS,DOOR_LISTS,SKILLS});
  expect(strings).not.toMatch(/—|\p{Extended_Pictographic}/u);
  expect(strings).not.toMatch(/passionate|robust|seamless|cutting-edge|innovative|leverage|apaixonado|robusto|inovador|de ponta/i);
});
