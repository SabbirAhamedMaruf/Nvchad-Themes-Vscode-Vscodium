-- Runs NvChad's base46 inside a clean Neovim and writes every theme's highlight groups, resolved by Neovim itself, as JSON
-- usage: nvim --clean --headless -l scripts/extract.lua <base46-repo> <out.json>
-- Each theme loads in its own Neovim process: groups one theme creates survive `hi clear` and would shadow fallbacks in the next

local base46_root, out_path, single = arg[1], arg[2], arg[3]
assert(base46_root and out_path, "usage: nvim --clean --headless -l scripts/extract.lua <base46-repo> <out.json>")
package.path = base46_root .. "/lua/?.lua;" .. base46_root .. "/lua/?/init.lua;" .. package.path

-- NvChad's shipped defaults (NvChad/ui lua/nvconfig.lua)
local nvconfig = {
  base46 = {
    theme = "onedark",
    hl_add = {},
    hl_override = {},
    integrations = {},
    excluded = {},
    changed_themes = {},
    transparency = false,
  },
  ui = {
    cmp = { style = "default" },
    telescope = { style = "borderless" },
    statusline = { enabled = true, theme = "default" },
  },
}

-- the base46 caches a stock NvChad setup loads, in the order it loads them
local integrations = {
  "defaults",
  "statusline",
  "syntax",
  "treesitter",
  "git",
  "lsp",
  "nvimtree",
  "telescope",
  "tbline",
  "cmp",
  "blankline",
  "whichkey",
}

-- shipped integrations stock NvChad does not load, kept for opt-in VS Code features
local optional = { "semantic_tokens" }

-- groups Neovim or a plugin defines that the build reads besides base46's own
local extra_groups = { "Added", "Changed", "Removed", "Underlined", "DiagnosticUnnecessary", "DiagnosticDeprecated" }

local function reset_modules()
  for name in pairs(package.loaded) do
    if name == "nvconfig" or name:match "^base46" then
      package.loaded[name] = nil
    end
  end
  package.loaded.nvconfig = nvconfig
end

local function to_hex(n)
  return n and string.format("#%06x", n) or nil
end

local function resolve(name)
  local h = vim.api.nvim_get_hl(0, { name = name, link = false, create = false })
  local out = { fg = to_hex(h.fg), bg = to_hex(h.bg), sp = to_hex(h.sp) }
  for _, attr in ipairs { "bold", "italic", "underline", "undercurl", "strikethrough", "reverse" } do
    out[attr] = h[attr] or nil
  end
  return out
end

local function load_theme(name)
  nvconfig.base46.theme = name
  reset_modules()
  local theme = require("base46.themes." .. name)

  -- base46 reads vim.o.bg while building groups, NvChad sets it from the theme type
  vim.o.background = theme.type
  vim.cmd "hi clear"
  reset_modules()
  theme = require("base46.themes." .. name)
  local base46 = require "base46"

  local keep = {}
  for _, integration in ipairs(integrations) do
    for group, val in pairs(base46.get_integration(integration)) do
      vim.api.nvim_set_hl(0, group, val)
      keep[group] = true
    end
  end

  -- optional groups are resolved on top of a stock setup, then dropped again
  local optional_hl = {}
  for _, integration in ipairs(optional) do
    for group, val in pairs(base46.get_integration(integration)) do
      optional_hl[group] = val
    end
  end

  local hl = {}
  for group in pairs(vim.api.nvim_get_hl(0, {})) do
    if keep[group] or group:sub(1, 1) == "@" then
      hl[group] = resolve(group)
    end
  end
  for _, group in ipairs(extra_groups) do
    hl[group] = resolve(group)
  end

  for group, val in pairs(optional_hl) do
    vim.api.nvim_set_hl(0, group, val)
  end
  local semantic = {}
  for group in pairs(optional_hl) do
    semantic[group] = resolve(group)
  end

  return {
    type = theme.type,
    base_30 = theme.base_30,
    base_16 = theme.base_16,
    hl = hl,
    semantic = semantic,
  }
end

-- JSON with sorted keys so regenerated data diffs cleanly
local function encode(v)
  local t = type(v)
  if t == "table" then
    local keys = vim.tbl_keys(v)
    table.sort(keys)
    local parts = {}
    for _, k in ipairs(keys) do
      parts[#parts + 1] = vim.json.encode(tostring(k)) .. ":" .. encode(v[k])
    end
    return "{" .. table.concat(parts, ",") .. "}"
  end
  return vim.json.encode(v)
end

-- child mode: one theme, printed to stdout
if single then
  io.stdout:write(encode(load_theme(single)))
  return
end

local names = {}
for file in vim.fs.dir(base46_root .. "/lua/base46/themes") do
  local name = file:match "^(.+)%.lua$"
  if name then
    names[#names + 1] = name
  end
end
table.sort(names)

local script = debug.getinfo(1, "S").source:sub(2)
local themes = {}
for _, name in ipairs(names) do
  local res = vim.system({ vim.v.progpath, "--clean", "--headless", "-l", script, base46_root, "-", name }, { text = true }):wait()
  if res.code == 0 then
    themes[name] = vim.json.decode(res.stdout)
  else
    io.stderr:write("skip " .. name .. ": " .. res.stderr .. "\n")
  end
end

local commit = vim.trim(vim.fn.system { "git", "-C", base46_root, "rev-parse", "HEAD" })
local file = assert(io.open(out_path, "w"))
file:write(encode {
  source = { repo = "https://github.com/NvChad/base46", commit = commit },
  themes = themes,
})
file:close()
io.stdout:write(#names .. " themes\n")
