// section2: Partial
// Partial好处就是他不会破坏原结构

/**
 * Make all properties in T optional
 */
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

interface Person1 {
  name: string;
  age: number;
}

// const person1: Person1 = {} 类型“{}”缺少类型“Person1”中的以下属性: name, age

const person2: Partial<Person1> = {} // 可以
const person3: Partial<Person1> = { name: 'John' } // 可以

// 不能将类型“{ height: number; }”分配给类型“Partial<Person1>”。对象文字可以只指定已知属性，并且“height”不在类型“Partial<Person1>”中。
// const person4: Partial<Person1> = { height: 180 }

// 实现原理
type Partial1<T> = {
  [P in keyof T]?: T[P];
};

// in 遍历T泛型
// 1. name | age，将接口的属性名会拿出来，会去遍历这个属性名形成联合类型
// 2. ?:可选，表示这个key在这个遍历的联合类型里面是可有可无的
// 3. T[P]： 中括号相当取对象里面的key的值类型。在上面的例子中， Person1 就是T,Person1[P],P就是属性的遍历，只不过是可选的
//    - 所以这个T[P] === Person1[name]或者Person1[age]的值类型，string和number
// 4. keyof 和Record的第一个参数效果是一样的，将接口的属性名会拿出来，会去遍历这个属性名形成联合类型

interface Person2 {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person2; // "name" | "age" | "location"
type K2 = keyof Person2[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person2 };  // string | number

