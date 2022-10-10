## 1.权衡的艺术

- React： 纯运行时
- Vue: 运行时 + 编译时
- Angular: 纯编译时

### php xml

### ajax 异步的 js 和 xml

jQuery+Bootstrap

### 09 node

工程化的进度 npm

### Angular.js

2 之后就叫 angular

### 数据驱动页面

#### Angular 脏检查 > 当你数据变了后，他会检查所有的更新

#### React 16.8 之前，虚拟 DOM(vNode)

假如页面越来越大，虚拟 DOM 量级越来越大，正常浏览器是 16ms/fps

fiber，操作系统的时间碎片的概念

### Vue 每一个 DOM 节点都会建立 watcher 做这个响应式

watcher 对象，Vue2 借鉴了虚拟 dom
组件内： 使用虚拟 DOM,
组件之间： 使用 watcher,

模板+虚拟 DOM

## 2 命令式 和 声明式

命令式： 关注过程

- 获取 id
- 文本内容为 hello world
- 绑定点击事件
- 点击时弹出 ok

```js
$('#example')
  .text('Hello world')
  .on('click', () => alert('Hello world'))

const div = document.getElementById('div')
div.innerText = 'Hello Vue3'
div.addEventListener('click', () => alert('Hello world'))
```

```Vue
<!-- eslint-disable vue/multi-word-component-names -->
<div @click="() => alert('ok')">Hello Vue3</div>
```

### 性能

直接修改定义为 A,找出差异的定义为 B

A
A+B

#### 找出差异 === 虚拟 DOM diff（组件内）

公式： 声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改性能消耗

找出差异的性能消耗如果尽可能缩小，无限接近于原生

#### 理论上不可能比原生小

DOM 操作是不包 innerHTMl

#### innerHTMl 和虚拟 DOM 的性能对比

innerHTMl：
      - const html = `<div class="alert"><span class=""></span></div>`

div.innerHTML = html

1. 要把字符串 html 解析成 DOM 树，-  **DOM 层面的计算**
2. 创建页面的性能：HTML 字符串拼接计算量 + innerHTMl 的 DOM 计算量

虚拟 DOM 在创建的时候

1. 创建虚拟 DOM(Vnode)的时间
2. 转化成真实 DOM 的时间

```js
const vNode = {
  tag: 'div',
  props: {
    onClick: function() => alert('')
  },
  attr: {
    a: 'href',
  }
}
```

创建的时候的差别：
创建虚拟 DOM(Vnode)的时间 和 HTML 字符串拼接计算量

### 更新的时候

- innerHTML: 重新做字符串的拼接
- 虚拟 DOM: 只需要找出差异,


## 3 运行时和编译时

纯运行时：

```js
const obj = {
	tag: 'div',
    children: [
        {tag: 'span', children: 'hello'}
    ]
}
```

warn
