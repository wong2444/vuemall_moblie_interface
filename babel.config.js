const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(`transform-remove-console`)// 清理代碼中的console log
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],

  plugins:[...prodPlugins,'@babel/plugin-syntax-dynamic-import']// 路由懶加載
}
