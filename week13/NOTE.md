# 每周总结可以写在这里

# 组件化基础

- ## 对象与组件
  - 对象
    - Properties
    - Methods
    - Inherit
  - 组件
    - Properties
    - Methods
    - Inherit
    - Attribute
    - Config & State
    - Event
    - Lifecycle
    - Children
- ## Attribute VS Property
  - Attribute
    - 强调描述性
  - Property
    - 强调从属关系

```
<my-component attribute="v" />

// Attribute
myComponent.getAttribute('a')
myComponent.setAttribute('a', 'value')

// Property
myComponent.a = 'value'
```

## 一些例子

```
// id
<div class="cls1 cls2"></div>
<script>
let div = document.getElementByTagNames('cls1')
// div.classList
div.className
</script>

```

```
// style
<div class="cls1 cls2" style="color: blue;"></div>
<script>
let div = document.getElementByTagNames('cls1')
div.style // 对象
</script>
```

```
// href
<a href="//m.taobao.com"></a>
<script>
let a = document.getElementByTagNames('a')
a.href  // http://m.taobao.com 这个URL是resolve后的结果
a.getAttribute('href') // //m.taobao.com 跟HTML中的完全一样
</script>
```

```
// input的value
<input value="cute" />
<script>
let input = document.getElementsByTagName("input")[0] // 若property没有设置，则结果是attribute
input.value // cute
input.getAttribute('value') // cute

input.value = 'hello' // 若value属性已经设置，则attribute再变也改变不了property的值，元素上实际的效果是property优先

input.value // hello
input.getAttribute('value') // hello
</script>
```

## 如何设计组件状态

| Markup set | JS set | JS change | User input change |           |
| :--------: | :----: | :-------: | :---------------: | :-------: |
|     ❎     |   ✅   |    ✅     |         ?         | property  |
|     ✅     |   ✅   |    ✅     |         ?         | attribute |
|     ❎     |   ❎   |    ❎     |        ✅         |   state   |
|     ❎     |   ✅   |    ❎     |        ❎         |  config   |
