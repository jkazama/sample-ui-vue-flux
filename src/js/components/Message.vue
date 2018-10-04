<!-- 
- Message.vue -
エラーメッセージ表示機能を提供する Vue コンポーネント。
グローバルイベントで通知された内容を表示します。

[template]
Message(global=true)
Message(global=true, globalKey=anyEventKey)
Message(field=anyMessageKey)
  <input type="text" …
-->
<style lang="scss">
.l-message-global {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1;
}
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<template lang="pug">
div
  div(v-if="global && message")
    transition(v-if="notification", name="fade")
      .l-message-global
        .alert.p-2(:class="[classAlert, classText]")
          i.fas.fa-exclamation-triangle
          | &nbsp;{{message}}
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
      classText: null,
      notification: false,
    }
  },
  props: {
    // グローバル例外表示フラグ
    global: {type: Boolean, default: false},
    // グローバル例外識別キー
    globalKey: {type: String, default: null},
    // フィールド例外表示キー (グローバル例外表示フラグが false 時に有効)
    field: {type: String},
    // グローバル例外表示期間（msec）
    showTime: {type: Number, default: 2000},
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
      this.notification = false
      var message = msg.message
      message = Array.isArray(message) ? message[0] : message
      let valid = this.globalKey ? this.globalKey === msg.messageKey : true
      if (message && valid) {
        let type = this.messageType(msg.level)
        this.classAlert = `alert-${type}`
        this.classText = null
        this.notification = true
        setTimeout(() => this.notification = false, this.showTime)
        return message
      } else {
        this.classAlert = null
        this.classText = null
        return null
      }
    },
    columnMessage(columns) {
      if (columns && 0 < columns.length) {
        let column = Array.from(columns).find((v) => v.key === this.field)
        let type = this.messageType(column.level)
        this.classText = `text-${type}`
        return column ? column.messages[0] : null
      }
      return null
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
    }
  }
}
</script>
