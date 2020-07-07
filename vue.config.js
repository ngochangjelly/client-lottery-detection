module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
    }
  },
  devServer: {
    watchOptions: {
      poll: true
    },
    host: 'localhost',
    clientLogLevel: 'info'
  }
}