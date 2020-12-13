<template>
  <div class="confirm-role">
    <div>{{ own.name }}は{{ own.role }}です。</div>
    <div v-if="own.role == 'master' || own.role == 'insider'">お題は「{{ own.theme }}」です。</div>
    <Timer @getElapsedTime="getElapsedTime" v-if="!resetFlag" :message="message" :constTime="constTime"/>
    <div class="btn-container" v-if="isHost">
      <button class="btn btn-primary" v-on:click="nextGame()" v-if="!isSecondPart">NEXT</button>
      <router-link :to="{ name: 'VoteStage'}" v-else>投票へ</router-link>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>プレイヤー名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players">
            <td v-if="player.role == 'master'">MASTER</td>
            <td v-else><input type="checkbox"></td>
            <td>{{ player.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'

export default {
  name: 'WhatSecretWord',
  components: {
    Timer
  },
  data() {
    return {
      players: [],
      gameId: 0,
      websocket: {},
      isHost: false,
      constTime: 300,
      own: {},
      message: '',
      resetFlag: false,
      elapsedTime: 0,
      isSecondPart: false
    };
  },
  mounted() {
    this.websocket = this.$store.getters.getWebSocket;

    this.players = this.$store.getters.getPlayers;
    this.gameId = this.$route.query.gameId;
    this.isHost = this.$store.getters.getIsHost;
    this.message = 'YES or Noで答えられる質問をして、お題を当てろ！';

    let playerId = this.$store.getters.getPlayerId;
    this.players.some((player) => {
      if (player.id === playerId) {
        this.own = player;
      }
    });

    this.websocket.onmessage = this.receiveResponse;
  },
  methods: {
    receiveResponse(event) {
      let response = JSON.parse(event.data);

      if (response.action == "next") {
        this.constTime = response.elapsedTime;

        this.resetFlag = true;
        this.$nextTick(() => {
          this.resetFlag=false;
        });
      }
    },
    getElapsedTime(elapsedTime) {
      this.elapsedTime = elapsedTime;
    },
    nextGame() {
      let request = {
        action: 'next',
        gameId: this.gameId,
        elapsedTime: this.elapsedTime
      }
      this.websocket.send(JSON.stringify(request));

      this.isSecondPart = true;
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
