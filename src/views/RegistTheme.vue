<template>
  <div class="regist-player">
    <label>追加するワード : </label>
    <input v-model="word" placeholder="Word">
    <button class="btn btn-primary" v-on:click="regist()">送信</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegistTheme',
  data() {
    return {
      word: ''
    }
  },
  methods: {
    async regist() {
      await axios
        .post(
          "https://v11izvxekf.execute-api.ap-northeast-1.amazonaws.com/prod/addTheme",
          {
            theme: this.word
          }
        )
        .then(res => {
          alert(res.data.body.id + "番目に追加されました！");
        })
        .catch(() => {
          alert("通信に失敗しました。");
        });
    }
  }
}
</script>
