import * as types from 'store/mutation-types'

const state = {
  // 資産 (例: 残高や出金可能金額 等、コンポーネント横断的に保持したい資産情報 )
  asset: {}
}
const mutations = {
  [types.UPDATE_ASSET] (state, asset) {
    //low: 残高や出金可能金額等の更新
    state.asset = asset
  }
}
export default { state, mutations }