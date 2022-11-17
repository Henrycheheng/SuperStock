// webpack.config.js
const webpack = require('webpack')
const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/js/index.js',
  // 输出
  output: {
    // 输入路径
    path: resolve(__dirname, 'dist'),
    // 输出文件名
    // filename: 'built.js',
    filename: 'js/[name].[contenthash:10].js',
    // 资源文件地址
    assetModuleFilename: 'images/[hash:10][ext][query]',
  },
  module: {
    /*
      语法检查： eslint-loader  eslint
        注意：只检查自己写的源代码，第三方的库是不用检查的
        设置检查规则：
          package.json中eslintConfig中设置~
            "eslintConfig": {
              "extends": "airbnb-base"
            }
          airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
    */
    rules: [
      {
        test: /\.css$/i,
        use: [
          // "style-loader",
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          // postcss的插件 css兼容性处理
          // 在postcss.config.js 中
          // module.exports = {
          //   plugins: [
          //     //使用postcss插件
          //     require("postcss-preset-env"),
          //   ],
          // };
          // 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
          // "browserslist": {
          //   // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
          //   "development": [
          //     "last 1 chrome version",
          //     "last 1 firefox version",
          //     "last 1 safari version"
          //   ],
          //   // 生产环境：默认是看生产环境
          //   "production": [
          //     ">0.2%",
          //     "not dead",
          //     "not op_mini all"
          //   ]
          // }
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSSF
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg)$/i,
        type: 'asset/inline', // 替代url-loader
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource', // 替代file-loader
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        // parser: {
        //   dataUrlCondition: {
        //     // 图片大小小于10kb，就会被base64处理
        //     maxSize: 10 * 1024, // 10kb
        //   },
        // },
      },
      {
        test: /\.html$/i,
        // 处理html文件的img图片
        loader: 'html-withimg-loader',
        options: {
          esModule: false,
        },
      },
      /*
        js兼容性处理：babel-loader @babel/core
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2 // 进程2个
          //   }
          // },
          {
            loader: 'babel-loader',
            options: {
              // 自动修复eslint的错误
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定core-js版本
                    corejs: {
                      version: 3,
                    },
                    // 指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17',
                    },
                  },
                ],
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  plugins: [
    // webpack 的 output.path 目录中的所有文件将被删除一次，但目录本身不会
    // 如果使用 webpack 4+ 的默认配置，<PROJECT_DIR>/dist/ 下的所有内容都将被删除。
    new CleanWebpackPlugin(),
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/boundle.css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
    new webpack.ProgressPlugin(),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
      publicPath: './',
    }),
  ],
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        }
      }*/
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimize: true,
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启多进程打包
        parallel: true,
      }),
    ],
  },
  // externals: {
  //   // 拒绝jQuery被打包进来
  //   jquery: 'jQuery'
  // },

  // 生产环境下会自动压缩js代码
  mode: 'production',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
  // devServer
  devServer: {
    // contentBase: resolve(__dirname, 'dist'),
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true,
    compress: false,
    // 端口号
    port: 3001,
    // 域名
    host: 'localhost',
    open: true,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  performance: {
    // 入口起点的最大体积，这个参数代表入口加载时候最大体积，将其改为了1M，
    maxEntrypointSize: 1000000,
    // 此选项根据单个资源体积，控制 webpack 何时生成性能提示，自己将其改成了1M
    maxAssetSize: 1000000,
    // 属性允许 webpack 控制用于计算性能提示的文件，通过覆盖原有属性，将其改成只对js文件进行性能测试。
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    },
  },
  devtool: 'eval-source-map',
}
/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置
      只能精确的行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
*/
