<template>
  <div class="confirm-role">
    <ul>
      <li v-for="player in players">
        {{ player }}
      </li>
    </ul>
    <div class="btn-container" v-if="isHost">
      <router-link :to="{ name: 'WhatSecretWord', query: { gameId: gameId }}">START</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhatSecretWord',
  data() {
    return {
      players: [],
      gameId: 0,
      websocket: {},
      isHost: false
    };
  },
  mounted() {
    this.websocket = this.$store.getters.getWebSocket;

    this.players.push(this.$route.query.name);
    this.isHost = this.$store.getters.getIsHost;

    this.websocket.onmessage = this.receiveResponse;
  },
  methods: {
    receiveResponse(event) {
      let response = JSON.parse(event.data);

      if (this.isHost && response.action == "setname") {
        this.players.push(response.name);
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
