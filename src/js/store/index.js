import Vue from 'vue'
import Vuex from 'vuex'

import context from 'store/modules/context'
import asset from 'store/modules/asset'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    context,
    asset
  },
  strict: debug
})
export default store