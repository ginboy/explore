const presets = [];
const plugins = [
  //配置vant的按需引入，babel-plugin-import 是一款 babel 插件
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "lib",
      style: true
    },
    "vant"
  ]
];
module.exports = {
  plugins,
  presets
};
