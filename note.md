### 声明式

页面包括的元素

- DOM Level  一样
- attribute  静态属性一样 : v-bind
- event      @v-on
- DOM的树形结构节点  一样

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

### Vnode描述DOM

```ts
let level = 3
const title = {
    tag: `h${level}`
}
```

### h

```ts
import { h } from 'vue'

export default {
    render () {
         return h('h1',{onClick: handler})
    }
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

### TS配置

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
    "plugin:@typescript-eslint/recommended",
    'prettier',
    'plugin:prettier/recommended',
    "react-app"
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
  plugins: ['react', '@typescript-eslint', "react-hooks", 'prettier'],
  // 规则
  rules: {
    "react-hooks/rules-of-hooks": "error",
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

### 将插件集成到eslint.js中

### 将ts集成到vue项目

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

- lint操作
- commit message 拦截
- prettier

```bash
pnpm i husky lint-staged @commitlint/cli @commitlint/config-conventional pretty-quick -D
```

#### 生成git hooks的钩子


```bash
npx husky install
```

### common shell

### .husky目录下 lintstagedrc.js

```js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['prettier --write', 'stylelint --fix'],
  '*.{less,css,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
};

```

### sciprt

```json
  "lint:lint-staged": "lint-staged -c ./husky/lintstagedrc.js",
  "lint:lint-pretty": "pretty-quick --staged", // Runs Prettier on your changed files.
```

# 启动husky
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
