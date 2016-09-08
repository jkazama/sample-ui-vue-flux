import * as types from 'store/mutation-types'

const state = {
  message: {
    global: null,
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