# 每周总结可以写在这里

```
div#a.b .c[id=x] [0,1,3,1]
#a:not(#b) [0,2,0,0]
*.a [0,0,1,0]
div.a [0,0,1,1]
```

简单选择器
复合选择器

- # 伪类
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑型

  - :not 伪类
  - :where :has

- # 伪元素
- ::before
- ::after
- ::first-letter
- ::first-line

inline formatting context
block formattting context

- ## block-level 表示可以被放入bfc
- ## block-container 表示可以容纳bfc
- ## block-box = block-level + block-container
- ## block-box 如果 overflow 是 visible， 那么就跟父bfc合并

# 正常流的行模型
1.  Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline
2.  Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“
3.  vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线吗？

# float与clear
文字绕排使用float

# margin折叠只发生在BFC
能容纳正常流的容器就会产生BFC，只有overflow:visible特例
