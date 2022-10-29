# rimrafPage

## 安装 rimraf 快速删除 npm cache

```bash
pnpm i rimraf -D
```

## 配置 npm script

> 在 package.json 中加入以下 npm script

```json
  "clean:cache": " rimraf node_modules/.cache/ rimraf node_modules/.vite",
  "reinstall": "rimraf pnpm-lock.yaml && rimraf node_modules && pnpm install",
```
