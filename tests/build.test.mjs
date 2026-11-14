import { it, expect } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { build } from '../src/build.mjs';
import { listAssets } from '../src/assets.mjs';
it('writes all 28 artifacts with canonical LF and one trailing newline',async()=>{
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'profile-build-'));
  try {
    const paths=await build(dir);
    expect(paths).toHaveLength(28);
    expect(new Set(paths)).toEqual(new Set([...listAssets().map(a=>a.path),'README.md','README.pt-BR.md']));
    for(const file of paths) {
      const text=await fs.readFile(path.join(dir,file),'utf8');
      expect(text,file).not.toContain('\r');
      expect(text,file).toMatch(/[^\n]\n$/);
    }
  } finally {await fs.rm(dir,{recursive:true,force:true});}
});
it('repeats byte for byte and matches the generated repository files',async()=>{
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'profile-build-'));
  try {
    const paths=await build(dir);
    const before=await Promise.all(paths.map(file=>fs.readFile(path.join(dir,file))));
    expect(await build(dir)).toEqual(paths);
    for(const [i,file] of paths.entries()) {
      expect(await fs.readFile(path.join(dir,file)),file).toEqual(before[i]);
      expect(await fs.readFile(new URL('../'+file,import.meta.url)),file).toEqual(before[i]);
    }
  } finally {await fs.rm(dir,{recursive:true,force:true});}
});
