import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import CameraIcon from 'vue-material-design-icons/CameraPlus.vue';

Vue.component('camera-icon', CameraIcon);
Vue.use(vuetify)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
