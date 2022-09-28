/**
 * Exclude from T those types that are assignable to U
 */
// type Exclude<T, U> = T extends U ? never : T;

// 如果是第一个参数联合类型，分别将参数拿去执行extends,若果是返回（只要有一个是就会返回never）never，如果不在U里面，返回本身

type AType = 'name' | 'age' | 'gender'
type SType = Exclude<AType, 'gender'>

/*
  参数1： 要排除那个接口
  参数2： 排除当前接口的那个属性名
*/
const test1: SType = 'name'
// const test2: SType = 'n' // 不能将类型“"n"”分配给类型“SType”

/*
  1. Exclude：只能排除联合类型'name' | 'age' | 'gender'
  2. gender代替泛型U, K extends keyof T
  3.  T extends U ? never : T意思是  'name' | 'age' | 'gender'里面是否有Exclude泛型的第二个参数，
    - 1 因为只能是联合类型，一真为真，会返回 never，就可以把gender排除
*/
