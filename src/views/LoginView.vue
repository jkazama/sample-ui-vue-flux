<template>
<div class="row justify-content-center">
  <div class="col-md-4">
    <div class="card.m-2">
      <div class="card-body">
        <div class="card-title p-1">
          <h5>ログインフォーム</h5>
        </div>
        <div class="card-text">
          <div class="mb-2">
            <input-text class="mb-2" placeholder="ログインID" v-model="loginId" @enter="login" />
          </div>
          <div class="mb-2">
            <input-text placeholder="パスワード" v-model="password" :password=true @enter="login" />
          </div>
          <div class="mb-2">
            <command-button class="btn-primary" @click="login" :updating="updating">
              <font-awesome-icon icon="sign-in-alt" /> ログイン
            </command-button>
          </div>
        </div>
        <div class="alert alert-warning small p-2">サーバ側（サンプル実装版）の認証モードを有効にした時は sample/sample でログインしてください。</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Level } from "@/enums";
import { Log, Session } from "@/platform/plain";
import ViewBasic from "@/views/mixins/view-basic";
export default {
  name: 'login-view',
  mixins: [ ViewBasic ],
  data() {
    return {
      loginId: "",
      password: "",
    }
  },
  methods: {
    login() {
      Log.debug(this.loginId);
      this.updating = true;
      const success = (ret) => {
        this.updating = false;
        Log.debug("ログインに成功しました - ");
        this.forward();
      }
      const failure = (error) => {
        this.updating = false;
        switch (error.response.status) {
          case 400:
            this.messageError("IDまたはパスワードに誤りがあります", [], Level.WARN);
            break;
          default:
            this.messageError("要求処理に失敗しました");
        }
      }
      this.doLogin({loginId: this.loginId, password: this.password}, success, failure);
    },
    forward() {
      this.loginAccount(v => {
        Session.login(v);
        this.$router.push("/asset");
      });
    }    
  }
}
</script>
