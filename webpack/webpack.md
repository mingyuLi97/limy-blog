#### 基础打包语法

`src`：存储项目开发的源文件

`dist`：打包后的文件目录

从第四代开始，可以支持零配置，也可以自定义配置

## 自定义规则配置

1. 如果配置多套webpack，在 package.json 中设置脚本 --config 后面添加需要执行的文件名

```json
  "scripts": {
    "build": "webpack --config webpack.config.development.js" 
  }
```

2. webpack-dev-server

```shell
npm i webpack-dev-server -D
```

3. Html-webpack-plugin

```shell
npm i html-webpack-plugi -D
```

4. Css loader

```shell
npm i style-loader css-loader autoprefixer postcss-loader -D
```

5. 抽离 css

```shell
npm i mini-css-extract-plugin -D	
```

6. 压缩 css

```shell
npm i optimize-css-assets-webpack-plugin -D
```

7. 压缩 js

```shell
npm i uglifyjs-webpack-plugin -D
```

8. 基于babel 实现ES6的转换和 ESLint 语法检测

```shell
npm i babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-transform-runtime -D

npm i @babel/runtime @babel/polyfill -S	// 线上项目运行时需要的支持
```

9. 全局暴露变量

```shell
npm i expose-loader -D
```

10. 处理图片

```
npm i html-withimg-loader -D
```

