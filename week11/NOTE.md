# 每周总结可以写在这里

### 广度优先搜索

### 深度优先搜索

### 启发式搜索

### 二叉堆

- 小顶堆，叶子节点小于父节点即可
  1023 个元素，则二叉树的高度：logn -> 9
  一般使用数组形式存二叉树，而不是用对象，计算节点下的叶子节点，一个是 1*2+1，一个是 1*2+2

### 正则 Regex

- String.prototype.match()
  - ()捕获
  - (?:) 不捕获
- String.prototype.replace()
  - 注意\$符号
- RegExp.prototype.exec() 词法分析
  ```
    let lastIndex = 0
    let token

    do {
        token = inputElement.exec(source)
        console.log(token)
    } while(inputElement.lastIndex - lastIndex === token.length)
  ```
- lastIndex
