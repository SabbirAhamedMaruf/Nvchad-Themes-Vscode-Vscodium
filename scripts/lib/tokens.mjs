// TextMate scopes mapped to the Neovim highlight group NvChad paints the same code with (treesitter captures)
// Within one selector VS Code prefers the deepest matching scope, so broad scopes come first and exceptions later
// An optional third entry names a group whose font style the rule takes, and whose color too when that group has one
export const TOKEN_RULES = [
  ['Normal', ['source', 'text', 'meta.embedded', 'source.groovy.embedded', 'string meta.embedded']],

  ['@comment', ['comment', 'punctuation.definition.comment', 'string.comment', 'comment.block.documentation']],
  ['@keyword.directive', ['comment.line.shebang', 'punctuation.definition.comment.shebang', 'meta.shebang']],

  ['@string', ['string', 'punctuation.definition.string', 'string.template', 'string.quoted', 'string.unquoted', 'meta.string', 'markup.inline.raw.string']],
  ['@string.regexp', ['string.regexp', 'source.regexp', 'string.regexp constant', 'string.regexp constant.other', 'string.regexp constant.character', 'string.regexp constant.character.escape', 'string.regexp keyword', 'string.regexp keyword.operator', 'string.regexp keyword.control', 'string.regexp keyword.other', 'string.regexp punctuation', 'string.regexp punctuation.definition', 'string.regexp meta.delimiter']],
  ['@string.escape', ['constant.character.escape', 'constant.character.string.escape', 'constant.other.placeholder', 'constant.character.format.placeholder']],
  ['@string.special.url', ['string.other.link', 'markup.underline.link']],
  ['@character', ['constant.character', 'string.quoted.single.char']],
  ['@character.special', ['constant.character.entity', 'punctuation.definition.entity.html', 'constant.character.entity.named']],

  ['@number', ['constant.numeric', 'constant.numeric.integer', 'keyword.other.unit.suffix.integer', 'keyword.other.unit.suffix.floating-point', 'constant.numeric meta.delimiter']],
  ['@number.float', ['constant.numeric.float']],
  ['@boolean', ['constant.language.boolean', 'constant.language.true', 'constant.language.false', 'constant.language.bool', 'constant.language.json']],
  ['@constant.builtin', ['constant.language', 'constant.language.null', 'constant.language.undefined', 'constant.language.nil', 'constant.language.none', 'support.constant']],
  ['@constant', ['constant', 'constant.other', 'variable.other.constant', 'entity.name.constant', 'constant.other.caps']],
  ['@constant.macro', ['entity.name.function.preprocessor', 'meta.preprocessor.macro entity.name']],

  ['@variable', ['variable', 'variable.other', 'variable.other.readwrite', 'variable.other.object', 'entity.name.variable', 'meta.definition.variable variable', 'variable.other.local', 'variable.other.global']],
  ['@variable.builtin', ['variable.language', 'variable.language.this', 'variable.language.self', 'variable.language.super', 'variable.parameter.function.language.special.self', 'variable.parameter.function.language.special.cls', 'support.variable', 'support.variable.object', 'support.type.object.module']],
  ['@variable.parameter', ['variable.parameter', 'meta.parameter variable', 'meta.parameters variable', 'entity.name.variable.parameter', 'variable.parameter.function']],
  ['@variable.member', ['variable.other.property', 'variable.other.object.property', 'variable.other.member', 'variable.object.property', 'entity.name.variable.field', 'variable.other.field', 'support.variable.property', 'meta.object-literal.key', 'variable.other.enummember']],
  ['@property', ['support.type.property-name', 'meta.property-name', 'entity.name.tag.yaml', 'punctuation.support.type.property-name', 'support.type.property-name.json', 'support.type.property-name.toml']],

  ['@module', ['entity.name.namespace', 'entity.name.module', 'entity.name.package', 'entity.name.scope-resolution', 'support.other.namespace', 'entity.name.type.namespace', 'entity.name.type.module', 'storage.modifier.import.java', 'storage.modifier.package.java']],

  ['@function', ['entity.name.function', 'support.function', 'variable.function', 'entity.name.function.member']],
  ['@function.call', ['meta.function-call entity.name.function', 'meta.function-call.generic', 'entity.name.command', 'meta.function.call entity.name.function']],
  ['@function.method.call', ['meta.method-call entity.name.function', 'meta.member.access meta.function-call.generic']],
  ['@function.builtin', ['support.function.builtin', 'support.function.std', 'support.function.library']],
  ['@function.method', ['entity.name.function.method', 'support.function.method', 'meta.definition.method entity.name.function']],
  ['@function.macro', ['entity.name.function.macro', 'support.function.macro', 'entity.name.macro']],
  ['@constructor', ['entity.name.function.constructor', 'support.function.constructor', 'new.expr entity.name.function', 'new.expr entity.name.type', 'new.expr support.class']],

  ['@keyword', ['keyword', 'keyword.control', 'keyword.other', 'keyword.declaration', 'storage.type', 'storage.modifier', 'keyword.local', 'keyword.control.flow', 'keyword.control.as', 'punctuation.definition.keyword', 'keyword.control.default']],
  ['@keyword.function', ['storage.type.function', 'keyword.function', 'keyword.declaration.function', 'keyword.control.def', 'storage.type.function.python']],
  ['@keyword.return', ['keyword.control.return', 'keyword.control.flow.return']],
  ['@keyword.conditional', ['keyword.control.conditional', 'keyword.control.if', 'keyword.control.else', 'keyword.control.elseif', 'keyword.control.switch', 'keyword.control.case', 'keyword.control.then', 'keyword.control.fi']],
  ['@keyword.repeat', ['keyword.control.loop', 'keyword.control.for', 'keyword.control.while', 'keyword.control.do', 'keyword.control.repeat', 'keyword.control.until', 'keyword.control.foreach', 'keyword.control.done']],
  ['@keyword.exception', ['keyword.control.exception', 'keyword.control.trycatch', 'keyword.control.try', 'keyword.control.catch', 'keyword.control.finally', 'keyword.control.throw']],
  ['@keyword.import', ['keyword.control.import', 'keyword.control.export', 'keyword.control.from', 'keyword.control.include', 'keyword.import', 'keyword.other.import', 'keyword.other.use', 'keyword.control.directive.include', 'keyword.control.require', 'meta.import keyword.control.default', 'meta.import keyword.control.as', 'meta.export keyword.control.as']],
  ['@keyword.operator', ['keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.logical.python', 'keyword.operator.word', 'keyword.operator.instanceof', 'keyword.operator.typeof', 'keyword.operator.delete', 'keyword.operator.void', 'keyword.operator.sizeof', 'keyword.operator.in', 'keyword.operator.of', 'keyword.operator.logical.lua']],
  ['@keyword.directive', ['meta.preprocessor', 'keyword.control.directive', 'punctuation.definition.directive', 'keyword.other.directive']],
  ['@keyword.directive.define', ['keyword.control.directive.define', 'keyword.other.define']],

  ['@operator', ['keyword.operator', 'storage.type.function.arrow', 'keyword.operator.arrow', 'punctuation.separator.key-value.mapping', 'keyword.operator.assignment', 'keyword.operator.spread', 'keyword.operator.rest', 'punctuation.accessor.optional']],

  ['@punctuation.bracket', ['punctuation', 'meta.brace', 'punctuation.section', 'punctuation.parenthesis', 'punctuation.bracket', 'punctuation.definition.block', 'punctuation.definition.parameters', 'punctuation.definition.array', 'punctuation.definition.dictionary', 'punctuation.definition.arguments', 'punctuation.definition.typeparameters', 'punctuation.squarebracket', 'punctuation.curlybrace', 'meta.brace.round', 'meta.brace.square', 'meta.brace.curly', 'punctuation.section.embedded']],
  ['@punctuation.delimiter', ['punctuation.separator', 'punctuation.terminator', 'punctuation.accessor', 'punctuation.delimiter', 'meta.delimiter', 'punctuation.separator.comma', 'punctuation.terminator.statement', 'punctuation.separator.key-value', 'punctuation.separator.dictionary', 'punctuation.comma', 'punctuation.semi', 'punctuation.separator.colon', 'punctuation.definition.section.case-statement', 'punctuation.definition.block.sequence.item.yaml']],
  ['@punctuation.special', ['punctuation.definition.template-expression', 'punctuation.definition.interpolation', 'punctuation.special', 'punctuation.section.interpolation']],

  ['@type', ['entity.name.type', 'entity.name.class', 'support.class', 'support.type', 'entity.other.inherited-class', 'entity.name.type.class', 'entity.name.type.interface', 'entity.name.type.enum', 'entity.name.type.alias', 'entity.name.struct', 'entity.name.enum', 'entity.name.union', 'entity.name.trait', 'entity.name.impl', 'meta.type.annotation entity.name.type', 'entity.name.type.parameter']],
  ['@type.builtin', ['support.type.primitive', 'support.type.builtin', 'storage.type.primitive', 'storage.type.built-in', 'storage.type.builtin', 'keyword.type', 'storage.type.numeric', 'storage.type.string', 'storage.type.boolean', 'storage.type.byte', 'storage.type.error', 'storage.type.rune', 'storage.type.uintptr', 'storage.type.core', 'entity.name.type.primitive', 'entity.name.type.numeric']],

  ['@attribute', ['entity.name.function.decorator', 'meta.decorator', 'punctuation.decorator', 'punctuation.definition.decorator', 'meta.annotation', 'storage.type.annotation', 'punctuation.definition.annotation', 'entity.other.attribute-name.pseudo-class', 'entity.other.attribute-name.pseudo-element']],
  ['@attribute.builtin', ['meta.function.decorator support.type', 'meta.function.decorator support.type.python', 'meta.function.decorator support.function.builtin']],
  ['@label', ['entity.name.label', 'entity.name.goto-label', 'fenced_code.block.language', 'markup.fenced_code.block.language']],

  ['@tag', ['entity.name.tag', 'support.class.component', 'entity.name.tag.custom']],
  ['@tag.attribute', ['entity.other.attribute-name', 'meta.attribute-with-value entity.other.attribute-name']],
  ['@tag.delimiter', ['punctuation.definition.tag', 'meta.tag punctuation.definition.tag']],

  ['@markup.heading', ['markup.heading', 'entity.name.section', 'markup.heading entity.name', 'punctuation.definition.heading', 'markup.heading.setext']],
  ...[1, 2, 3, 4, 5, 6].map((n) => [`@markup.heading.${n}`, [`heading.${n}.markdown entity.name.section`, `heading.${n}.markdown punctuation.definition.heading`]]),
  ['@markup.strong', ['markup.bold']],
  ['@markup.italic', ['markup.italic']],
  ['@markup.strikethrough', ['markup.strikethrough']],
  ['@markup.underline', ['markup.underline']],
  ['@markup.raw', ['markup.inline.raw', 'markup.raw', 'markup.fenced_code', 'markup.raw.block', 'markup.inline.raw.string.markdown', 'punctuation.definition.raw.markdown', 'punctuation.definition.markdown']],
  ['@markup.link', ['markup.link', 'meta.link', 'meta.link.inline.markdown punctuation.definition.metadata', 'meta.link.inline.markdown punctuation.definition.link']],
  ['@markup.link.url', ['markup.underline.link', 'markup.underline.link.image']],
  ['@markup.link.label', ['string.other.link.title', 'string.other.link.description', 'string.other.link.description.title', 'constant.other.reference.link']],
  ['@markup.list', ['punctuation.definition.list.begin.markdown', 'markup.list punctuation.definition.list', 'beginning.punctuation.definition.list.markdown']],
  ['@markup.quote', ['markup.quote']],
  ['@punctuation.special', ['meta.separator.markdown', 'punctuation.definition.quote.begin.markdown']],
  // emphasis markers keep the text color, NvChad only makes them bold or italic
  ['Normal', ['punctuation.definition.bold.markdown'], '@markup.strong'],
  ['Normal', ['punctuation.definition.italic.markdown'], '@markup.italic'],
  ['Normal', ['punctuation.definition.strikethrough.markdown'], '@markup.strikethrough'],

  ['@diff.plus', ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted']],
  ['@diff.minus', ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted']],
  ['@diff.delta', ['markup.changed', 'punctuation.definition.changed', 'meta.diff.range']],

  ['@error', ['invalid', 'invalid.illegal']],

  // JSDoc: stock NvChad installs no jsdoc parser, so a doc comment is one plain comment
  ['@comment', ['storage.type.class.jsdoc', 'variable.other.jsdoc', 'entity.name.type.instance.jsdoc', 'punctuation.definition.block.tag.jsdoc', 'punctuation.definition.bracket.curly.begin.jsdoc', 'punctuation.definition.bracket.curly.end.jsdoc', 'punctuation.definition.optional-value.begin.bracket.square.jsdoc', 'punctuation.definition.optional-value.end.bracket.square.jsdoc', 'keyword.operator.assignment.jsdoc', 'constant.other.description.jsdoc', 'punctuation.separator.pipe.jsdoc', 'punctuation.definition.inline.tag.jsdoc', 'entity.name.type.instance.jsdoc punctuation']],

  // CSS and SCSS (tree-sitter-css captures)
  ['Normal', ['support.constant.property-value', 'support.constant.font-name', 'support.constant.media', 'support.constant.vendored.property-value', 'support.constant.color', 'support.constant.parent-selector']],
  ['@type', ['entity.other.attribute-name.class.css']],
  ['@constant', ['entity.other.attribute-name.id.css']],
  ['@punctuation.delimiter', ['punctuation.definition.entity.css', 'punctuation.definition.constant.css']],
  ['@keyword.modifier', ['keyword.other.important.css']],

  // YAML
  ['@number', ['constant.numeric.float.yaml']],
  ['@string', ['constant.other.color.rgb-value', 'keyword.other.unit', 'support.type.map.key.scss']],
  ['@keyword', ['entity.other.keyframe-offset', 'keyword.control.at-rule.mixin', 'keyword.control.at-rule.mixin punctuation.definition.keyword', 'keyword.control.at-rule.use', 'keyword.control.at-rule.use punctuation.definition.keyword']],
  ['@variable', ['variable.parameter.keyframe-list']],
  ['@keyword.operator', ['keyword.operator.logical.and.media', 'keyword.operator.logical.not.media', 'keyword.operator.logical.only.media', 'keyword.operator.logical.or.media']],
  ['@keyword.directive', ['keyword.control.at-rule', 'keyword.control.at-rule punctuation.definition.keyword']],
  ['@keyword.import', ['keyword.control.at-rule.import', 'keyword.control.at-rule.import punctuation.definition.keyword', 'keyword.control.at-rule.include', 'keyword.control.at-rule.include punctuation.definition.keyword']],
  ['@function', ['support.function.misc.css', 'support.function.transform.css', 'support.function.gradient.css', 'support.function.url.css']],

  // JavaScript, TypeScript, JSX
  ['@variable', ['meta.definition.variable variable.other.constant']],
  ['@constant.builtin', ['support.type.builtin.ts', 'support.type.builtin.tsx']],
  ['@constructor', ['meta.method.declaration storage.type']],
  // a call's scope does not say whether it follows a dot; member calls are the common case in JS
  ['@punctuation.bracket', ['string.regexp punctuation.definition.string']],
  ['@function.method.call', ['meta.function-call.js entity.name.function', 'meta.function-call.ts entity.name.function', 'meta.function-call.tsx entity.name.function']],
  ['@keyword.return', ['keyword.control.flow.js', 'keyword.control.flow.ts', 'keyword.control.flow.tsx']],
  ['@keyword', ['meta.method.declaration storage.type.property']],
  ['@punctuation.delimiter', ['keyword.operator.type.annotation']],
  ['@punctuation.special', ['keyword.operator.optional']],
  ['@tag.builtin', ['entity.name.tag.tsx', 'entity.name.tag.jsx', 'entity.name.tag.js']],

  // HTML
  ['@operator', ['punctuation.separator.key-value.html']],
  ['@constant', ['meta.tag.metadata.doctype entity.name.tag', 'meta.tag.metadata.doctype entity.other.attribute-name']],
  ['@tag.delimiter', ['punctuation.definition.tag source.css-ignored-vscode', 'punctuation.definition.tag source.js-ignored-vscode']],

  // Python
  ['@variable.member', ['meta.attribute.python']],
  ['@operator', ['punctuation.separator.annotation.result.python']],
  ['@type.builtin', ['support.type.python', 'support.type.exception.python']],
  ['@constructor', ['support.function.magic.python', 'meta.function-call support.type.exception.python']],
  ['@punctuation.delimiter', ['punctuation.section.function.begin.python', 'punctuation.section.class.begin.python']],

  // Shell
  ['@punctuation.special', ['punctuation.definition.variable.shell', 'punctuation.definition.variable.shell variable', 'punctuation.definition.variable.shell variable.other', 'punctuation.definition.variable.shell variable.other.normal', 'punctuation.definition.variable.shell variable.parameter', 'punctuation.definition.variable.shell variable.parameter.positional.shell', 'punctuation.definition.subshell', 'punctuation.section.bracket.curly.variable', 'keyword.operator.expansion.shell']],
  ['@variable', ['variable.parameter.positional.shell']],
  ['@variable.parameter', ['string.unquoted.argument.shell', 'constant.other.option', 'string.regexp.unquoted.shell']],
  ['@keyword.import', ['storage.modifier.export.shell']],
  ['@operator', ['punctuation.separator.statement.and.shell', 'punctuation.separator.statement.or.shell']],

  // Rust
  ['@punctuation.delimiter', ['keyword.operator.namespace.rust', 'keyword.operator.access.dot.rust', 'keyword.operator.key-value.rust', 'keyword.operator.arrow.skinny.rust', 'keyword.operator.arrow.fat.rust']],
  ['@keyword.import', ['meta.use.rust keyword.other']],
  ['@keyword.function', ['keyword.other.fn.rust']],
  ['@keyword.modifier', ['punctuation.definition.lifetime.rust']],
  ['@constant.builtin', ['entity.name.type.option.rust', 'entity.name.type.result.rust']],
  ['@string', ['meta.interpolation.rust', 'punctuation.definition.interpolation.rust']],
  ['@function.macro', ['meta.attribute.rust']],
  ['@punctuation.special', ['punctuation.definition.attribute.rust']],
  ['@variable.parameter', ['meta.function.definition.rust variable.other.rust']],

  // PHP: the $ sigil takes the color of its variable
  ['@variable', ['variable.other punctuation.definition.variable.php']],
  ['@variable.builtin', ['variable.language punctuation.definition.variable.php', 'storage.type.php']],
  ['@variable.member', ['variable.other.class.php', 'variable.other.class punctuation.definition.variable.php', 'variable.other.property punctuation.definition.variable.php', 'variable.other.member.php', 'variable.other.property.php']],
  ['@type.builtin', ['keyword.other.type.php']],
  ['@keyword', ['support.function.construct.output.php']],
  ['Normal', ['keyword.control.exit.php']],
  ['@punctuation.delimiter', ['keyword.operator.return-value.php']],
  // VS Code ranks parent scopes by length, so the call rule names the longer meta.function-call.php
  ['@function.call', ['meta.function-call.php support.function', 'meta.function-call.php entity.name.function']],
  ['@function.method', ['meta.class.body.php meta.function.php entity.name.function']],
  ['@keyword.operator', ['keyword.operator.as.php']],

  // Lua: tokens TextMate leaves unscoped are punctuation, mostly the . and , NvChad paints as @punctuation.delimiter
  ['@punctuation.delimiter', ['source.lua']],
  ['@function.builtin', ['support.function.lua']],
  ['@function.call', ['support.function.any-method.lua']],
  ['@keyword.function', ['meta.function.lua keyword.control']],
  ['@variable.member', ['entity.other.attribute.lua']],
  // luadoc, which stock NvChad installs
  ['@keyword', ['comment.line.double-dash.documentation.lua storage.type.annotation']],
  ['@variable.parameter', ['comment.line.double-dash.documentation.lua entity.name.variable']],
]

// LSP semantic token selectors mapped to the groups base46's semantic_tokens integration defines
// stock NvChad turns LSP semantic tokens off, so themes ship with semanticHighlighting false and these only apply when a user turns it on
export const SEMANTIC_RULES = {
  comment: '@lsp.type.comment',
  operator: '@lsp.type.operator',
  punctuation: '@lsp.type.punctuation',
  variable: '@lsp.type.variable',
  attributeBracket: '@lsp.type.attributeBracket',
  macro: '@lsp.type.macro',
  formatSpecifier: '@lsp.type.formatSpecifier',
  namespace: '@lsp.type.namespace',
  parameter: '@lsp.type.parameter',
  property: '@lsp.type.property',
  decorator: '@lsp.type.decorator',
  builtinAttribute: '@lsp.type.builtinAttribute',
  generic: '@lsp.type.generic',
  boolean: '@lsp.type.boolean',
  enumMember: '@lsp.type.enumMember',
  const: '@lsp.type.const',
  number: '@lsp.type.number',
  selfKeyword: '@lsp.type.selfKeyword',
  selfTypeKeyword: '@lsp.type.selfTypeKeyword',
  'enumMember.defaultLibrary': '@lsp.typemod.enumMember.defaultLibrary',
  'variable.defaultLibrary': '@lsp.typemod.variable.defaultLibrary',
  'variable.static': '@lsp.typemod.variable.static',
  struct: '@lsp.type.struct',
  class: '@lsp.type.class',
  builtinType: '@lsp.type.builtinType',
  deriveHelper: '@lsp.type.deriveHelper',
  enum: '@lsp.type.enum',
  interface: '@lsp.type.interface',
  typeAlias: '@lsp.type.typeAlias',
  'class.defaultLibrary': '@lsp.typemod.class.defaultLibrary',
  'enum.defaultLibrary': '@lsp.typemod.enum.defaultLibrary',
  'struct.defaultLibrary': '@lsp.typemod.struct.defaultLibrary',
  type: '@lsp.type.type',
  typeParameter: '@lsp.type.typeParameter',
  string: '@lsp.type.string',
  escapeSequence: '@lsp.type.escapeSequence',
  lifetime: '@lsp.type.lifetime',
  function: '@lsp.type.function',
  method: '@lsp.type.method',
  'function.defaultLibrary': '@lsp.typemod.function.defaultLibrary',
  'macro.defaultLibrary': '@lsp.typemod.macro.defaultLibrary',
  'method.defaultLibrary': '@lsp.typemod.method.defaultLibrary',
  'variable.callable': '@lsp.typemod.variable.callable',
  keyword: '@lsp.type.keyword',
  'keyword.async': '@lsp.typemod.keyword.async',
  regexp: '@lsp.type.regexp',
  modifier: '@lsp.type.modifier',
  event: '@lsp.type.event',
  '*.deprecated': '@lsp.mod.deprecated',
}
