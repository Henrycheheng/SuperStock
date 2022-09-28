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

### server.proxy

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
