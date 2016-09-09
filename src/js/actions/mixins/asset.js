import api from "actions/api/asset"
import * as types from "store/mutation-types"
// Store との連携があればこちらで記述
export default {
  methods: {
    withdraw(data, success, failure) {
      api.withdraw(data, (v) => {
        this.refreshAsset(this.$store)
        success(v)
      }, failure)
    },
    findUnprocessedOut(data, success, failure) {
      api.findUnprocessedOut(data, success, failure)
    },
    refreshAsset() {
      const asset = {} //low: API経由で資産系サマリの再取得を行う
      this.$store.commit(types.UPDATE_ASSET, asset)
    },
    // リフレッシュイベント登録をします low: リークをしないか確認
    onRefreshAsset(listener) {
      this.$store.subscribe(mutation => {
        if (mutation.type === types.UPDATE_ASSET) listener(mutation)
      })
    }
  }
}