<template>
  <div class="regist-player">
    <ul>
      <li v-for="(player, index) in players">
        <label>Player {{ index }} : </label>
        <input v-model="player.name" placeholder="Name">
      </li>
    </ul>
    <div class="btn-container">
      <button class="btn btn-primary" v-on:click="addPlayer()">追加</button>
      <button class="btn btn-primary" v-on:click="regist()">送信</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RegistPlayer',
  data() {
    return {
      players: [
        { name: ''},
        { name: ''},
        { name: ''},
        { name: ''},
      ],
    }
  },
  methods: {
    addPlayer() {
      this.players.push({ name: ''});
    },
    async regist() {
      let postData = [];
      this.players.forEach(player =>{
        postData.push(player.name);
      })

      await axios
        .post(
          "https://v11izvxekf.execute-api.ap-northeast-1.amazonaws.com/prod/regist",
          {
            players: postData
          }
        )
        .then(res => {
          this.$store.dispatch("updateGameId", res.data.body.gameId);

          this.$router.push({ name: 'ConfirmRole', query: { gameId: res.data.body.gameId }})
        })
        .catch(() => {
          alert("通信に失敗しました。");
        });
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
