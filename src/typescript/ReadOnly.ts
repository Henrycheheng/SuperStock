interface IPerson1 {
  name: string
  age: number
  girlFirend: TGirlFirend
}

type TGirlFirend = {
  name: string
  age: number
}

const a11: IPerson1 = {
  name: '1',
  age: 1,
  girlFirend: {
    name: '1',
    age: 1,
  },
}

/**
 * Make all properties in T readonly
 */
/* type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
*/

type ReadonlyPerson = Readonly<IPerson1>

// [P in keyof T]: T[P]
// 1. P泛型参数
// 2. in 遍历T
// 3. keyof T: 意思是把T泛型里面的属性映射拿出来形成一个联合类型

// 4.  [P in keyof T] 这个是一个索引签名，接受一个泛型P是遍历于这个T泛型里面的属性映射的联合类型

// 1. 在这个例子中，IPerson1就代表是 泛型T
// 2. keyof T === keyof IPerson1, 也就是 name | age | girlFirend
// 3. P in keyof IPerson1,就是 P：name || P：age || P: girlFirend
// 4. 深层? 可以分配给索引签名的深层次属性

// -- 重要
// 5. T[P]就代表用 T泛型去读P这个遍历的索引签名的或者属性映射的 类型值，比如 IPerson1[name]的类型是 number

const xiaomi: ReadonlyPerson = {
  name: 'John',
  age: 10,
  girlFirend: {
    // name: 1,  // 深层
    name: '10',
    age: 10,
  },
}

// xiaomi.age = '1' // 无法分配到 "age" ，因为它是只读属性。
// xiaomi.name = 109 // 无法分配到 "age" ，因为它是只读属性。
xiaomi.girlFirend.age = 1 // 可以分配给索引签名的深层次属性

// readonly和as const的关系：
/*
  1。联系和区别：
    - 告诉编译器，变量是只读
    - 区别：
      - readOnly无法识别修改深层次的可读对象
      - as const 可以识别你修改了深层次的可读对象的某个属性
*/
