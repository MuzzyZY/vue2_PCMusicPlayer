const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: {
  //     '/': {
  //       ws: false,
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/login': '/login'
  //       }
  //     }
  //   }
  // }
})
