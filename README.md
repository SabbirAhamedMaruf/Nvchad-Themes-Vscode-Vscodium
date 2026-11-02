# NvChad Themes

All 97 themes from [NvChad](https://nvchad.com)'s theme collection, [base46](https://github.com/NvChad/base46), for VS Code and VSCodium. Code gets the exact colors NvChad paints it with. The rest of the editor stays out of the way: one flat background color for every window.

Every theme comes in two styles, so there are 194 to pick from.

## Features

- **The whole set.** All 97 base46 themes, dark and light, including the ones [nvchad.com/themes](https://nvchad.com/themes) does not list yet.
- **NvChad's own colors, not lookalikes.** Each theme was loaded into a real Neovim with NvChad's default setup, and the colors Neovim actually resolved were copied over unchanged, including every theme's own fine-tuning.
- **One flat window color.** Editor, tabs, title bar, activity bar, explorer, panel, terminal, chat views and status bar all share the editor background. Popups (command palette, suggestions, hover, menus, notifications) sit one shade darker, the way NvChad draws floating windows.
- **Quiet chrome.** The active tab, activity bar item and panel tab are marked by brighter text, not by colored bars. The status bar is plain text; errors, warnings and debugging show up as text color.
- **No leftover VS Code colors.** Every color VS Code would otherwise fill in with its own default is set from the theme's palette, so no stray blue or grey shows up anywhere.

## Two styles of every theme

| Style | Example name | Looks like |
| --- | --- | --- |
| Frameless | `NvChad Tokyonight` | Windows separated by nothing but space. |
| Border | `NvChad Tokyonight (Border)` | The same theme with 1px lines in NvChad's split color between windows and around popups. |

## Usage

1. Install the extension.
2. Open **Preferences: Color Theme** (`Ctrl+K Ctrl+T`, or `Cmd+K Cmd+T` on macOS).
3. Type `NvChad` and pick a theme.

## Recommended settings

NvChad highlights the current line only in the line number. For the same look:

```json
"editor.renderLineHighlight": "none"
```

NvChad turns semantic highlighting off by default, so the themes do too. If you want your language server's extra detail anyway (parameters, properties and so on), the themes include NvChad's colors for it:

```json
"editor.semanticHighlighting.enabled": true
```

## How close it gets to NvChad

VS Code colors code with TextMate grammars; NvChad uses treesitter, which understands code differently. Both editors were run over the same sample files in 14 languages and compared character by character: CSS, JSON, YAML and Markdown match completely, and about 92% of all characters get exactly the same color.

The rest is information a TextMate grammar simply does not have. Treesitter treats a capitalized name as a type, tells `for` from `if` in Python and Lua where the grammar uses one scope for both, and colors the text of an HTML `<title>` as a heading. No color theme can close that gap.

## Themes

Generated from base46 commit `1902307`. Each theme below is also available as `(Border)`.

<!-- themes:start -->
| Theme | base46 name | Type |
| --- | --- | --- |
| NvChad Aquarium | `aquarium` | dark |
| NvChad Ashes | `ashes` | dark |
| NvChad Aylin | `aylin` | dark |
| NvChad Ayu Dark | `ayu_dark` | dark |
| NvChad Ayu Light | `ayu_light` | light |
| NvChad Bearded Arc | `bearded-arc` | dark |
| NvChad Blossom Light | `blossom_light` | light |
| NvChad Carbonfox | `carbonfox` | dark |
| NvChad Catppuccin | `catppuccin` | dark |
| NvChad Catppuccin Latte | `catppuccin-latte` | light |
| NvChad Chadracula | `chadracula` | dark |
| NvChad Chadracula Evondev | `chadracula-evondev` | dark |
| NvChad Chadtain | `chadtain` | dark |
| NvChad Chocolate | `chocolate` | dark |
| NvChad Darcula Dark | `darcula-dark` | dark |
| NvChad Dark Horizon | `dark_horizon` | dark |
| NvChad Decay | `decay` | dark |
| NvChad Default Dark | `default-dark` | dark |
| NvChad Default Light | `default-light` | light |
| NvChad Doomchad | `doomchad` | dark |
| NvChad Eldritch | `eldritch` | dark |
| NvChad Embark | `embark` | dark |
| NvChad Espresso | `espresso` | dark |
| NvChad Espresso Light | `espresso-light` | light |
| NvChad Everblush | `everblush` | dark |
| NvChad Everforest | `everforest` | dark |
| NvChad Everforest Light | `everforest_light` | light |
| NvChad Falcon | `falcon` | dark |
| NvChad Flex Light | `flex-light` | light |
| NvChad Flexoki | `flexoki` | dark |
| NvChad Flexoki Light | `flexoki-light` | light |
| NvChad Flouromachine | `flouromachine` | dark |
| NvChad Gatekeeper | `gatekeeper` | dark |
| NvChad GitHub Dark | `github_dark` | dark |
| NvChad GitHub Light | `github_light` | light |
| NvChad Gruvbox | `gruvbox` | dark |
| NvChad Gruvbox Light | `gruvbox_light` | light |
| NvChad Gruvchad | `gruvchad` | dark |
| NvChad Hiberbee | `hiberbee` | dark |
| NvChad Horizon | `horizon` | dark |
| NvChad Jabuti | `jabuti` | dark |
| NvChad Jellybeans | `jellybeans` | dark |
| NvChad Kanagawa | `kanagawa` | dark |
| NvChad Kanagawa Dragon | `kanagawa-dragon` | dark |
| NvChad Material Darker | `material-darker` | dark |
| NvChad Material Deep Ocean | `material-deep-ocean` | dark |
| NvChad Material Lighter | `material-lighter` | light |
| NvChad Melange | `melange` | dark |
| NvChad Midnight Breeze | `midnight_breeze` | dark |
| NvChad Mito Laser | `mito-laser` | dark |
| NvChad Monekai | `monekai` | dark |
| NvChad Monochrome | `monochrome` | dark |
| NvChad Mountain | `mountain` | dark |
| NvChad Nano Light | `nano-light` | light |
| NvChad Neofusion | `neofusion` | dark |
| NvChad Nightfox | `nightfox` | dark |
| NvChad Nightlamp | `nightlamp` | dark |
| NvChad Nightowl | `nightowl` | dark |
| NvChad Nord | `nord` | dark |
| NvChad Obsidian Ember | `obsidian-ember` | dark |
| NvChad Oceanic Light | `oceanic-light` | light |
| NvChad Oceanic Next | `oceanic-next` | dark |
| NvChad One Light | `one_light` | light |
| NvChad Onedark | `onedark` | dark |
| NvChad Onenord | `onenord` | dark |
| NvChad Onenord Light | `onenord_light` | light |
| NvChad Oxocarbon | `oxocarbon` | dark |
| NvChad Palenight | `palenight` | dark |
| NvChad Pastel Dark | `pastelDark` | dark |
| NvChad Pastelbeans | `pastelbeans` | dark |
| NvChad Penumbra Dark | `penumbra_dark` | dark |
| NvChad Penumbra Light | `penumbra_light` | light |
| NvChad Poimandres | `poimandres` | dark |
| NvChad Radium | `radium` | dark |
| NvChad Rosepine | `rosepine` | dark |
| NvChad Rosepine Dawn | `rosepine-dawn` | light |
| NvChad Rxyhn | `rxyhn` | dark |
| NvChad Scaryforest | `scaryforest` | dark |
| NvChad Seoul256 Dark | `seoul256_dark` | dark |
| NvChad Seoul256 Light | `seoul256_light` | light |
| NvChad Slatewave | `slatewave` | dark |
| NvChad Solarized Dark | `solarized_dark` | dark |
| NvChad Solarized Light | `solarized_light` | light |
| NvChad Solarized Osaka | `solarized_osaka` | dark |
| NvChad Starlight | `starlight` | dark |
| NvChad Sunrise Breeze | `sunrise_breeze` | light |
| NvChad Sweetpastel | `sweetpastel` | dark |
| NvChad Tokyodark | `tokyodark` | dark |
| NvChad Tokyonight | `tokyonight` | dark |
| NvChad Tomorrow Night | `tomorrow_night` | dark |
| NvChad Tundra | `tundra` | dark |
| NvChad Vesper | `vesper` | dark |
| NvChad VSCode Dark | `vscode_dark` | dark |
| NvChad VSCode Light | `vscode_light` | light |
| NvChad Wombat | `wombat` | dark |
| NvChad Yoru | `yoru` | dark |
| NvChad Zenburn | `zenburn` | dark |
<!-- themes:end -->

## Credits

- Colors from [NvChad/base46](https://github.com/NvChad/base46) (MIT); its notices are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). This extension is not affiliated with or endorsed by the NvChad project.
- Made by Sabbir Ahamed Maruf.

## License

NvChad Themes is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License](LICENSE) as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. It is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY.

Copyright (C) 2026 Sabbir Ahamed Maruf. The base46 color data keeps its MIT notices, listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and shipped with the extension.
