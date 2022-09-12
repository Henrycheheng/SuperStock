

interface IMessage {
  usernames: string[];
  password?: string | number
  event?: _MouseEvent & _KeyboardEvent
}

// 联合类型，只要满足其中一种类型就可以
// ?可选参数，可以有也可以没有，自动拼接一个 undefined的联合类型
// 交叉类型&，声明后，prop会有当前交叉类型的所有方法，适用于事件之类的处理函数的合并
const message: IMessage = {
  usernames: ['1'],
  password: undefined
}

// 索引签名
interface IInfoMessage {
  [propname: string | symbol | number]: any
  usernames: 1,
  password: string
}

const b1: IInfoMessage = {
  usernames: 1,
  password: '1',
  a: 1
}

b1.a = 1

// 继承
interface IShape {
  color: string;
  list: Array<TShape>
}

interface Square extends IShape {
  sideLength: number;
  // color: string;
}

let square = <Square>{};
square.color = "blue"
square.sideLength = 10;

// type

type TShape = {
  usernames: string
  password: string
}


