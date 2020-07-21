/**
 * 在这个文件中设置我们自定义的打包规则
 * webpack 基于 nodejs 开发 因此需要遵循 commonjs 规范
 */

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
let UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin")
let Webpack = require("webpack")


module.exports = {
    // production development 默认是生产环境 
    mode: 'production',
    // 入口
    entry: './src/index.js',
    output: {
        // [hash] 让每一次生成的文件都带有hash值 这样可以防止文件缓存
        filename: 'main.min.[hash].js', // 'js/main.min.[hash].js'
        // 输出的目录必须是一个绝对路径 path
        // resolve 可以生一个绝对路径  __dirname 当前目录
        path: path.resolve(__dirname, 'build'),
        // 给编译后引用资源地址前面设置前缀
        publicPath: './'
    },
    devServer: {
        port: 3000, // 创建服务指定的端口号
        progress: true, //显示编译进度
        contentBase: './build', // 指定当前服务处理资源的目录
        open: true, // 编译完成后自动打开浏览器
    },
    // 设置优化规则
    optimization: {
        // 压缩优化
        minimizer: [
            // 压缩 css (当自定义压缩规则后 js 执行时不再默认压缩方式而是走这个插件，导致无法压缩)
            new OptimizeCssAssetsWebpackPlugin(),
            // 压缩 js
            new UglifyJsWebpackPlugin({
                cache: true, // 是否使用缓存
                parallel: true, // 是否启用并发编译，同时编译多个js
                sourceMap: true, // 启动源码映射 （方便调试）
            })
        ]
    },
    // 使用插件 数组
    plugins: [
        new HtmlWebpackPlugin({ // 能够自动将编译好的js引入到编译后的html
            template: './src/index.html', // 指定所需要编译的 html，如果不写则会用 webpack 默认的
            filename: 'index.html', // 输出的文件名
            // 如果多次调用 get 请求会产生缓存，
            // 所以我们使用 hash 每次请求都会在js后加上一个HASH戳 main.js?xxxxxxxxx
            // hash: true,
            minify: { // 控制 html 压缩规则
                collapseWhitespace: true, // 删除空格
                removeComments: true, // 删除注释
                removeAttributeQuotes: true, // 一些属性的双引号
                removeEmptyAttributes: true // 空属性
            }

        }),
        new MiniCssExtractPlugin({
            filename: 'index.min.css', //'css/index.min.css'

        }),
        // 全局暴露 $ 前提 npm i expose-loader -D
        new Webpack.ProvidePlugin({
            '$': 'jquery'
        })
    ],
    // 加载器 loader
    module: {
        rules: [{
                test: /\.(css|less)$/, // 基于正则匹配处理哪些文件
                use: [ // 控制使用什么加载器 loader 有顺序的：从右到左执行
                    // "style-loader", // 编译好的 css 插入到页面的 HEAD 中（内嵌式样式）
                    MiniCssExtractPlugin.loader, // 这里将css抽离 不使用内嵌式
                    "css-loader", // 编译 @import / url() 这种语法
                    "postcss-loader", // 设置前缀
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         ident: 'postcss',
                    //         plugins: [
                    //             require('autoprefixer')
                    //         ]
                    //     }
                    // },
                    // "less-loader"    
                    { //  倒入有两种方法 字符串或者对象 
                        loader: "less-loader",
                        options: {}
                    },

                ],
            },
            {
                rules: [{
                    test: /\.js$/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            // ES6 => ES5
                            presets: [
                                "@babel/preset-env"
                            ],
                            // 基于处理 ES6 ES7 中 class 的特殊语法
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {
                                    "legacy": true
                                }],
                                ["@babel/plugin-proposal-class-properties", {
                                    "loose": true
                                }],
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }],
                    // 指定忽略的目录 需要编译的目录
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, "src")
                }]
            },
            { // 图片处理 
                test: /\.(png|jpg|jpeg|gif)$/,
                // use: [{
                //     loader: "file-loader",
                //     options: {
                //         esModule: false
                //     }
                // }]
                use: [{
                    loader: "url-loader",
                    options: {
                        // 当图片的大小小于 200kb，在处理的时候返回 BASE64
                        limit: 200 * 1024,
                        esModule: false,
                        outputPath: 'images'
                    }
                }]
            },
            { // 处理 HTML 文件中导入的 IMG
                test: /\.(html|htm|xml)$/,
                use: ["html-withimg-loader"]
            }
        ]
    }
}