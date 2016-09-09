<!-- 
- Message.vue -
エラーメッセージ表示機能を提供する Vue コンポーネント。
グローバルイベント(Event.Messages)で通知された内容を表示します。

[template]
Message(global=true)
Message(field=anyMessageKey)
  <input type="text" …
-->
<style lang="sass">
.l-message-group {
  display: block;
  input, textarea, select {
    border-color: #ed4c4c;
    background-color: #f6e3e3;
  }
  .l-message-group-item {
    font-size: 80%;
    padding: .2em;
    margin-bottom: .2em;
  }
}
</style>

<template lang="pug">
div
  div(v-if="global")
    .alert(:class="[classAlert, classText]" v-text="message" v-if="message")
  div(v-if="!global")
    div(:class="{'input-group': message, 'l-message-group': message}")
      slot
      .l-message-group-item(:class="[classText]" v-text="message" v-if="message")
</template>

<script lang="babel">
import {Level} from 'constants'
export default {
  name: 'message',
  data() {
    return {
      classAlert: null,
      classText: null
    }
  },
  props: {
    // グローバルレイアウト表示フラグ
    global: {type: Boolean, default: false},
    // フィールド表示キー (グローバル例外表示フラグが false 時に有効)
    field: {type: String}
  },
  computed: {
    message() {
      if (this.global) {
        return this.globalMessage(this.$store.state.context.message.global)
      } else {
        return this.columnMessage(this.$store.state.context.message.columns)
      }
    }
  },
  methods: {
    globalMessage(msg) {
      if (msg) {
        let type = this.messageType(msg.level)
        this.classAlert = `alert-${type}`
        this.classText = `text-${type}`
      } else {
        this.classAlert = null
        this.classText = null
      }
      return msg ? msg.message : null
    },
    messageType(level) {
      switch (level) {
        case Level.INFO:
          return "success"
        case Level.WARN:
          return "warning"
        case Level.ERROR:
          return "danger"
        default:
          return "default"
      }
    },
    columnMessage(columns) {
      if (columns && 0 < columns.length) {
        let column = Array.from(columns).find((v) => v.key === this.field)
        let type = this.messageType(column.level)
        this.classText = `text-${type}`
        return column ? column.messages[0] : null
      } else {
        this.classText = null
        return null
      }
    }
  }
}
</script>