import Param from 'variables'
import {Level, Event, Action} from 'constants'
import * as Lib from 'platform/plain'
import Vue from 'vue'

import ViewBasic from 'views/mixins/view-basic'

/**
 * 特定情報の登録/変更/削除を前提とした Vue Mixin。
 * 情報に対するCRUD目的のパネルで利用してください。
 * 本クラスを利用する際は初期化時に以下の設定が必要です。
 * ・path属性の定義
 * ---
 * - Props -
 * autoFlattenItem: 更新時に与えたitemをflattenItem(ネストさせないオブジェクト化)とするか
 * path: CRUD-API基準パス(必須)。
 *   pathが「/hoge/」の時。 登録時: /hoge/, 更新時: /hoge/{idPath}/, 削除時: /hoge/{idPath}/delete
 * - Data -
 * updateFlag: 更新モードの時はtrue
 * updating: 処理中の時はtrue
 * item: 登録/更新情報
 * actionSuccessKey: 処理成功時に $emit されるイベントキー
 * actionFailureKey: 処理失敗時に $emit されるイベントキー
 * - 標準API
 * register: 登録/変更します
 * registerData: 登録/変更情報をハッシュで生成します
 * registerPath: 登録先パスを生成します
 * updatePath: 変更先パスを生成します
 * deletePath: 削除先パスを生成します
 * actionSuccess: 成功時のイベント処理
 * actionSuccessMessage: 登録/変更/削除時の表示文言
 * actionFailure: 失敗時のイベント処理
 */
export default {
  data() {
    return {
      item: {},          // 更新対象情報
      updating: false    // 処理中判定
    }
  },
  props: {
    autoFlattenItem: {type: Boolean, default: false}
  },
  mixins: [ViewBasic],
  components: {},
  created() {
    this.clear()
  },
  methods: {
    // 登録/変更処理を行います。
    // 実行時の接続URLは前述のattributes解説を参照。実際の呼び出しはregisterPath/updatePathの値を利用。
    // 登録情報はregisterDataに依存します。
    // 登録成功時の後処理はactionSuccessAfter、失敗時の後処理はactionFailureAfterを実装する事で差し込み可能です。
    register(event) {
      let param = this.registerData()
      if (0 < Object.keys(param).length) Lib.Log.debug(param)
      this.updating = true
      let success = (v, message) => {
        this.updating = false
        this.actionSuccess(v, message)
      }
      let failure = (error) => {
        this.updating = false
        this.actionFailure(error)
      }
      this.registerAction(param, success, failure)
    },
    // 各種メッセージの他、登録情報を初期化します
    clear() {
      this.clearMessage()
      Object.keys(this.item).forEach((k) => this.item[k] = null)
    },
    registerAction(item, success, failure) {
      Lib.Log.error('利用先でメソッドを実装してください [registerAction]')
    },
    // 登録/変更情報をハッシュで返します。
    // 標準ではitemの値をコピーして返します。
    registerData() {
      let data = _.clone(this.item)
      Object.keys(data).forEach((k) => {
        if (typeof data[k] === 'object') data[k] = null
      })
      return data
    },
    commitStore(type) {
      this.$store.commit(type)
    }
  }
}