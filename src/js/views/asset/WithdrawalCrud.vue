<template lang="pug">
.l-withdrawal-crud
  Message(global=true)
  .row.l-row
    .col-md-4
      InputText(field="absAmount", placeholder="出金金額", suffix="円",
        v-model="item.absAmount", :updating="updating", :enter="register")
    .col-md-2
      CommandButton(@click.native="register", :updating="updating") 依頼する
  .row.l-row
    .col-md-12
      .alert.alert-warning 出金依頼に関わる注記文言を記載。動作確認用サンプルなので導線なり重複依頼はルーズに。
</template>

<script lang="babel">
import ViewCrud from "views/mixins/view-crud"
import api from 'api/asset'
import * as types from 'store/mutation-types'
export default {
  mixins: [ViewCrud],
  data() {
    return {
      item: {
        absAmount: ""
      }
    }
  },
  methods: {
    registerData() {
      this.item.currency = "JPY"
      return this.item
    },
    registerAction(param, success, failure) {
      api.withdraw(param, (v) => {
        this.commitStore(types.UPDATE_ASSET)
        this.clear() // 入力情報の初期化
        success(v, '依頼を受け付けました')
      }, failure)
    }
  }
}
</script>