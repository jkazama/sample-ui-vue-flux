import * as types from 'store/mutation-types'

const state = {
  // メッセージ
  message: {
    // 汎用グローバルメッセージ [message: string, level: Level]
    global: null,
    // カラムスコープのメッセージ一覧 [key: string, level: Level, messages: array]
    columns: []
  }
}
const mutations = {
  [types.UPDATE_MESSAGE_GLOBAL] (state, message) {
    state.message.global = message
  },
  [types.UPDATE_MESSAGE_COLUMNS] (state, columns) {
    state.message.columns = columns
  }
}
export default { state, mutations }