# defineConfig

## defineConfig 函数支持 ts 补全和情景配置

- 接受一个用户的配置对象
- 或者接受一个函数，函数可以入参一个配置对象,里面有 2 个值 command,mode

- command: 用来区分生产，开发环境
- mode: 用来区分传递的 script 是什么模式

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
