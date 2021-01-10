<template>
  <div>
    <div>{{ own.name }}は『{{ roleList[own.role] }}』です。</div>
    <div v-if="own.role == 'master' || own.role == 'insider'">お題は「{{ own.theme }}」です。</div>
    <Timer @getElapsedTime="getElapsedTime"  ref="timer" v-if="!resetFlag" :message="message" :constTime="constTime"/>
    <div class="btn-container" v-if="isHost && !isSecondPart">
      <div>
        お題が当てられたらボタンを押してください。
      </div>
      <button class="btn btn-primary" v-on:click="nextGame()">NEXT</button>
    </div>
    <div v-if="isSecondPart">
      <div>インサイダーだと思う人に投票してください</div>
      <div>
        <select v-model="targetPlayer">
          <option disabled value="">選択</option>
          <option v-for="player in players" :value="player.id">{{ player.name }}</option>
        </select>
      </div>
      <div>
        <button class="btn btn-primary" v-on:click="vote()" v-if="!finishVote">投票する</button>
        <div v-else>投票済みです</div>
      </div>
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
      roleList: {},
      own: {},
      message: '',
      resetFlag: false,
      elapsedTime: 0,
      isSecondPart: false,
      targetPlayer: '',
      finishVote: false,
      voteList: []
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

    this.roleList = {
      'insider': 'インサイダー',
      'master': 'マスター',
      'common': '市民'
    };

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

        this.isSecondPart = true;
        this.message = 'インサイダーを探せ！！';
      }

      if (response.action == "vote") {
        this.voteList.push(
          {
            "votePlayerId": response.vote_player_id,
            "targetPlayerId": response.target_player_id
          }
        );

        if (this.voteList.length == this.players.length) {
          let result = {};
          this.players.forEach((player) => {
            result[player.id] = 0;
          });

          this.voteList.forEach((vote) => {
            result[vote.targetPlayerId]++;
          });

          let target = this.sortMaxValue(result)
          this.players.forEach((player) => {
            if (target == player.id) {
              alert(player.name + 'が処刑されます。');
            }
          });
        }
      }
    },
    sortMaxValue(list) {
      var maxKey = '';
      // 配列内で最大の値を調べる
      for(let key in list) {
        if(maxKey === '' || list[key] > list[maxKey]) {
            maxKey = key;
        }
      }

      return maxKey;
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

      this.$refs.timer.finishTimer();
    },
    vote() {
      let request = {
        action: 'vote',
        gameId: this.gameId,
        votePlayerId: this.own.id,
        targetPlayerId: this.targetPlayer
      }
      this.websocket.send(JSON.stringify(request));

      this.finishVote = true;
    }
  }
}
</script>
