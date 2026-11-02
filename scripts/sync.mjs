// Clones or updates NvChad/base46 in .cache and regenerates data/base46.json through a clean Neovim
// usage: node scripts/sync.mjs [base46-git-ref]
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repo = path.join(root, '.cache', 'base46')
const ref = process.argv[2] ?? 'v3.0'
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' })

if (!fs.existsSync(path.join(repo, '.git'))) {
  fs.mkdirSync(path.dirname(repo), { recursive: true })
  run('git', ['clone', '--quiet', 'https://github.com/NvChad/base46.git', repo])
}
run('git', ['-C', repo, 'fetch', '--quiet', 'origin', ref])
run('git', ['-C', repo, 'checkout', '--quiet', 'FETCH_HEAD'])
run('nvim', ['--clean', '--headless', '-l', path.join(root, 'scripts', 'extract.lua'), repo, path.join(root, 'data', 'base46.json')])
