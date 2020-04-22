# NumericLiterals

## Syntax

`/^(\.\d+|(0|[1-9]\d*)\.?\d*?)([Ee]?[+-]?\d+)?$|^0[Bb][0-1]*$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/`
NumericLiteral ::

- DecimalLiteral
- BinaryIntegerLiteral
- OctalIntegerLiteral
- HexIntergerLiteral

DecimalLiteral ::

- DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)
- . decimalDigits ExponentPart(opt)
- DecimalIntegerLiteral ExponentPart(opt)

`/^(\.\d+|(0|[1-9]\d*)\.?\d*?)([Ee]?[+-]?\d+)?$/`
DecimalIntegerLiteral ::

- 0
- NonZeroDigit DecimalDigits(opt)

DecimalDigits ::

- DecimalDigits
- DecimalDigits DecimalDigit

DecimalDigit :: one of

- 0 1 2 3 4 5 6 7 8 9

NonZeroDigit :: one of

- 1 2 3 4 5 6 7 8 9

ExponentPart ::

- ExponentIndicator SignedInterger

ExponentIndicator :: one of

- e E

SignedInterger ::

- DecimalDigits
- `+` DecimalDigits
- `-` DecimalDigits

`/^0[Bb][0-1]*$/`
BinaryIntegerLiteral ::

- 0b BinartDigits
- 0B BinartDigits

BinartDigits ::

- BinaryDigit
- BinaryDigits BinaryDIgit

BinaryDigit :: one of

- 0 1

`/^0[oO][0-7]+$/`
OctalIntegerLiteral ::

- 0o OctalDigits
- 0O OctalDigits

OctalDigits ::

- OctalDigit
- OctalDigits OctalDigit

OctalDigit :: one of

- 0 1 2 3 4 5 6 7

`/^0[xX][0-9a-fA-F]+$/`
HexIntegerLiteral ::

- ox HexDigits
- oX HexDigits

HexDigits ::

- HexDigit
- HexDigits HexDigit

HexDigit :: one of

- 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
