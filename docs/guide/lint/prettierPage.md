# prettier 集成

## 安装 prettier

```bash
pnpm i prettier eslint-plugin-prettier eslint-config-prettier -D
```

## 创建`prettier.config.js`

```bash
touch prettier.config.js
```

## 配置 prettier

```ts
module.exports = {
  printWidth: 100, // 单行代码的最大长度
  tabWidth: 2, // 指定缩进的长度
  useTabs: false,
  semi: false,
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  quoteProps: 'as-needed', // 只在需要的时候给对象属性加引号
  bracketSpacing: true,
  trailingComma: 'es5', // trailingComma 的默认值是 es5，所以会在对象最后一个属性加上逗号。
  arrowParens: 'always',
  insertPragma: false, // 是否在文件顶部插入一个 format 注释
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
}
```

## 创建 .prettierignore

```bash
touch .prettierignore
```

## 添加 prettier 忽略项目

```text
/dist/
.local
.output.js
/node_modules/

**/*.svg
**/*.sh

/public/
```
