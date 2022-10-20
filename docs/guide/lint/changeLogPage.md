# changelog 生成版本记录

## 使用 conventional-changelog-cli 生成版本记录

```bash
pnpm i conventional-changelog-cli -g -D
```

## 配置 npm script

```json
 "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
```
