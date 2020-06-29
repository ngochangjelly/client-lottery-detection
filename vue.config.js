module.exports = {
  publicPath: '',
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