# 每周总结可以写在这里

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
