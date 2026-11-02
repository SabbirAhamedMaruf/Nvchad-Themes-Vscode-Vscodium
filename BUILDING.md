# Building NvChad Themes

The themes are generated, never edited by hand.

```sh
npm run extract     # fetch base46 (v3.0) into .cache and regenerate data/base46.json (needs nvim)
npm run color-keys  # reread the color ids the installed VSCodium registers into data/vscode-color-keys.json
npm run build       # write themes/*.json, package.json contributes and the README theme table
npm run package     # produce the .vsix
```

- `scripts/extract.lua` loads each base46 theme in its own clean Neovim with NvChad's default config and records the colors Neovim resolves.
- `scripts/build.mjs` maps those groups onto VS Code: `lib/tokens.mjs` for code, `lib/workbench.mjs` for NvChad's own UI groups, and `lib/flat.mjs` for the flat workbench and the `(Border)` variant.
- Run `npm run color-keys` after a VS Code update so new color ids get palette colors instead of VS Code's defaults.
