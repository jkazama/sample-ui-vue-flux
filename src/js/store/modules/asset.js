import * as types from 'store/mutation-types'

const state = {
  asset: {}
}
const mutations = {
  [types.UPDATE_ASSET] (state, list) {
    //low: 残高や出金可能金額等の更新
  }
}
export default { state, mutations }