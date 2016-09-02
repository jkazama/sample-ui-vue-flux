/*----------------------------------
 - app.js -
 SPA Entry File
----------------------------------*/

// Vue / Vue Routing
import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

// Register Global Event
window.EventEmitter = new Vue()

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// Vue Custom Filter
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Application Initialize
import App from 'App.vue'
new Vue({
  router,
  template: '<App ref="app" />',
  components: {
    'App': App
  }
}).$mount('#app')