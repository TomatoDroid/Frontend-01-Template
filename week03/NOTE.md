# 每周总结可以写在这里

## 第一节

### Expressions

- #### Member

  - `a.b`
  - `a[b]`
  - `` foo`xxx${xx}` 模板字符串 ``
  - super.b
  - super['b']
  - new.target 判断一个类是不是 new 出来的
  - new Foo() 优先级高于 new Foo

- #### Referance

  - delete
  - assign

- #### Call

  - foo()
  - super()
  - foo()['b']
  - foo().b
  - foo()`abc`

- #### Left Handside & Right Handside

- #### Update

  - ++ a
  - a ++
  - -- a
  - a --

- #### Unary 单目运算符

  - delete a.b
  - void foo()
  - typeof a
  - +a
  - -a
  - ~a
  - !a
  - await a

- #### Exponental

  - \*\*

- #### Multiplicative

  - `* / %`

- #### Additive

  - `+ -`

- #### Shift

  - << >> >>>

- #### Relationship

  - < > <= >= instanceof in

- #### Equality

  - ==
  - !=
  - ===
  - !==

- #### Bitwise

  - & ^ |

- #### Logical

  - &&
  - ||

- #### Conditional
  - `? :`

## 第二节

### Complection Record

- [[type]]: break return continue throw or normal
- [[value]]: Types
- [[target]]: label

#### 简单语句

- ExpressionStatement
- EmptyStatement
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

#### 复合语句

- BlockStatement
  - `{}`开头
- Iteration
  - while()
  - do while()
  - for( ; ;)
  - for( in )
    - 循环对象的 key
  - for( of ) Iterate 机制
    - 任何一个具有迭代对象的
    - 循环数组的每一个值

如果有 var，一定要写在 function 的最前面，

## 在设计对象的状态和行为时，遵循”行为改变状态“的原则

Object API/Grammar

- {} / . / [] / Object.definePrototype
- Object.create / Object.setPrototypeOf / Object.geetPrototype
- new / class / extends
- new / function / prototype(抛弃)
