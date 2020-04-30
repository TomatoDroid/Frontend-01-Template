# 每周总结可以写在这里

## 宏任务 微任务

js 代码片段就是所谓的微任务，不是 js 引擎的，或者调用在 js 引擎之上的就是宏任务（script，UI 交互，setTimeout，setInterval）

async 函数的 await 之前的都是同步代码

```
async function afoo(){
    console.log("-2")
    await new Promise(resolve => resolve());
    console.log("-1")
}
new Promise(resolve => (console.log("0"), resolve()))
    .then(()=>(
        console.log("1"),
        new Promise(resolve => resolve())
            .then(() => console.log("1.5")) ));
setTimeout(function(){
    console.log("2");
    new Promise(resolve => resolve()) .then(console.log("3"))
}, 0)
console.log("4");
console.log("5");
afoo()
```

```
宏任务
0 -> `微任务队列[1,Promise(1.5)]`
4
5
-2 -> `微任务队列[1,Promise(1.5),-1]`
1 -> `微任务队列[-1, 1.5]`
-1
1.5
宏任务
2 -> `微任务队列[promsie(3)]`
3
```
