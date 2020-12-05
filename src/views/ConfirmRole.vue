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
export default {
  name: 'CopnfirmRole',
  data() {
    return {
      players: [],
      gameId: 0
    };
  },
  mounted() {
    this.players = this.$store.getters.getPlayers;
    this.gameId = this.$store.getters.getGameId;
    console.log(this.players);
  },
  methods: {
    displayRole(index) {
      let rolesRuby = {
        'common': "市民",
        'master': "マスター",
        'insider': "インサイダー"
      };

      alert(
        this.players[index].name + "は「" + rolesRuby[this.players[index].role] + "」です"
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
