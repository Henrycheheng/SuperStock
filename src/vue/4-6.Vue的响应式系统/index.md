### 响应式系统的作用和实现

- 1 响应式数据 和 副作用
- 2 尝试实现一个相对完善的响应式系统
  - 1. 如何避免无限递归？
  - 2. 为什么需要嵌套使用副作用函数？
  - 3. 2 个副作用函数之间会产生何种影响？
- 3 响应式数据相关的内容
  - Proxy
  - Reflect
  - 如何根据这 2 个东西实现对数据对象代理
  - Object.definePropterty()

### 1. 响应式数据 和 副作用

#### 副作用:

会产生副作用的函数

纯函数

```ts
function pureAdd(a: number, b: number) {
  return a + b + Math.random() * 10
}
pureAdd()
```

```js
function effect() {
  // js的操作
  document.body.innerText = 'hello world'
}
effect()

document.body.innerText = 'hello Vue3'
```

> 修改全局变量

```js
let a = 'effect'
function effect() {
  a = 'a'
}
effect()
```

#### 响应式数据

```js
const obj = { text: 'hello Vue' }
function effect() {
  document.body.innerText = obj?.text
}
effect()
// 当对象的属性值变了之后，我其实希望它再调用一下 effect()，重新读obj.text
```

#### 响应式数据的基本实现

> 如何才能 obj 变成响应式数据呢

- 修改 obj.text 的值的时候，会触发设置操作
- effect()的调用（执行），会触发读取的操作

##### 执行调用栈的分析

effect()
=> 触发设置操作 document.body.innerText = obj.test
=> 进入 get 的陷阱
=> 给 set 中添加不重复的 effect
=> 并将值返回

5 秒后，执行设置操作
=> 触发设置操作 obj.test = 'hello Vue3'
=> 进入 set 陷阱
=> 接受设置的新值并设置
=> 执行 set 里存储的所有 effect，并以最后一次为准
再微任务时限内，循环调用 set
=> 然后 Proxy 上面的值改变，通过 Reflect 映射到原对象

#### Proxy => 到 Reflect 映射到原对象
