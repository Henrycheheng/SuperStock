module.exports = {
  printWidth: 100, // 单行代码的最大长度
  tabWidth: 2, // 指定缩进的长度
  useTabs: false,
  semi: true, // 不要分号
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  quoteProps: 'as-needed', // 只在需要的时候给对象属性加引号
  bracketSpacing: true,
  trailingComma: 'es5', // trailingComma 的默认值是 es5，所以会在对象最后一个属性加上逗号。
  jsxBracketSameLine: false,
  arrowParens: 'always',
  insertPragma: false, // 是否在文件顶部插入一个 format 注释
  proseWrap: always, // 当超出 printWidth 时折行
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
};
