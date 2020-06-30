module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "@/scss/_variables.scss"; @import "@/scss/_mixins.scss";`
      }
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