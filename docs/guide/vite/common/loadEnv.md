# loadEnv 源码分析

## env 的使用

```ts
import { loadEnv } from 'vite'

loadEnv('development', process.cwd())
```

- 检查 process.cwd()路径下.env.development.local、.env.development、.env.local、.env 这四个环境文件。
- 输出 NODE*ENV 和 VITE*开头的键值对。
- VITE\_开头的键值对后面的不会覆盖前面的。
- NODE_ENV 的值后面的会覆盖前面的。

## [node 中的 process.cwd()](<a href="/guide/node/process" target="_blank" rel="noreferrer">/guide/node/process</a>)

## 相关 API

- [NodeApi 中文文档-process](http://nodejs.cn/api/process.html)

- [NodeApi 中文文档-process-env 说明](http://nodejs.cn/api/process.html#process_process_env)
- [NodeApi 中文文档-path](http://nodejs.cn/api/path.html)
- [NodeApi 中文文档-path.join()方法](http://nodejs.cn/api/path.html#path_path_join_paths)
- [NodeApi 中文文档-path.dirname()方法](http://nodejs.cn/api/path.html#path_path_dirname_path)
- [NodeApi 中文文档-fs](http://nodejs.cn/api/fs.html)
- [NodeApi 中文文档-fs.existsSync()方法](http://nodejs.cn/api/fs.html#fs_fs_existssync_path)
- [NodeApi 中文文档-fs.statSync()方法](http://nodejs.cn/api/fs.html#fs_fs_statsync_path_options)
- [NodeApi 中文文档-fs.readFileSync()方法](http://nodejs.cn/api/fs.html#fs_fs_readfilesync_path_options)
- [Node-process-env 在线运行](http://run.nodejs.cn/?api=process.env)
- [Linux 手册页-environ(7)](https://man7.org/linux/man-pages/man7/environ.7.html)
- [Vite 项目下.env 系列文件命名的意义-中文文档](https://cn.vitejs.dev/guide/env-and-mode.html)

## 源码

## lookupFile

```ts
// ↓加载node的path模块
var path$1 = require('path')
var fs$2 = require('fs')

// ↓传入的如果是一个包含'default'的key的对象，则输出对象的'default'的key对应的value。
function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e['default'] : e
}

// ↓结合上面二者
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs$2)

// ↓检查dir下是否有formats中的路径，返回有就返回路径或者文件
function lookupFile(dir, formats, pathOnly = false) {
  for (const format of formats) {
    // ↓输出dir和formats连接后的路径
    const fullPath = path__default.join(dir, format)
    // ↓同步的检查该路径是否存在，并且该路径对应的是一个文件
    if (fs__default.existsSync(fullPath) && fs__default.statSync(fullPath).isFile()) {
      // ↓是否只要输出路径，否则输出文件
      return pathOnly ? fullPath : fs__default.readFileSync(fullPath, 'utf-8')
    }
  }
  // ↓上面的路径都不满足输出条件，那么再检查一遍检查传入的dir的目录名
  const parentDir = path__default.dirname(dir)
  if (parentDir !== dir) {
    return lookupFile(parentDir, formats, pathOnly)
  }
}
```

## loadEnv 源码

```ts
// 从传参的root目录下获取
// 按顺序 .env.${mode}.local、.env.${mode}、.env.local、.env这四个环境文件
// 输出文件内配置的对象
function loadEnv(mode, root, prefix = 'VITE_') {
  if (mode === 'local') {
    // ↓如果第一个参数传入'local'，就报错：
    // ↓"local "不能用作模式名称，因为它与``.env文件的.local后缀冲突。
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` +
        `the .local postfix for .env files.`
    )
  }
  // ↓待输出的环境变量对象
  const env = {}
  // ↓要读取的四个文件名称的字符串数组
  const envFiles = [
    /** mode local file */ `.env.${mode}.local`,
    /** mode file */ `.env.${mode}`,
    /** local file */ `.env.local`,
    /** default file */ `.env`,
  ]
  // 检查是否有实际的以VITE_*开头的环境变量。

  // 这些通常是Node内联提供的env对象，并应优先考虑。
  for (const key in process.env) {
    if (key.startsWith(prefix) && env[key] === undefined) {
      env[key] = process.env[key]
    }
  }

  for (const file of envFiles) {
    // ↓检查根目录下是否有指定配置文件
    const path = lookupFile(root, [file], true)
    if (path) {
      // ↓以换行为单位输出文件中KEY=VAL格式的到结果对象中
      const parsed = main$2.parse(fs__default.readFileSync(path), {
        debug: !!process.env.DEBUG || undefined,
      })
      // ↓让环境变量互相使用，这个方法我没仔细研究。不是很懂
      main$1({
        parsed,
        // ↓防止process.env修改
        ignoreProcessEnv: true,
      })
      // 只输出以prefix开头的key
      for (const [key, value] of Object.entries(parsed)) {
        // ↓只有这个key在前面没有加载过才赋值
        if (key.startsWith(prefix) && env[key] === undefined) {
          env[key] = value
        } else if (key === 'NODE_ENV') {
          // 在.env文件中覆盖NODE_ENV。
          process.env.VITE_USER_NODE_ENV = value
        }
      }
    }
  }
  return env
}
```
