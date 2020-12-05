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
    regist() {
      var result = this.mockRegist(this.players);
      console.log(result);

      this.$store.dispatch("updateGameId", result.game_id);
      this.$store.dispatch("updatePlayers", result.players);
      console.log(this.$store.getters.getPlayers);

      this.$router.push({ name: 'ConfirmRole', params: { gameId: result.game_id }})
    },
    mockRegist(players) {
      players.forEach(function(player, index) {
        player.id = index + 1;

        player.role = 'common';
        if (index === 1) {
          player.role = 'master';
        } else if (index === 3) {
          player.role = 'insider';
        }

        players[index] = player;
      });

      return {
        game_id: 444,
        players: players
      }
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
