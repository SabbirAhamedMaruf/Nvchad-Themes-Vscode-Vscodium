// Generates one VS Code color theme per NvChad base46 theme from data/base46.json
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOKEN_RULES, SEMANTIC_RULES } from './lib/tokens.mjs'
import { workbench, NONE, OVERLAY_KEYS, KEEP_DEFAULT } from './lib/workbench.mjs'
import { flat, bordered, flatSurfaceFallback } from './lib/flat.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const { source, themes } = read('data/base46.json')
const colorKeys = read('data/vscode-color-keys.json')
const verbose = process.argv.includes('--report')

// same arithmetic as base46 colors.lua mix(): strength is the percentage of the second color
function mix(first, second, strength = 50) {
  const s = strength / 100
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const [a, b] = [rgb(first), rgb(second)]
  return '#' + a.map((v, i) => Math.floor(v * (1 - s) + b[i] * s).toString(16).padStart(2, '0')).join('')
}

const alpha = (hex, a) => hex.slice(0, 7) + a.toString(16).padStart(2, '0')

function prettyName(name) {
  const words = name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[-_ ]+/)
    .map((w) => ({ github: 'GitHub', vscode: 'VSCode', ayu: 'Ayu' })[w.toLowerCase()] ?? w[0].toUpperCase() + w.slice(1))
  return words.join(' ')
}

// Neovim falls back from @a.b.c to @a.b to @a when a capture has no group of its own
function lookup(hl, name) {
  for (let n = name; ; n = n.slice(0, n.lastIndexOf('.'))) {
    if (hl[n]) return hl[n]
    if (!n.startsWith('@') || !n.includes('.')) return null
  }
}

// TextMate root scope of each treesitter language, and the languages embedded inside it
const LANG_ROOTS = {
  css: 'source.css',
  scss: 'source.css.scss',
  html: 'text.html.basic',
  javascript: 'source.js',
  typescript: 'source.ts',
  tsx: 'source.tsx',
  lua: 'source.lua',
  python: 'source.python',
  rust: 'source.rust',
  php: 'source.php',
  bash: 'source.shell',
  json: 'source.json',
  yaml: 'source.yaml',
}
const LANG_NESTED = { css: ['scss'], html: ['javascript', 'css'] }

function fontStyle(group) {
  return ['italic', 'bold', 'underline', 'strikethrough'].filter((k) => group[k]).join(' ')
}

// colors for keys VS Code would otherwise paint with its own built-in defaults
function fallback(key, ctx) {
  const { c, fg, bg } = ctx
  const k = key.toLowerCase()
  const last = k.split('.').pop()
  if (/shadow/.test(k)) return NONE
  // a flat workbench draws no frames, only state-carrying borders keep a color
  if (/(border|outline|stroke|separator|divider)/.test(last)) {
    if (/error|failed|deleted|removed/.test(k)) return c.red
    if (/warning/.test(k)) return c.yellow
    return NONE
  }
  if (/foreground$|fg$|color$|icon$|text$/.test(last) || /foreground/.test(last)) {
    if (/badge|button|label/.test(k) && /background|badge/.test(k)) return c.black
    if (/error|failed|deleted|removed|stopped|invalid/.test(k)) return c.red
    if (/warning|pending|queued/.test(k)) return c.yellow
    if (/info|running/.test(k)) return fg('DiagnosticInfo')
    if (/success|passed|added|inserted/.test(k)) return c.green
    if (/modified|changed/.test(k)) return fg('Changed')
    if (/(description|inactive|disabled|placeholder|deemphasized|dimmed|secondary|unfocused|muted|skipped|unset)/.test(k)) return c.light_grey
    if (/link|highlight|match/.test(k)) return c.blue
    if (/badge/.test(k)) return c.black
    return fg('Normal')
  }
  if (/background$|bg$/.test(last) || /background|fill|highlight/.test(last)) {
    if (/badge|button/.test(k)) return c.blue
    if (/error|failed|deleted|removed/.test(k)) return bg('DiffDelete')
    if (/warning/.test(k)) return mix(c.yellow, c.black, 90)
    if (/success|passed|added|inserted/.test(k)) return bg('DiffAdd')
    if (/modified|changed/.test(k)) return bg('DiffChange')
    if (/(hover|focus|(?<!in)active|selected|selection)/.test(k)) return c.one_bg
    if (/input/.test(k)) return bg('TelescopePromptNormal')
    return flatSurfaceFallback(key, ctx)
  }
  return fg('Normal')
}

// every theme ships twice: frameless, and with 1px split lines between windows and around popups
const VARIANTS = [
  { id: '', label: '', borders: false },
  { id: '-border', label: ' (Border)', borders: true },
]

function buildTheme(name, theme, variant) {
  const { hl, semantic, type } = theme
  const lower = (palette) => Object.fromEntries(Object.entries(palette).map(([k, v]) => [k, v.toLowerCase()]))
  const [c, b] = [lower(theme.base_30), lower(theme.base_16)]
  const group = (n) => {
    const g = lookup(hl, n)
    if (!g) throw new Error(`${name}: no highlight group ${n}`)
    return g
  }
  const fg = (n) => group(n).fg ?? hl.Normal.fg
  const bg = (n) => group(n).bg ?? hl.Normal.bg
  const ctx = { c, b, fg, bg, mix, alpha, type }

  const colors = { ...workbench(ctx), ...flat(ctx), ...(variant.borders ? bordered(ctx) : {}) }
  const unknown = Object.keys(colors).filter((k) => !colorKeys[k])
  for (const k of unknown) delete colors[k]

  // whether VS Code paints the key at all when the theme leaves it unset
  const paints = (key, seen = new Set()) => {
    if (key in colors) return true
    const def = colorKeys[key]?.[type]
    if (!def || seen.has(key)) return false
    seen.add(key)
    if (def.kind === 'none') return false
    if (def.kind === 'alias') return paints(def.ref, seen)
    if (def.kind === 'derived') return def.refs.length === 0 || def.refs.some((r) => paints(r, seen))
    return true
  }

  // every remaining key whose VS Code default is a hardcoded or computed color gets a NvChad color instead
  const guessed = []
  for (const [key, spec] of Object.entries(colorKeys)) {
    if (key in colors || KEEP_DEFAULT.has(key)) continue
    const def = spec[type]
    if (def.kind === 'alias' && colorKeys[def.ref]) continue
    if (!paints(key)) continue
    colors[key] = fallback(key, ctx)
    if (OVERLAY_KEYS.has(key) && colors[key].length === 7) colors[key] = alpha(colors[key], 0x80)
    guessed.push(key)
  }

  const tokenColors = []
  const rule = (name, scope, g, styleGroup) => {
    const styled = styleGroup ? lookup(hl, styleGroup) ?? {} : g
    const fgColor = styled.fg ?? g.fg
    const settings = {}
    if (fgColor) settings.foreground = fgColor
    const style = fontStyle(styled)
    if (fgColor || style) settings.fontStyle = style
    if (Object.keys(settings).length) tokenColors.push({ name, scope, settings })
  }
  for (const [groupName, scope, styleGroup] of TOKEN_RULES) {
    rule(groupName, scope, lookup(hl, groupName) ?? {}, styleGroup)

    // Neovim tries @capture.<lang> before @capture, so a theme's language override only applies inside that language
    for (const [lang, root] of Object.entries(LANG_ROOTS)) {
      const own = hl[`${groupName}.${lang}`]
      if (!own) continue
      rule(`${groupName}.${lang}`, scope.map((sc) => `${root} ${sc}`), own, styleGroup)
      for (const inner of LANG_NESTED[lang] ?? []) {
        if (hl[`${groupName}.${inner}`]) continue
        const back = hl[`${groupName}.${inner}`] ?? lookup(hl, groupName) ?? {}
        rule(`${groupName}.${inner}`, scope.map((sc) => `${root} ${LANG_ROOTS[inner]} ${sc}`.replace(`${root} ${root}`, root)), back, styleGroup)
      }
    }
  }

  const semanticTokenColors = {}
  for (const [selector, groupName] of Object.entries(SEMANTIC_RULES)) {
    const g = semantic[groupName] ?? lookup(hl, groupName)
    if (!g) continue
    const rule = {}
    if (g.fg) rule.foreground = g.fg
    for (const k of ['italic', 'bold', 'underline', 'strikethrough']) if (g[k]) rule[k] = true
    if (Object.keys(rule).length) semanticTokenColors[selector] = rule
  }

  const sorted = Object.fromEntries(Object.keys(colors).sort().map((k) => [k, colors[k]]))
  return {
    json: {
      $schema: 'vscode://schemas/color-theme',
      name: `NvChad ${prettyName(name)}${variant.label}`,
      type,
      semanticHighlighting: false,
      colors: sorted,
      tokenColors,
      semanticTokenColors,
    },
    unknown,
    guessed,
  }
}

const outDir = path.join(root, 'themes')
fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir)

const contributes = []
let report
for (const [name, theme] of Object.entries(themes)) {
  for (const variant of VARIANTS) {
    const { json, unknown, guessed } = buildTheme(name, theme, variant)
    const file = `${name}${variant.id}.json`
    fs.writeFileSync(path.join(outDir, file), JSON.stringify(json, null, 2) + '\n')
    contributes.push({
      id: `nvchad-${name}${variant.id}`,
      label: json.name,
      uiTheme: theme.type === 'light' ? 'vs' : 'vs-dark',
      path: `./themes/${file}`,
    })
    report ??= { name, unknown, guessed }
  }
}
contributes.sort((x, y) => x.label.localeCompare(y.label))

const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.contributes = { themes: contributes }
pkg.description = `All ${Object.keys(themes).length} NvChad base46 themes, dark and light, with NvChad's exact syntax colors on a clean, flat workbench. Every theme comes in a frameless and a bordered style.`
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

// README theme table between the generated markers
const readmePath = path.join(root, 'README.md')
if (fs.existsSync(readmePath)) {
  const rows = Object.entries(themes)
    .map(([name, t]) => [`NvChad ${prettyName(name)}`, name, t.type])
    .sort((x, y) => x[0].localeCompare(y[0]))
    .map(([label, name, type]) => `| ${label} | \`${name}\` | ${type} |`)
  const table = ['| Theme | base46 name | Type |', '| --- | --- | --- |', ...rows].join('\n')
  const readme = fs.readFileSync(readmePath, 'utf8')
  const next = readme.replace(/<!-- themes:start -->[\s\S]*<!-- themes:end -->/, `<!-- themes:start -->\n${table}\n<!-- themes:end -->`)
  fs.writeFileSync(readmePath, next.replace(/base46 commit `[0-9a-f]+`/, `base46 commit \`${source.commit.slice(0, 7)}\``))
}

console.log(`${contributes.length} themes from base46 ${source.commit.slice(0, 7)}`)
if (verbose) {
  console.log(`${report.name}: unknown keys dropped (${report.unknown.length}):`, report.unknown.join(' '))
  console.log(`${report.name}: fallback keys (${report.guessed.length}):`)
  for (const k of report.guessed) console.log('  ' + k)
}
