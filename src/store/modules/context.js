export default {
  namespaced: true,
  state: {
    // メッセージ
    message: {
      // 汎用グローバルメッセージ [message: string, level: Level]
      global: null,
      // カラムスコープのメッセージ一覧 [key: string, level: Level, messages: array]
      columns: [],
    }
  },
  mutations: {
    updateMessageGlobal(state, message) {
      state.message.global = message
    },
    updateMessageColumns(state, columns) {
      state.message.columns = columns
    }
  },
}
