# 每周总结可以写在这里

## 排版

第一代：正常流，第二代：flex，第三代：grid

1. 预处理
2. 收集元素进行（hang）
   - 分行
     - 根据主轴尺寸，把元素分进行
     - 若设置 no-wrap,则强行分配进第一行
3. 计算主轴
   - 计算主轴方向
     - 找出所有 flex 元素
     - 把主轴方向的剩余尺寸按比例分配给这些元素，
     - 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素
4. 计算交叉轴
   - 根据每一行中最大元素尺寸计算行高
   - 根据行高 flex-align 和 item-align 确定元素定位
5. 绘制单个元素
   - 绘制需要依赖一个图形环境
   - 我们这里采用 npm 包 images
   - 绘制在一个 viewport 上进行
   - 与绘制相关的属性：background-color，border，background-image
6. ## 绘制 DOM

## 重学 CSS

1. CSS 语法的研究
   - @charset
   - @import
   - rules
     - @media
     - @page
     - rule
2. @规则的研究
