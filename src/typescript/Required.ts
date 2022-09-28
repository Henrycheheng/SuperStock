/**
 * Make all properties in T required
 */
type Required1<T> = {
  [P in keyof T]-?: T[P]
}

// -就是去掉这个可选的？，变成必选参数

interface IRequired1 {
  name?: string
  age?: number
}

// const required: Partial<IRequired1> = { name: '10' }

const required1: Required1<IRequired1> = {
  name: '1',
  age: 0,
}
