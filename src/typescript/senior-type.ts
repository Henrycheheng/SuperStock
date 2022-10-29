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
