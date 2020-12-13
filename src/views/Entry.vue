<template>
  <div class="regist-player">
    <WebSocket/>
    <div>
      <input v-model="name" placeholder="Name">
    </div>
    <div>
      <input v-model="gameId" placeholder="GameID">
    </div>
    <div class="btn-container">
      <button class="btn btn-primary" v-on:click="setName()">送信</button>
    </div>
  </div>
</template>

<script>
import WebSocket from '@/components/WebSocket.vue'

export default {
  name: 'Entry',
  components: {
    WebSocket
  },
  data() {
    return {
      name: '',
      gameId: '',
      websocket: {},
      isHost: false
    }
  },
  mounted() {
    if (this.$route.query.gameId !== undefined) {
      this.gameId = this.$route.query.gameId;
    }

    this.$nextTick(() => {
      this.websocket = this.$store.getters.getWebSocket;
      this.websocket.onmessage = this.receiveResponse;
    })
  },
  methods: {
    receiveResponse(event) {
      let response = JSON.parse(event.data);

      if (response.action == "setname") {
        this.$store.dispatch("setPlayerId", response.playerId);
        this.$store.dispatch("updateGameId", response.gameId);

        this.$router.push({
          name: 'WaitPlayers',
          query: {
            gameId: response.gameId
          },
          params: {
            name: this.name
          }
        });
      }
    },
    setName() {
      let request = {};

      if (this.gameId == '') {
        this.isHost = true;
        this.$store.dispatch("setIsHost", this.isHost);

        request = {
          action: 'setname',
          name: this.name
        };
      } else {
        request = {
          action: 'setname',
          gameId: this.gameId,
          name: this.name
        };
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
