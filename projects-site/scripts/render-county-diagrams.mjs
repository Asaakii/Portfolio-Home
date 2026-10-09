import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { diagramConfig, diagramSignature, diagramSources } from './county-diagram-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'src/content/county-diagrams.json');
const source = await readFile(resolve(root, 'src/content/county-whitepaper.md'), 'utf8');
const sources = diagramSources(source);
const signature = diagramSignature(sources);
const require = createRequire(import.meta.url);
const mermaidDist = dirname(require.resolve('mermaid'));
const { version: rendererVersion } = JSON.parse(await readFile(resolve(mermaidDist, '../package.json'), 'utf8'));
const force = process.argv.includes('--force');

let cached;
try { cached = JSON.parse(await readFile(output, 'utf8')); } catch { /* First build generates the cache. */ }
if (!force && cached?.signature === signature && cached?.rendererVersion === rendererVersion &&
  cached.diagrams?.length === sources.length && cached.diagrams.every(item => item.svg?.startsWith('<svg'))) {
  console.log(`County diagrams: ${sources.length} verified SVG assets ready.`);
  process.exit(0);
}
if (!sources.length) throw new Error('County diagrams: no Mermaid definitions found in the whitepaper.');

// Mermaid is a build tool. No renderer, network fetch or diagram JS is shipped to readers.
const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true, ...(process.env.COUNTY_DIAGRAM_BROWSER === 'chrome' ? { channel: 'chrome' } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.setContent('<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"></head><body></body></html>');
  await page.addScriptTag({ path: resolve(mermaidDist, 'mermaid.min.js') });
  await page.evaluate(config => window.mermaid.initialize(config), diagramConfig);
  const diagrams = [];
  for (const [index, code] of sources.entries()) {
    const id = `county-svg-${index}`;
    try {
      const svg = await page.evaluate(async ({ id, code }) => (await window.mermaid.render(id, code)).svg, { id, code });
      if (!svg.startsWith('<svg') || /Syntax error in text/.test(svg)) throw new Error('Renderer returned an invalid SVG.');
      diagrams.push({ id, svg });
    } catch (error) {
      throw new Error(`County diagrams: graph ${index + 1} (${code.split('\n')[0]}) could not render.`, { cause: error });
    }
  }
  // Write only after every diagram succeeds; a partial cache can never be published.
  await writeFile(output, `${JSON.stringify({ signature, rendererVersion, diagrams }, null, 2)}\n`);
  console.log(`County diagrams: generated ${diagrams.length} SVG assets.`);
} finally {
  await browser.close();
}
