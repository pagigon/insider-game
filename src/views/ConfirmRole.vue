<template>
  <div class="confirm-role">
    <ul>
      <li v-for="(player, index) in players">
        {{ player.name }}
        <button type="submit" class="btn btn-primary" v-on:click="displayRole(index)">かくにん</button>
      </li>
    </ul>
    <div class="btn-container">
      <router-link :to="{ name: 'Battle', params: { gameId: gameId }}">OK</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'CopnfirmRole',
  data() {
    return {
      players: [],
      gameId: 0
    };
  },
  mounted() {
    console.log(2);
    this.loadPlayers();
  },
  methods: {
    async loadPlayers() {
      const gameId = this.$route.query.gameId;

      await axios
        .get(
          "https://6rdb8uj2l8.execute-api.ap-northeast-1.amazonaws.com/dev/confirm?gameId=" + gameId
        )
        .then(res => {
          res.data.body.players.forEach(player => {
            this.players.push(player);
          })
          this.gameId = gameId;
        })
        .catch(() => {
          alert("通信に失敗しました。ページをリロードしてください。");
        });
    },
    displayRole(index) {
      let rolesRuby = {
        'common': "市民",
        'master': "マスター",
        'insider': "インサイダー"
      };

      let theme = '';
      if (this.players[index].role === 'master' || this.players[index].role === 'insider') {
        theme = 'テーマは「' + this.players[index].theme + '」です。';
      }

      alert(
        this.players[index].name + "は「" + rolesRuby[this.players[index].role] + "」です。" + theme
      );
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
