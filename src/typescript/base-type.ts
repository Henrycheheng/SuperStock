/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const a = '1'
const a1 = 1
const a2 = false
const a3 = undefined
const a4 = null

// 数组的声明方式
const arr: string[] = []
const arr1: Array<string | number> = [1]

// 元组
/*
  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为string和number类型的元组。
*/
let x: [string, number]
// Initialize it
x = ['hello', 10] // OK
// Initialize it incorrectly

// console.log(x[0].substring(1)); // OK

// 枚举
/* 读枚举下面的属性，会返回索引 */
enum Color {
  Red,
  Green,
  Blue,
}
const c: Color = Color.Green
// console.log('c', c)

// 任意值
/* 允许任何类型，不推荐，会丢失类型 */
const b: any = {}
b.name = 10

// void 不允许有任何类型
// 'javascript: void(0)' 执行一段js代码，但是不返回任何东西
function warnUser(): void {
  // alert("This is my warning message");
  return undefined
}

// never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 类型断言
const someValue: any = 'this is a string'
let strLength: number = (someValue as string).length

// unkonwn
const someValue1: unknown = 1

// unkonwn类型的变量赋值给其他变量会报错
// strLength = someValue1
