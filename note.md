### 声明式

页面包括的元素

- DOM Level 一样
- attribute 静态属性一样 : v-bind
- event @v-on
- DOM 的树形结构节点 一样

```ts
cosnt title = {
  tag: 'title',
  props: {
    onClick: handler
  }，
  children： {
    {tag: 'span'}
  }
}
```

```vue
<title @click="handler">
    <span></span>
</title>
```

### Vnode 描述 DOM

```ts
let level = 3
const title = {
  tag: `h${level}`,
}
```

### h

```ts
import { h } from 'vue'

export default {
  render() {
    return h('h1', { onClick: handler })
  },
}
```

### 渲染器

```ts
function render (vnode,container) {
    // vnode的tag属性来作为创建 dom的元素
    const el = document.createElement(vnode?.tag)
    // 遍历vnode的props属性
    for (const k in vnode.props) {
        if(/^on/.test(key)) {
            el.addEventListenr(
            	key.substr(2).toLowerCase() // click
                vnode?.props[key]
            )
        }
    }

    // children
    if (Object.prototype.toString.call(vnode?.children) === [object String]) {
        el.appendChild(document.createTextNode(vnode.children))
    } else if(Array.isArray(vnode?.children)) {
        // 使用当前元素的el作为挂载点
        vnode.children.forEach((child)=>render(child,el))
    }

    container.appendChild(el)
}

render(vnode,document.body)
```

### TS 配置

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.config.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    }
  ],
  "compilerOptions": {
    // ↓指定ECMAScript目标版本，esnext为最新版本
    "target": "esnext",
    // ↓指定生成哪个模块系统代码，esnext为最新版本
    "module": "esnext",
    // ↓决定如何处理模块。
    "moduleResolution": "node",
    // ↓启用所有严格类型检查选项。
    "strict": true,
    // ↓禁止对同一个文件的不一致的引用。
    "forceConsistentCasingInFileNames": true,
    // ↓允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
    "allowSyntheticDefaultImports": true,
    // ↓禁用函数参数双向协变检查。
    "strictFunctionTypes": false,
    // ↓在 .tsx文件里支持JSX
    "jsx": "preserve",
    // ↓解析非相对模块名的基准目录。查看 模块解析文档了解详情。
    "baseUrl": ".",
    // ↓允许编译javascript文件。
    "allowJs": true,
    // ↓生成相应的 .map文件。
    "sourceMap": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    // ↓若有未使用的局部变量则抛错。
    "noUnusedLocals": true,
    // ↓若有未使用的参数则抛错。
    "noUnusedParameters": true,
    // ↓启用实验性的ES装饰器。
    "experimentalDecorators": true,
    // ↓编译过程中需要引入的库文件的列表。
    "lib": ["dom", "esnext"],
    // ↓要包含的类型声明文件名列表。
    "types": ["vite/client"],
    // ↓要包含的类型声明文件路径列表。
    "typeRoots": ["./node_modules/@types/", "./types"],
    "incremental": true,
    // ↓在表达式和声明上有隐含的 any类型时报错。
    "noImplicitAny": false,
    // ↓忽略所有的声明文件（ *.d.ts）的类型检查。
    "skipLibCheck": true,
    // ↓模块名到基于 baseUrl的路径映射的列表。查看 模块解析文档了解详情。
    "paths": {
      "/@/*": ["src/*"],
      "/#/*": ["types/*"],
      "app/*": ["app/*"],
      "config/*": ["app/_config/*"],
      "environment/*": ["environments/*"],
      "shared/*": ["app/_shared/*"],
      "helpers/*": ["helpers/*"],
      "tests/*": ["tests/*"]
    }
  },
  // ↓指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts",
    "mock/**/*.ts"
  ],
  // 指定一个排除列表（include的反向操作）
  "exclude": ["node_modules", "dist", "**/*.js"]
}
```

### eslint

```shell

pnpm install eslint --dev

```

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 解析器
  parser: '@typescript-eslint/parser',
  // 扩展
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'react-app',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 插件
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  // 规则
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // 'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    // "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数 50
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': [
      'warn',
      {
        max: 1,
      },
    ],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': [
      'warn',
      {
        ignoreChainWithDepth: 3,
      },
    ],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    // "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'no-useless-escape': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-prototype-builtins': 'warn',
    'no-fallthrough': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-case-declarations': 'warn',
    'no-async-promise-executor': 'warn',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```

### eslint-plugin-Vue

```shell
pnpm i eslint-plugin-vue vue-eslint-parser --dev
```

### 将插件集成到 eslint.js 中

### 将 ts 集成到 vue 项目

```bash
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

### prettier

```bash
pnpm i prettier eslint-plugin-prettier eslint-config-prettier -D
```

### ls-Lint

```bash
pnpm i @ls-lint/ls-lint -D
```

### style-Lint

```bash
pnpm i stylelint stylelint-config-standard stylelint-config-prettier stylelint-order -D
```

### postcss

```bash
pnpm i postcss autoprefixer -D
```

### rimraf

```bash
pnpm i rimraf -D
```

### huksy

- lint 操作
- commit message 拦截
- prettier

```bash
pnpm i husky lint-staged @commitlint/cli @commitlint/config-conventional pretty-quick -D
```

#### 生成 git hooks 的钩子

```bash
npx husky install
```

### common shell

### .husky 目录下 lintstagedrc.js

```js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write', 'stylelint --fix'],
  '*.{less,css,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
}
```

### sciprt

```json
  "lint:lint-staged": "lint-staged -c ./husky/lintstagedrc.js",
  "lint:lint-pretty": "pretty-quick --staged", // Runs Prettier on your changed files.
```

# 启动 husky

pnpm install: husky

# 添加一个消息任务到这个文件

npx husky add .husky/commit-msg

# 创建一个任务文件

npx husky add .husky/pre-commit

### 消息助手

```bash
pnpm i commitizen -D
```

- 初始化，以什么格式询问

```bash
npx commitizen init cz-conventional-changelog --yarn --dev --exact

pnpm i czg cz-git -D
```

### 使用 conventional-changelog-cli 生成版本记录

```bash
pnpm i conventional-changelog-cli -g -D
```

### vite.config.ts

#### defineConfig

- 接受一个用户的配置对象
- 或者接受一个函数，函数可以入参一个配置对象,里面有 2 个值 command,mode

- command: 用来区分生产，开发环境
- mode: 用来区分传递的 script 是什么模式

```ts
import { fileURLToPath } from 'url'
// > This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string.

// 可以不用引入node的path包，并且防止解析了一个不存在于目录的路径

const __filename = fileURLToPath(import.meta.url)

new URL('file:///C:/path/').pathname // Incorrect: /C:/path/
fileURLToPath('file:///C:/path/') // Correct:   C:\path\ (Windows)
```

### npm 安装机制

- npm 和 yarn 同时使用有没有问题
- 重新删除安装是否有风险
- lock 锁文件是否要提交到仓库
- dev 和 dependencies 是否有影响

> 1. 获取缓存路径
> 2. 清楚缓存： pnpm cache clean --force (一直提示安装不上包，1.清楚锁文件 2.删除缓存 3.pnpm i 4.cmd 管理员打开)
>    3 npx

### vite 的情景配置

```ts
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // serve 独有配置
    }
  } else {
    return {
      // build 独有配置
    }
  }
})
```

dotenv 它能将环境变量中的变量从 .env 文件加载到 process.env 中。

> 解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中。如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值

### wrapperEnv

### nodemon

nodemon dir/\*.js --watch 监视文件

### Typescript

> 见注释

### yarn

- 2016 npm v3,没有锁文件
- 确定性
  - yarn.lock，可以保证安装稳定性，=> 无论依赖顺序如何
- 扁平的模块模式
  - 将不同版本依赖包按照一定策略 归纳成 一个 特定的版本（归并）
- 网络性能更好
  - yarn 要求排队，类似于并发的连接池
  - 如果安装失败，重新进行安装（重试机制）
- 缓存机制
- 离线模式，npm 6.0 以上的版本

#### 所以我们下期看一下 yarn.lock 的结构

- 相比于 npm，yarn 区别在于 lock 中的版本号是不固定 =>

  - 单独一个锁文件 yarn.lock 是没办法决定一个包的版本号，需要结合 package.json
  - synp
    - 互相切换 npm 和 yarn 的锁文件
    - 是否和 pnpm 切换？
  - 缓存
    - yarn cache dir - 查看缓存目录
    - yarn 使用 perfer-online,优先使用网络资源
      - npm 看你有无锁文件，有锁文件=> 走缓存 => 不是并发，走网络会很慢
      - yarn 优先网络，并发并且排队模式

- yarn 区别于 npm 命令
  npm i yarn add

#### yarn 独有的功能

yarn import
yarn license
yarn pack 创建包依赖项的压缩 gzip 存档
yarn why 查看为什么需要某个依赖
yarn autoclean

- yarn autoclean -init
- 经过一个 install
- 经过一个 add
- 如果 yarn autoclean --force 运行

### yarn 安装机制

- 1. yarn 检查包
     解析是否检查是否有锁文件（package-lock.json）,提示冲突
- 2. 解析包
     首先， 解析`dependencies`，`devDependencies`
     遍历首层依赖，然后找包版本信息
     会递归查找某个包下面的嵌套依赖
- 避免重复安装
- 将解析的包和正在解析的包存在 Set,可以自动去重
- 对于没有解析过的包，会首先走 yarn.lock 文件，从这里获取版本信息，标记为已解析
- 如果在 lock 文件没找到，会向 yarn 的默认源发请求，获取已知版本的最高版本号的信息，并且标记为已解析

### yanr 的解析包机制

见 processon 导图

### Vite 配置之 root 和 base 和 reslove.alias

- reslove.alias
- 引用别名
- 保证入口的统一性

- Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>

  > 当使用文件系统路径的别名时，请始终使用绝对路径。

### Vite server.port

类型： number
默认值： 5173
指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口

- npx vite --port=4000

### server.proxy

- Record<string, string | ProxyOptions>

```ts
/** Changes the origin of the host header to the target URL. */
  changeOrigin?: boolean | undefined

export declare interface ProxyOptions extends HttpProxy.ServerOptions {
    /**
     * rewrite path
     */
    rewrite?: (path: string) => string;
    /**
     * configure the proxy server (e.g. listen to events)
     */
    configure?: (proxy: HttpProxy.Server, options: ProxyOptions) => void;
    /**
     * webpack-dev-server style bypass function
     */
    bypass?: (req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions) => void | null | undefined | false | string;
}
```

- rewrite | configure | bypass,经查看,不在 extends 的里面,会返回自己的类型

### server.proxy 提取 createProxy 函数

proxy?: Record<string, string | ProxyOptions>;

> key 是不能叫 接口 ServerOptions 里面的 索引签名

```md
target:url 模块要解析的 url 字符串

Forward: url 模块要解析的 url 字符串

Agent:传递给 http(s)的对象。 请求(参见节点的 https 代理和 http 代理对象)

ssl:要传递给 http . createserver()的对象
// TODO: ssl 证书 https://www.kaspersky.com.cn/resource-center/definitions/what-is-a-ssl-certificate

Ws: true/false，如果你想代理 websockets

Xfwd: true/false，添加 x-forward 报头

secure: true/false，如果您想验证 SSL 证书

toProxy: true/false，传递绝对 URL 作为路径(用于代理到代理)

prependPath: true/false，默认值:true -指定是否要将目标路径前置到代理路径

ignorePath: true/false，默认值:false -指定是否要忽略传入请求的代理路径(注意:如果需要，您将不得不手动添加/)。

localAddress:要为传出连接绑定的本地接口字符串

changeOrigin: true/false，默认值:false -将主机头的起点更改为目标 URL

preserveHeaderKeyCase: true/false，默认值:false -指定是否保留响应头键的字母大小写
// j_sessionId,返回 cooikes,可能需要

auth:基本的身份验证。 'user:password'计算授权头。

hostRewrite 重定向到(201/301/302/307/308)上的位置主机名。

autoRewrite:重写基于请求的主机/端口重定向的位置主机/端口(201/301/302/307/308)。 默认值:false。

protocolRewrite:重写(201/301/302/307/308)重定向到'http'或'https'的位置协议。 默认值:空。
```

> export type ProxyList = ProxyItem[] // 方法接收的参数 需要导出这个类型到`utils`

- 导出到 以供 VITE_PROXY: ProxyList 使用

### Vite 配置之`HMR`

- 用于 HMR websocket 必须使用不同的 http 服务器地址的情况
- Hot Module Repleaced

```ts

// https://cn.vitejs.dev/config/server-options.html#server-hmr
server.HMR : boolean |
{
  protocol?: string, // 协议类型
  host?: string, // 域名
  port?: number, // 开发服务器 -- 一般都会有跨域的问题 => server  2 server,或者 nginx 生产环境配置
  path?: string, // 路径
  timeout?: number, // 计时操作，超时操作
  overlay?: boolean, // 一般不开启
  clientPort?: number, // clientPort 是一个高级选项，只在客户端的情况下覆盖端口，这允许你为 websocket 提供不同的端口，而并非在客户端代码中查找。如果需要在 dev-server 情况下使用 SSL 代理，这非常有用。
  server?: Server
}

```

#### class Server extends NetServer

```ts
class Server extends NetServer {
  constructor(requestListener?: RequestListener)
  constructor(options: ServerOptions, requestListener?: RequestListener)
  /**
   * Sets the timeout value for sockets, and emits a `'timeout'` event on
   * the Server object, passing the socket as an argument, if a timeout
   * occurs.
   *
   * If there is a `'timeout'` event listener on the Server object, then it
   * will be called with the timed-out socket as an argument.
   *
   * By default, the Server does not timeout sockets. However, if a callback
   * is assigned to the Server's `'timeout'` event, timeouts must be handled
   * explicitly.
   * @since v0.9.12
   * @param [msecs=0 (no timeout)]
   */
  setTimeout(msecs?: number, callback?: () => void): this
  setTimeout(callback: () => void): this
  /**
   * Limits maximum incoming headers count. If set to 0, no limit will be applied.
   * @since v0.7.0
   */
  maxHeadersCount: number | null
  /**
   * The maximum number of requests socket can handle
   * before closing keep alive connection.
   *
   * A value of `0` will disable the limit.
   *
   * When the limit is reached it will set the `Connection` header value to `close`,
   * but will not actually close the connection, subsequent requests sent
   * after the limit is reached will get `503 Service Unavailable` as a response.
   * @since v16.10.0
   */
  maxRequestsPerSocket: number | null
  /**
   * The number of milliseconds of inactivity before a socket is presumed
   * to have timed out.
   *
   * A value of `0` will disable the timeout behavior on incoming connections.
   *
   * The socket timeout logic is set up on connection, so changing this
   * value only affects new connections to the server, not any existing connections.
   * @since v0.9.12
   */
  timeout: number
  /**
   * Limit the amount of time the parser will wait to receive the complete HTTP
   * headers.
   *
   * In case of inactivity, the rules defined in `server.timeout` apply. However,
   * that inactivity based timeout would still allow the connection to be kept open
   * if the headers are being sent very slowly (by default, up to a byte per 2
   * minutes). In order to prevent this, whenever header data arrives an additional
   * check is made that more than `server.headersTimeout` milliseconds has not
   * passed since the connection was established. If the check fails, a `'timeout'`event is emitted on the server object, and (by default) the socket is destroyed.
   * See `server.timeout` for more information on how timeout behavior can be
   * customized.
   * @since v11.3.0, v10.14.0
   */
  headersTimeout: number
  /**
   * The number of milliseconds of inactivity a server needs to wait for additional
   * incoming data, after it has finished writing the last response, before a socket
   * will be destroyed. If the server receives new data before the keep-alive
   * timeout has fired, it will reset the regular inactivity timeout, i.e.,`server.timeout`.
   *
   * A value of `0` will disable the keep-alive timeout behavior on incoming
   * connections.
   * A value of `0` makes the http server behave similarly to Node.js versions prior
   * to 8.0.0, which did not have a keep-alive timeout.
   *
   * The socket timeout logic is set up on connection, so changing this value only
   * affects new connections to the server, not any existing connections.
   * @since v8.0.0
   */
  keepAliveTimeout: number
  /**
   * Sets the timeout value in milliseconds for receiving the entire request from
   * the client.
   *
   * If the timeout expires, the server responds with status 408 without
   * forwarding the request to the request listener and then closes the connection.
   *
   * It must be set to a non-zero value (e.g. 120 seconds) to protect against
   * potential Denial-of-Service attacks in case the server is deployed without a
   * reverse proxy in front.
   * @since v14.11.0
   */
  requestTimeout: number
  addListener(event: string, listener: (...args: any[]) => void): this
  addListener(event: 'close', listener: () => void): this
  addListener(event: 'connection', listener: (socket: Socket) => void): this
  addListener(event: 'error', listener: (err: Error) => void): this
  addListener(event: 'listening', listener: () => void): this
  addListener(event: 'checkContinue', listener: RequestListener): this
  addListener(event: 'checkExpectation', listener: RequestListener): this
  addListener(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this
  addListener(
    event: 'connect',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  addListener(event: 'request', listener: RequestListener): this
  addListener(
    event: 'upgrade',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  emit(event: string, ...args: any[]): boolean
  emit(event: 'close'): boolean
  emit(event: 'connection', socket: Socket): boolean
  emit(event: 'error', err: Error): boolean
  emit(event: 'listening'): boolean
  emit(event: 'checkContinue', req: IncomingMessage, res: ServerResponse): boolean
  emit(event: 'checkExpectation', req: IncomingMessage, res: ServerResponse): boolean
  emit(event: 'clientError', err: Error, socket: stream.Duplex): boolean
  emit(event: 'connect', req: IncomingMessage, socket: stream.Duplex, head: Buffer): boolean
  emit(event: 'request', req: IncomingMessage, res: ServerResponse): boolean
  emit(event: 'upgrade', req: IncomingMessage, socket: stream.Duplex, head: Buffer): boolean
  on(event: string, listener: (...args: any[]) => void): this
  on(event: 'close', listener: () => void): this
  on(event: 'connection', listener: (socket: Socket) => void): this
  on(event: 'error', listener: (err: Error) => void): this
  on(event: 'listening', listener: () => void): this
  on(event: 'checkContinue', listener: RequestListener): this
  on(event: 'checkExpectation', listener: RequestListener): this
  on(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this
  on(
    event: 'connect',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  on(event: 'request', listener: RequestListener): this
  on(
    event: 'upgrade',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  once(event: string, listener: (...args: any[]) => void): this
  once(event: 'close', listener: () => void): this
  once(event: 'connection', listener: (socket: Socket) => void): this
  once(event: 'error', listener: (err: Error) => void): this
  once(event: 'listening', listener: () => void): this
  once(event: 'checkContinue', listener: RequestListener): this
  once(event: 'checkExpectation', listener: RequestListener): this
  once(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this
  once(
    event: 'connect',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  once(event: 'request', listener: RequestListener): this
  once(
    event: 'upgrade',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  prependListener(event: string, listener: (...args: any[]) => void): this
  prependListener(event: 'close', listener: () => void): this
  prependListener(event: 'connection', listener: (socket: Socket) => void): this
  prependListener(event: 'error', listener: (err: Error) => void): this
  prependListener(event: 'listening', listener: () => void): this
  prependListener(event: 'checkContinue', listener: RequestListener): this
  prependListener(event: 'checkExpectation', listener: RequestListener): this
  prependListener(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this
  prependListener(
    event: 'connect',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  prependListener(event: 'request', listener: RequestListener): this
  prependListener(
    event: 'upgrade',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  prependOnceListener(event: string, listener: (...args: any[]) => void): this
  prependOnceListener(event: 'close', listener: () => void): this
  prependOnceListener(event: 'connection', listener: (socket: Socket) => void): this
  prependOnceListener(event: 'error', listener: (err: Error) => void): this
  prependOnceListener(event: 'listening', listener: () => void): this
  prependOnceListener(event: 'checkContinue', listener: RequestListener): this
  prependOnceListener(event: 'checkExpectation', listener: RequestListener): this
  prependOnceListener(
    event: 'clientError',
    listener: (err: Error, socket: stream.Duplex) => void
  ): this
  prependOnceListener(
    event: 'connect',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
  prependOnceListener(event: 'request', listener: RequestListener): this
  prependOnceListener(
    event: 'upgrade',
    listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void
  ): this
}
```

### build.minify （除非做组件库，否则不需要配置）

类型： boolean | 'terser' | 'esbuild'
默认： 'esbuild'

压缩率 只差 1%-2%。就多了 40kb https://github.com/privatenumber/minification-benchmarks
速度 快了 20 倍， 393ms 24ms

注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。

> /_#**PURE**_/ 通过类似于这种东西识别 tree-shaking

terser 需要下载 pnpm add -D terser

### build.outDir

类型： string
默认： dist
指定输出路径(相对于 项目根目录).

### build.dynamicImportVarsOptions

```ts
export declare interface RollupDynamicImportVarsOptions {
  /**
   * Files to include in this plugin (default all).
   * @default []
   */
  include?: string | RegExp | (string | RegExp)[]
  /**
   * Files to exclude in this plugin (default none).
   * @default []
   */
  exclude?: string | RegExp | (string | RegExp)[]
  /**
   * By default, the plugin quits the build process when it encounters an error. If you set this option to true, it will throw a warning instead and leave the code untouched.
   * @default false
   */
  warnOnError?: boolean
}
```

#### 防止动态导入出错时，进程被杀掉

```ts
    build: {
      outDir: OUTPUT_DIR,
      dynamicImportVarsOptions: {
        warnOnError: true,
      },
    },
```

### Vite 配置之排除打包

- 给 rollupOptions 传递更细的配置，external 即可，是个数组，由字符串和正则构成

### vite 提高构建性能

> reportCompressedSize: false，不使用 gzip 压缩报告

- 1.不考虑性能优化
- 2. 大型文件比如 echarts 和 lodash.es 这种包

### chunk 分包警告

chunkSizeWarningLimit

### Vite 配置之 define

define
类型： Record<string, string>
定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。

从 2.0.0-beta.70 开始，string 值会以原始表达式形式使用，所以如果定义了一个字符串常量，它需要被显式地打引号。（例如使用 JSON.stringify）

为了与 esbuild 的行为保持一致，表达式必须为一个 JSON 对象（null、boolean、number、string、数组或对象），亦或是一个单独的标识符。

替换只会在匹配到周围不是其他字母、数字、\_ 或 $ 时执行

#### note

// vite-env.d.ts

```ts
declare const **APP_VERSION**: string
// https://cn.vitejs.dev/config/shared-options.html#define
```

由于开发模式和构建模式实现 define 的差异性，我们应该避免采用一些可能导致不一致的用例。

例如：

const obj = {
**NAME**, // 不要以缩写形式定义对象属性
**KEY**: value // 不要定义对象的 key
}

### vite 配置之 preprocessorOptions

Record： Record 的内部定义，接收两个泛型参数；Record 后面的泛型就是对象键和值的类型

```ts
  css: {
      preprocessorOptions: {
        less: {
          addtionalData: `$injectedColor: orange`,
        },
      },
    },
```

```bash
pnpm i less -D
```

### less

#### 变量

@: 表示要声明一个变量

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

```bash
lessc index.less
```

#### Mixins(混合)

混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法。假设我们定义了一个类（class）如下：

> 想混合，只需要把选择器在需要使用的地方当成函数调用即可

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

#### 嵌套（Nesting）

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

> 你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 clearfix 技巧，重写为一个混合（mixin） (& 表示当前选择器的父级）：

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: ' ';
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

#### 运算（Operations）

- 1 算术运算符 +、-、\*、/ 可以对任何`数字`、`颜色`或`变量`进行运算。
- 2 如果可能的话，算术运算符在加、减或比较之前会进行`单位换算`。
- 3 计算的结果以`最左侧`操作数的单位类型为准。
- 4 如果单位换算无效或失去意义，则`忽略单位`。
- 5 无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```

#### 函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在 Less 函数手册中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将
0.5 转换为 50%，
将颜色饱和度增加 5%，
以及颜色亮度降低 25%
并且色相值增加 8 等用法：

```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%` // 将小数转化为对应的百分比的 函数
  color: saturate(@base, 5%); // saturate 用来增加颜色饱和度
  background-color: spin(lighten(@base, 25%), 8);
}
```

#### namespace(命名空间)

```less
#add() {
  .button {
    display: block;
    background-color: grey;
    border: 1px solid black;

    &:hover {
      background-color: white;
    }
  }
}
/*
  命名空间的代码复用mixin之后，不会进到当前文件的 compile 系统
  命名空间的包裹的前缀必须是有效的css选择器
*/

#header a {
  color: orange;
  #add.button();
}
```

#### 映射（Maps）

```less
#colors() {
  primary: blue;
  secondary: green;
}

/*
  Map： 可以取命名空间里面的对应的key的值
  css属性值可以是命名空间里面的 索引签名，就叫 key

*/
.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

### 作用域（Scope）

Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。因此，下面的 Less 代码示例和上面的代码示例是相同的：

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

#### 导入（Importing）

```less
@import "library"; // library.less
@import "typo.css";
```
