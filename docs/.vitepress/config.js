export default {
  themeConfig: {
    siteTitle: false,
    logo: '/assets/icon/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/examples/button/' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Henrycheheng' }],
    sidebar: {
      '/guide/': [
        {
          text: '前端规范',
          items: [
            {
              text: '安装',
              link: '/guide/installation',
            },
            {
              text: '快速开始(TS配置)',
              link: '/guide/quickstart',
            },
            {
              text: 'eslint集成',
              link: '/guide/eslintPage',
            },
            {
              text: 'prettier集成',
              link: '/guide/prettierPage',
            },
            {
              text: 'ls-lint集成',
              link: '/guide/lsLintPage',
            },
            {
              text: 'stylelint集成',
              link: '/guide/stylelintPage',
            },
            {
              text: 'postcss集成',
              link: '/guide/postcssPage',
            },
          ],
        },
        {
          text: '进阶',
          items: [
            {
              text: 'xx',
              link: '/xx',
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
