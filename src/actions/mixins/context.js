import { Level } from '@/enums'
import { Log } from "@/platform/plain"
import api from "@/actions/api/context"
import * as types from "@/store/mutation-types"
// Store との連携があればこちらで記述
export default {
  methods: {
    // メッセージを通知します。
    message(globalMessage = null, columns = [], level = Level.INFO) {
      if (globalMessage) Log.debug(globalMessage)
      this.$store.commit(types.UPDATE_MESSAGE_GLOBAL,
        { message: globalMessage, messageKey: this.componentName(), level: level })
      this.$store.commit(types.UPDATE_MESSAGE_COLUMNS, columns)
    },
    // エラーメッセージを通知します。
    messageError(globalMessage, columnMessages = [], level = Level.ERROR) {
      this.message(globalMessage, columnMessages, level)
    },
    doLogin(data, success, failure) {
      api.login(data, success, failure)
    },
    doLogout() {
      api.logout()
    },
    loginStatus(success, failure) {
      api.loginStatus(success, failure)
    },
    loginAccount(success) {
      api.loginAccount(success)
    }
  }
}