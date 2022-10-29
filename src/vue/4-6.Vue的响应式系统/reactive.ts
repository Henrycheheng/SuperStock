// Object.defineProptery()

// 需要一个存储副作用
const bucket = new Set()

const data = { test: 'hello world' }

// 对原始数据进行代理
const obj = new Proxy(data, {
  /**
   *
   * 拦截读取操作
   * @param {*} target 想代理初始化对象
   * @param {*} key 想要从陷阱里面获取这个对象的哪个key
   * @param {*} receiver 代理本身或者继承自代理的对象
   */
  get(target: any, key) {
    // 将副作用函数添加到存储副作用函数的桶里
    bucket.add(effect)
    // 返回属性值
    return target[key]
  },
  set(target: any, key, newValue) {
    // 设置属性值
    target[key] = newValue
    // 将副作用函数从桶中取出
    bucket.forEach((fn: any) => fn())
    // 返回true代表设置成功
    return true
  },
})

function effect() {
  document.body.innerText = obj.test
}
// 执行副作用函数触发读取操作
effect()

setTimeout(() => {
  obj.test = 'hello Vue3'
}, 1000)
