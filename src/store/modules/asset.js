export default {
  namespaced: true,
  state() {
    return {
      // 資産 (例: 残高や出金可能金額 等、コンポーネント横断的に保持したい資産情報 )
      asset: {}
    }
  },
  mutations: {
    update(state, asset) {
      state.asset = asset
    },
  },
}
