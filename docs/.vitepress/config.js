export default {
  themeConfig: {
    siteTitle: 'dive into Vue ecosystem',
    logo: '/assets/icon/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/examples/button/' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Henrycheheng/SuperStock' }],
    sidebar: {
      '/guide/': [
        // 前端规范
        {
          text: '前端规范',
          items: [
            {
              text: '安装',
              link: '/guide/lint/installation',
            },
            {
              text: '快速开始(TS配置)',
              link: '/guide/lint/quickstart',
            },
            {
              text: 'eslint集成',
              link: '/guide/lint/eslintPage',
            },
            {
              text: 'prettier集成',
              link: '/guide/lint/prettierPage',
            },
            {
              text: 'ls-lint集成',
              link: '/guide/lint/lsLintPage',
            },
            {
              text: 'stylelint集成',
              link: '/guide/lint/stylelintPage',
            },
            {
              text: 'postcss集成',
              link: '/guide/lint/postcssPage',
            },
            {
              text: 'rimraf快速删除包依赖集成',
              link: '/guide/lint/rimrafPage',
            },
            {
              text: 'git hook拦截commit',
              link: '/guide/lint/huskyPage',
            },
            {
              text: 'commitizen消息助手',
              link: '/guide/lint/commitizenPage',
            },
            {
              text: 'changelog 生成版本记录',
              link: '/guide/lint/changelogPage',
            },
          ],
        },
        // Vite配置
        {
          text: 'Vite配置',
          items: [
            {
              text: '共享选项',
              link: '/guide/vite/',
              items: [
                { text: 'defineConfig函数支持 ts 补全', link: '/guide/vite/common/defineConfig' },
                { text: 'loadEnv 源码分析', link: '/guide/vite/common/loadEnv' },
              ],
            },
          ],
        },
        // Vue
        {
          text: 'Vue',
          items: [
            {
              text: 'VueAPI',
              link: '/guide/Vue/api/',
              items: [
                { text: 'ref', link: '/guide/Vue/api/ref' },
                { text: 'reactive', link: '/guide/Vue/api/reactive' },
              ],
            },
            {
              text: 'Vue Hooks',
              link: '/guide/Vue/hooks/',
              items: [{ text: 'demohook', link: '/guide/Vue/hooks/demohook' }],
            },
          ],
        },
        // Http
        {
          text: 'Http',
          items: [
            {
              text: 'http基础',
              link: '/guide/http/',
              items: [{ text: 'httpcode', link: '/guide/http/bases/demo' }],
            },
            {
              text: 'axios',
              link: '/guide/http/axios/',
              items: [{ text: 'TS封装axios', link: '/guide/http/axios/demo' }],
            },
            {
              text: 'http缓存',
              link: '/guide/http/cache/',
              items: [{ text: 'http缓存', link: '/guide/http/cache/demo' }],
            },
            {
              text: 'fetch',
              link: '/guide/http/fetch/',
              items: [{ text: 'fetch', link: '/guide/http/fetch/demo' }],
            },
            {
              text: 'graphQL',
              link: '/guide/http/graphQL/',
              items: [{ text: 'graphQL', link: '/guide/http/graphQL/demo' }],
            },
            {
              text: 'apifox使用',
              link: '/guide/http/apifox/',
              items: [{ text: 'apifox', link: '/guide/http/apifox/demo' }],
            },
          ],
        },
        // node
        {
          text: 'Node',
          items: [
            {
              text: '常用API',
              link: '/guide/node/process/',
              items: [{ text: 'process', link: '/guide/node/api/process' }],
            },
            {
              text: '实用方法',
              link: '/guide/node/methods/',
              items: [{ text: 'methods', link: '/guide/node/methods/fileOpreate' }],
            },
            {
              text: 'egg',
              link: '/guide/node/egg/',
              items: [{ text: 'eggdemo', link: '/guide/node/egg/demo' }],
            },
            {
              text: 'Nest',
              link: '/guide/node/Nest/',
              items: [{ text: 'Nestdemo', link: '/guide/node/Nest/demo' }],
            },
          ],
        },
        // 包管理器
        {
          text: '包管理器',
          items: [
            {
              text: 'npm',
              link: '/guide/package/npm/',
              items: [{ text: 'npm的安装和缓存机制', link: '/guide/package/npm/installAndCAche' }],
            },
            {
              text: 'yarn',
              link: '/guide/package/yarn/',
              items: [{ text: 'yarn的安装和缓存机制', link: '/guide/package/npm/' }],
            },
            {
              text: 'pnpm',
              link: '/guide/package/pnpm/',
              items: [{ text: 'pnpm的安装和缓存机制', link: '/guide/package/npm/' }],
            },
          ],
        },
      ],
      '/examples/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Button按钮',
              link: '/examples/button/',
            },
            {
              text: 'Icon图标',
              link: '/examples/Icon/',
            },
          ],
        },
      ],
    },
  },
}
