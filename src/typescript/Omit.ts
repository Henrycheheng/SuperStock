/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Construct a type with the properties of T except for those in type K.
 */
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
interface IPerson {
  name?: string
  age?: number
}

type TPerson = Omit<IPerson, 'name'>

type Omit1<T, K extends keyof number | string | symbol> = {
  [P in Exclude<keyof T, K>]: T[P]
}

// keyof T = 'name' | 'age'
/*
1. T：接受的第一个泛型参数
2. K: 继承于 number | string | symbol 的联合类型
3. keyof: 从一个类型或者接口中拿出来所有的属性映射，组成联合类型
4. Pick： 接口有重复的返回值字段，需要Pick。
    --泛型参数的第一个：需要提取的源接口
    --泛型参数的第2个：需要提取的源接口哪些属性
5. Exclude:
    1. 排除联合类型
    2. 排除一个不存在的属性，将会什么都不排除
6. extends：
    1. 如果是简单类型，直接继承自后面联合类型
    2. 如果是联合类型，就会一一拿来进行继承
        - 一真为真，会返回never，表示在这个继承的类型里面，如果当前的类型不在继承类型里面，此时会返回本身类型
        - 一假则为假，就会返回本身类型
*/
