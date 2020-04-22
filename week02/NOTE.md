# 每周总结可以写在这里

## 第一节

- 语言按照语法分类

  - 非形式语言
    - 中文，英文
  - 形式语言（乔姆斯基谱系）
    - 0-型文法 （无限制文法或短语结构文法）包括所有文法
    - 1-型文法（上下文相关文法）生成上下文相关文法
    - 2-型文法（上下文无关文法）生成上下文无关文法
    - 3-型文法（正规文法）生成正则语言

- 产生式（BNF）巴克斯诺尔范式

  - 用尖括号括起来的名称来表示语法结构名
  - 语法结构分成基础结构和需要用其他结构定义的复合结构
    - 基础结构称终结符
    - 复合结构称非终结符
  - 引号和中间的字符表示终结符
  - 可以有括号
  - \ 表示重复多次
  - | 表示或
  - +表示至少一次

- 编写带括号的四则运算产生式

```
<Number> : "0" | "1" | "2" | "3" | "4" |...| "9"
<Decimal> : "0" | ("1" | "2" | "3" | "4" |...| "9")<Number>*

<PrimaryExpressioin> : <Decimal> |
    "(" <LogicalExpressioin> ")"

<MultiplicativeExpression> : <PrimaryExpressioin> |
    <MultiplicativeExpression> "*" <PrimaryExpressioin> |
    <MultiplicativeExpression> "/" <PrimaryExpressioin>

<AdditiveExpression> : <MultiplicativeExpression> |
     <AdditiveExpression> "+"  <MultiplicativeExpression> |
     <AdditiveExpression> "-"  <MultiplicativeExpression>

<LogicalExpressioin> : <AdditiveExpression> |
    <LogicalExpressioin> "||"  <AdditiveExpression> |
    <LogicalExpressioin> "&&"  <AdditiveExpression>
```

- 元编程
  - 指的是一种语言本来做不到的事情，通过你编程来修改它，使得它可以做到，这就是元编程

## 第二节

### [unicode](https://www.fileformat.info/info/unicode/)

- block 编码组
- category
- `\u`转义使用场景

  - 标识符
  - 字符串

### InputElement

- WhiteSpace
  - `<TAB>` 制表符`\t`
  - `<VT>` 纵向制表符`\v`
  - `<FF>` FromFeed`\f`
  - `<SP>` 空格
  - `<NBSP>`不换行空格 U+00A0
  - `<ZWNBSP>`零宽空格
  - `<USP>`
- LineTerminator
  - LF `\n`
  - CR `\r`
- Comment
- Token
  - Punctuator
  - IdentifierName
    - Identifier
    - Keywords
      - 变量名
      - 属性
  - Literal
    - Number
      - 标准
        - IEEE 754 Double Float
      - DecimalLiteral 十进制
        - 小数点前后可以省略
          - 0.
          - .0
        - 2.1e12 `e`表示很大的整数
        - 浮点数比较: Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON
      - BinaryIntergerLiteral 二进制 `0b`
      - OctalIntergerLiteral 八进制 `0o`
      - HexIntergerLiteral 十六进制 `0x`
    - String
      - ASCII
      - Unicode(JS 只承认的)
        - unicode 编码
          - UTF-8
          - UTF-16
      - UCS
      - GB
        - GB2312
        - GBK(GB13000)
        - GB18030
      - ISO-8859
      - BIG5
      - 支持码点 U+0000 ~ U+10FFFF,但推荐只使用 U+0000 ~ U+FFFF（BMP）
      - 存储方式 UTF8/UTF16
      - Grammer
        - 单引号
        - 双引号
        - 反引号
        - 可以包含 `\r \" \' \\ \n \b \t \v \f`
    - Boolean
      - true
      - false
    - Undefined
      - undefined
    - Null
      - null
    - Symbols
    - Object
