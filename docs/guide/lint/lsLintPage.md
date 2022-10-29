# ls-Lint 文件名命名规范

## 安装 ls-Lint

```bash
pnpm i @ls-lint/ls-lint -D
```

## 配置 .ls-lint.yaml

```yaml
ls:
  src/*:
    .js: kebab-case | PascalCase
    .vue: PascalCase | regex:^index
    .ts: camelcase | PascalCase
    .tsx: camelcase | PascalCase
    .mock.ts: kebab-case | PascalCase
    .d.ts: kebab-case
    .test.d.ts: kebab-case
    .less: kebab-case | PascalCase | regex:^indexs
    .spec.ts: kebab-case | PascalCase
    .dir: kebab-case

  ignore:
    - node-modules
    - .git
    - .github
    - .vscode
    - .dist
    - .husky
```
