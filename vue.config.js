module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
    }
  },
  devServer: {
    proxy: {
      "*": {
        target: process.env.VUE_APP_ROOT_API,
        secure: false
      }
    },
    watchOptions: {
      poll: true
    },
    host: 'localhost',
    clientLogLevel: 'info'
  }
}