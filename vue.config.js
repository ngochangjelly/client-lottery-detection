module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? "client-lottery-detection" : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        // prependData: `@import "@/scss/_variables.scss"; @import "@/scss/_mixins.scss";`
      }
    }
  }
}