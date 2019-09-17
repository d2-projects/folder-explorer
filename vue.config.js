// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // 重新设置 alias
    config.resolve.alias
      .set('@root', resolve(''))
  }
}
