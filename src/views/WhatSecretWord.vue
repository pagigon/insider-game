<template>
  <div class="confirm-role">
    <div>YES or Noで答えられる質問をして、お題を当てろ！</div>
    <div>{{ this.timer }}</div>
    <input type="button" value="スタート" v-on:click="countStart()">
    <input type="button" value="ストップ" v-on:click="countStop()">
    <div class="btn-container" v-if="isHost">
      <button class="btn btn-primary" v-on:click="nextGame()">NEXT</button>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>プレイヤー名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players">
          <td><input type="checkbox"></td>
          <td>{{ player.name }}</td>
        </tr>
      </tbody>
    </table>
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
      isHost: false,
      constTime: 300,
      timer: 0,
      timerObj: null
    };
  },
  mounted() {
    this.websocket = this.$store.getters.getWebSocket;

    this.players = this.$store.getters.getPlayers;
    this.gameId = this.$route.query.gameId;
    this.isHost = this.$store.getters.getIsHost;
    this.timer = this.constTime;

    this.websocket.onmessage = this.receiveResponse;
  },
  methods: {
    receiveResponse(event) {
      let response = JSON.parse(event.data);

      if (response.action == "next") {
        console.log(response);
      }
    },
    showPassage() {
      if (this.timer > 0) {
        this.timer--;
      } else {
        alert("You're Loser...");
        clearInterval(this.timerObj);
      }
    },
    countStart() {
      this.timerObj = setInterval(this.showPassage, 1000);
    },
    countStop() {
      clearInterval(this.timerObj);
    },
    nextGame() {
      let request = {
        action: 'next',
        gameId: this.gameId,
        elapsedTime: this.constTime - this.timer
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
