# 快速开始

初始化之后需要对 TS 支持进行一些配置，直接复制即可，当然如果想配置，可以酌情根据注释取舍

## TS 配置

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

## 创建 tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "isolatedModules": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 创建 tsconfig.config.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "compilerOptions": {
    "composite": true,
    "types": ["node"],
    "isolatedModules": false
  }
}
```

## 创建 tsconfig.vitest.json

```json
{
  "extends": "./tsconfig.app.json",
  "exclude": [],
  "compilerOptions": {
    "isolatedModules": false,
    "composite": true,
    "lib": [],
    "types": ["node", "jsdom"]
  }
}
```

## 将 ts 集成到 vue 项目

安装 ts 的 eslint 支持和类型支持，ts 的 eslint 插件和解析器

```bash
pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
