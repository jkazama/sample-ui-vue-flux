import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

import context from 'store/modules/context'
import asset from 'store/modules/asset'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger] : []
const store = new Vuex.Store({
  modules: {
    context,
    asset
  },
  plugins: plugins,
  strict: debug
})
export default store