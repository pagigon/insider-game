<template>
  <div>
    <div>
      <input v-model=url readonly>
      <button type="button" @click="doCopy">Copy!</button>
    </div>
    <ul>
      <li v-for="player in players">
        {{ player }}
      </li>
    </ul>
    <div class="btn-container" v-if="isHost">
      <button class="btn btn-primary" v-on:click="startGame()">START</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaitPlayers',
  props: {
    name: String
  },
  data() {
    return {
      players: [],
      gameId: 0,
      websocket: {},
      isHost: false,
      url: ''
    };
  },
  mounted() {
    this.websocket = this.$store.getters.getWebSocket;

    this.players.push(this.name);
    this.isHost = this.$store.getters.getIsHost;
    this.gameId = this.$route.query.gameId;
    this.url = location.protocol + '//' + location.host + '/#/entry' + '?gameId=' + this.gameId;

    this.websocket.onmessage = this.receiveResponse;
  },
  methods: {
    receiveResponse(event) {
      let response = JSON.parse(event.data);
      console.log(response);

      if (this.isHost && response.action == "setname") {
        this.players.push(response.name);
      }

      if (response.action == "start") {
        this.$store.dispatch("updatePlayers", response.players);

        this.$router.push({
          name: 'WhatSecretWord',
          query: {
            gameId: this.gameId
          }
        })
      }
    },
    doCopy() {
      this.$copyText(this.url).then(function (e) {
        alert('Copied')
      }, function (e) {
        alert('Can not copy')
      })
    },
    startGame() {
      let request = {
        action: 'start',
        gameId: this.gameId
      }
      this.websocket.send(JSON.stringify(request));
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
