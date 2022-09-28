/**
 * From T, pick a set of properties whose keys are in the union K
 * 使用场景： 后端接口返回值有大量相同，但是不整合接口 => Pcik<a接口，a接口中的想要拿到新接口的字段，以keyof字段的key的联合类型传入>
 */
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface IPick {
  name: string
  age: number
  age1: number
  age2: number
}

// keyof T === 'name' | 'age'

type TSomePerson = Pick1<IPick, 'age' | 'age1' | 'age2'>

/*
  实现原理
  1. 需要2个参数
  2. 第一个参数，泛型T,ABC都没关系， IPick传递的进来的泛型接口
  3. extends:
    - 1）如果 T 不是一个联合类型，表示如果 T 是 U 的子集，如果前者是后者的子集，返回 T。不是返回never (never是所有类型的子类型)

    - 2）如果 T 是一个联合类型，表示如果 T 中的类型是 U 的子集，那么返回 X 否则返回 Y。这个过程可以理解为对T中的类型进行一次遍历，每个类型都执行一次 extends

      -下面的例子中对 T 中的每个类型进行遍历，检测是否是 extends 于 null 或 undefined。如果满足这个条件就返回 never（对于联合类型来说如果返回never那就相当于不存在，因为never是所有类型的子类型），如果不满足就返回原来的类型。
*/

// 1
export type TExtends<T, U> = T extends U ? number : never
// T(number)是 U(number | string)的子集，所以返回number
type TExtendsExample1 = TExtends<number, number | string> // number

// T(boolean) 不是 U(number | string)的子集，所以返回never
type TExtendsExample2 = TExtends<boolean, number | string> // never

// 2 如果T是联合类型
type NonNullable<T> = T extends null | undefined ? never : T

// T(number | string) 不是 U(null | undefined) 的子集，所以返回 T
// 如果是传入的泛型T是联合类型，就会把联合类型中的每一项拿出来形成分别看是否继承于 null | undefined
type TNonNullableExample1 = NonNullable<number | string> // number | string

// T(string | null) 中 string 不是 U 的子集返回 string，null 是 U 的子集，返回 never
type TNonNullableExample2 = NonNullable<string | null> // string 一真就不会取never,交叉类型一假就会取never
