# huksy

## 安装 husky 系列依赖

- lint 操作
- commit message 拦截
- prettier

```bash
pnpm i husky lint-staged @commitlint/cli @commitlint/config-conventional pretty-quick -D
```

## 生成 git hooks 的钩子

```bash
npx husky install
```

## 新建 common.sh

```sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

```

## 新建 commit-msg

```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"

```

## 新建 pre-commit

```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"


[ -n "$CI"]&& exit 0;

# check file name
npm run lint:ls-lint

# format pretter you change the file
npm run lint:lint:lint-staged

# pretty
npm run lint:lint-pretty

```

## .husky 目录下 lintstagedrc.js

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

## npm sciprt 中添加

```json
  "lint:lint-staged": "lint-staged -c ./husky/lintstagedrc.js",
  "lint:lint-pretty": "pretty-quick --staged", // Runs Prettier on your changed files.
```

## 启动 husky

```bash
pnpm install: husky
```

## 添加一个消息任务到这个文件

```bash
npx husky add .husky/commit-msg
```

## 创建一个任务文件

```bash
npx husky add .husky/pre-commit
```
