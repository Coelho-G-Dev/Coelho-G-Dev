import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listAssets } from './assets.mjs';
import { renderReadme, DOOR_MODE, NAV_MARKUP } from './readme.mjs';

const canonical = text => text.replace(/\r\n?/g,'\n').replace(/\n*$/,'')+'\n';
export async function build(rootDir) {
  const artifacts=listAssets().map(asset=>({path:asset.path,content:canonical(asset.render())}));
  for(const [locale,name] of [['en','README.md'],['pt','README.pt-BR.md']]) {
    artifacts.push({path:name,content:canonical(renderReadme(locale,{doorMode:DOOR_MODE,navMarkup:NAV_MARKUP}))});
  }
  for(const artifact of artifacts) {
    const target=path.join(rootDir,artifact.path);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.writeFile(target,artifact.content,'utf8');
  }
  return artifacts.map(a=>a.path);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const files=await build(process.cwd());
    console.log('Generated '+files.length+' files.');
  } catch(error) {
    console.error(error.message);
    process.exitCode=1;
  }
}
