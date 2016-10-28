<template lang="pug">
.l-withdrawal-crud
  Message(global=true, globalKey="WithdrawalCrud")
  .row.l-row
    .col-md-4
      InputText(field="absAmount", placeholder="出金金額", suffix="円", suffixType="text",
        v-model="item.absAmount", :updating="updating", @enter="register")
    .col-md-2
      CommandButton(@click="register", :updating="updating") 依頼する
  .row.l-row
    .col-md-12
      .alert.alert-warning 出金依頼に関わる注記文言を記載。動作確認用サンプルなので導線なり重複依頼はルーズに。
</template>

<script lang="babel">
import ViewCrud from "views/mixins/view-crud"
import ActionsAsset from "actions/mixins/asset"
export default {
  mixins: [ViewCrud, ActionsAsset],
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
    action(param, success, failure) {
      this.withdraw(param, (v) => {
        this.clear() // 入力情報の初期化
        success(v, '依頼を受け付けました')
      }, failure)
    }
  }
}
</script>