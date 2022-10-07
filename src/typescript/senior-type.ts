/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// 联合类型

let squareOne: string | number = 10
squareOne = 'a'

// keyof
/* 提取类型中的索引签名（属性名）为联合类型 */
interface IKey {
  name: string
  age: number
}

type PersonKey = keyof IKey // 等同于 type PersonKey = 'name' | 'age'

const p1: PersonKey = 'name'
const p2: PersonKey = 'age'
// const p3: PersonKey = 'height'

// section1: Record
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
type TMytype = {
  [propname: string | number | symbol]: any
}

// 1.搭配联合类型适用
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type MethodAny = Record<RequestMethod, any>

// 2.让子对象都拥有特定的键值对类型，第二个参数传接口
interface PersonModel {
  name: string
  age: number
}

type Person = Record<string, PersonModel>
const school: Person = {
  person1: {
    name: '1',
    age: 10,
  },
  person2: {
    name: '1',
    age: 10,
  },
}

// Record实现原理
type Records<K extends string | number | symbol, T> = {
  [P in K]: T
}
// 1.泛型K是第一个参数
// 2 P in K是什么意思？
/*
  - in就是遍历的意思，将 string | number | symbol 遍历
*/
// 3. 每个属性都会传入T泛型的值类型，string: PersonModel

// 验证Record

interface IPageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact' | 'shoppingCart' | 'shoppingCart1'

function fn(test: Record<Page, IPageInfo>) {}

fn({
  home: { title: 'Home' },
  contact: { title: 'contact' },
  about: { title: 'About' },
  shoppingCart: { title: 'shopping cart' },
  shoppingCart1: { title: 'shopping cart' },
})
// 第一个参数是要传递的属性名的遍历
// 第二个参数是要传递的属性的满足某个接口的值类型，并且每个遍历的属性都需要满足这个值类型

// 1. 必须传入对象 2.对第一个参数进行了属性映射，会遍历key的属性，不能多也不能少，值类型是第二个参数决定 3.顺序无关
