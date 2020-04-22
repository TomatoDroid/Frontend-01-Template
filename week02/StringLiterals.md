# StringLiterals

## Syntax

StringLiteral::

- " DoubleStringCharacters<sub>opt</sub> "
- ' SingleStringCharacters<sub>opt</sub> '

DoubleStringCharacters::

- DoubleStringCharacter DoubleStringCharacters<sub>opt</sub>

SingleStringCharacters::

- SingleStringCharacter SingleStringCharacters<sub>opt</sub>

DoubleStringCharacter::

- SourceCharacter **but not one of** or `\` or LineTerminator(-`<LF>换行<CR>回车<LS>线分隔符<PS>参数分隔符`)
- `<LS>U+2028`
- `<PS>U+2029`
- `\` EscapeSequence
- LineContinuation

SingleStringCharacter::

- SourceCharacter **but not one of** or `\` or LineTerminator
- `<LS>`
- `<PS>`
- `\` EscapeSequence
- LineContinuation

`/^\n|\r\n|\u2028|\u2029$/`
LineContinuation::

- `\` LineTermiatorSequence(-`<LF> / <CR> / <LS> / <PS> / <CR><LF>`)

`^[^\n\r\u2028\u2029\dxu]|0(?!=\d)|x[0-9a-fA-F][2]|u[0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\}$`
EscapeSequence::

- characterEscapeSequence
- 0`[lookahead ∉ DecimalDigit]` `/^0(?!=\d)$/`
- HexEscapeSequence
- UnicodeEscapeSequence (unicode 转义序列)

`/^[^\n\r\u2028\u2029\dxu]$/`
characterEscapeSequence::

- SingleEscapeCharacter
- NonEscapeCharacter

`^['"\\bfnrtv]$`
SingleEscapeCharacter:: one of

- `' " \ b f n r t v`

`/^[^\n\r\u2028\u2029'"\\bfnrtv\dxu]$/`
NonEscapeCharacter::

- souceCharacter but not one of EscapeCharacter or LineTerminator

`^['"\\bfnrtv\dxu]$`
EscapeCharacter::

- SingleEscapeCharacter
- DecimalDigit
- x
- u

`/^x[0-9a-fA-F][2]$/`
HexEscapeSequence::

- x HexDigit HexDigit

`/^u[0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\}$/`
UnicodeEscapeSequence::

- u Hex4Digits `/^u[0-9a-fA-F]{4}$/`
- u {CodePoint}`/^u\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\}$/`

Hex4Digits::

- HexDigits HexDigits HexDigits HexDigits
