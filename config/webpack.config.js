const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"), // 入口
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "./js/[name].[chunkhash].js"
  },
  mode: "development",
  devServer: {
    hot: true, //模块的热替换
    open: true, // 编译结束后自动打开浏览器
    port: 8080, // 设置本地端口号
    host: "localhost" //设置本地url
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", //用来做模板的html的文件路径
      filename: "index.html", //生成的html的名字
      title: "webpack5的项目配置", //这个就对应上文的title
      inject: "body" //打包出来的那个js文件，放置在生成的body标签内
    })
  ]
};
