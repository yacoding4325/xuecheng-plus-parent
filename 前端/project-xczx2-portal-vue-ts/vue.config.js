module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: process.env.VUE_APP_CLIENT_MANAGE_PORT,
    open: false,
	disableHostCheck: true,
    // overlay: {
    // 	warnings: false,
    // 	errors: true,
    // },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_API_URL,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // pwa: {
  //   name: name
  // },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [
  //       path.resolve(__dirname, 'src/styles/_variables.scss'),
  //       path.resolve(__dirname, 'src/styles/_mixins.scss')
  //     ]
  //   }
  // },
  // chainWebpack(config) {
  // 	// Provide the app's title in webpack's name field, so that
  // 	// it can be accessed in index.html to inject the correct title.
  // 	config.set('name', name);
  // },
}
