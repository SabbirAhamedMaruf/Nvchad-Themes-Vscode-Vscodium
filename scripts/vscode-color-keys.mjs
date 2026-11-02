// Lists every color id the installed VS Code / VSCodium registers, with how its dark and light default is produced
import fs from 'node:fs';
import path from 'node:path';
const app = process.argv[2] ?? '/usr/share/codium/resources/app';
const js = fs.readFileSync(path.join(app, 'out/vs/workbench/workbench.desktop.main.js'), 'utf8');

// read one call argument starting at i, stopping at the top-level comma or closing paren
function readArg(i) {
  let depth = 0, s = i, q = null;
  for (; i < js.length; i++) {
    const ch = js[i];
    if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') q = ch;
    else if ('({['.includes(ch)) depth++;
    else if (')}]'.includes(ch)) { if (!depth) break; depth--; }
    else if (ch === ',' && !depth) break;
  }
  return js.slice(s, i);
}

const head = /(?:([\w$]+)=)?\bJ\("([a-zA-Z][\w-]*(?:\.[\w-]+)*)",/g;
const vars = new Map(), regs = [];
let m;
while ((m = head.exec(js))) {
  const spec = readArg(m.index + m[0].length);
  // ids without a dot (foreground, focusBorder) only count when the call carries a theme default table
  if (!m[2].includes('.') && !/^\{(dark|light):/.test(spec)) continue;
  if (m[1]) vars.set(m[1], m[2]);
  regs.push({ id: m[2], spec });
}
const field = (spec, key) => {
  if (!spec.startsWith('{')) return spec;
  const at = spec.search(new RegExp('[{,]' + key + ':'));
  if (at < 0) return undefined;
  const start = at + key.length + 2;
  let depth = 0, i = start;
  for (; i < spec.length; i++) { const ch = spec[i]; if ('({['.includes(ch)) depth++; else if (')}]'.includes(ch)) { if (!depth) break; depth--; } else if (ch === ',' && !depth) break; }
  return spec.slice(start, i);
};
const classify = (val) => {
  if (val === undefined || val === 'null') return { kind: 'none' };
  if (/^"#[0-9a-fA-F]{3,8}"$/.test(val)) return { kind: 'hex', val: val.slice(1, -1) };
  if (/^"[\w.-]+"$/.test(val)) return { kind: 'alias', ref: val.slice(1, -1) };
  if (/^[\w$]+$/.test(val) && vars.has(val)) return { kind: 'alias', ref: vars.get(val) };
  // a computed default keeps the color ids it is computed from
  const refs = [...new Set([...val.matchAll(/"([\w-]+(?:\.[\w-]+)+)"|([\w$]+)/g)].map(r => r[1] ?? vars.get(r[2])).filter(Boolean))];
  return { kind: 'derived', val, refs };
};
const out = {};
for (const r of regs) out[r.id] = { dark: classify(field(r.spec, 'dark')), light: classify(field(r.spec, 'light')) };

// terminal ansi colors are registered in a loop from a literal table
for (const mm of js.matchAll(/"(terminal\.ansi\w+)":\{index:\d+,defaults:\{light:"(#\w+)",dark:"(#\w+)"/g))
  out[mm[1]] = { dark: { kind: 'hex', val: mm[3] }, light: { kind: 'hex', val: mm[2] } };

// colors contributed by built-in extensions
for (const ext of fs.readdirSync(path.join(app, 'extensions'))) {
  const pj = path.join(app, 'extensions', ext, 'package.json');
  if (!fs.existsSync(pj)) continue;
  for (const c of JSON.parse(fs.readFileSync(pj, 'utf8')).contributes?.colors ?? []) {
    const cl = v => v == null ? { kind: 'none' } : /^#/.test(v) ? { kind: 'hex', val: v } : { kind: 'alias', ref: v };
    out[c.id] = { dark: cl(c.defaults?.dark), light: cl(c.defaults?.light), ext };
  }
}
console.error('count', Object.keys(out).length);
const sorted = Object.fromEntries(Object.keys(out).sort().map(k => [k, out[k]]));
fs.writeFileSync(new URL('../data/vscode-color-keys.json', import.meta.url), JSON.stringify(sorted, null, 1) + '\n');
