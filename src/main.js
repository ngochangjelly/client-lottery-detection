import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import CameraIcon from 'vue-material-design-icons/CameraPlus.vue';

Vue.component('camera-icon', CameraIcon);
Vue.config.productionTip = false
Vue.use(vuetify)

const getRuntimeConfig = async () => {
  const runtimeConfig = await fetch('/runtimeConfig.json');
  return await runtimeConfig.json()
}
getRuntimeConfig().then(function (json) {
  const appConfig = {
    API: {
      endpoints: [
        {
          name: "local",
          endpoint: json.LOCAL_API_ENDPOINT
        },
        {
          name: "production",
          endpoint: json.PRODUCTION_API_ENPOINT
        }
      ]
    }
  }
  console.log(appConfig)
  console.log("Runtime config: " + JSON.stringify(json))
  Vue.mixin({
    data() {
      return {
        // Distribute runtime configs into every Vue component
        LOCAL_API_ENDPOINT: json.LOCAL_API_ENDPOINT,
        PRODUCTION_API_ENPOINT: json.PRODUCTION_API_ENPOINT,
      }
    },
  });
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
