import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameId: 0,
    players: [],
    websocket: null,
    isHost: false,
    playerId: ''
  },
  getters: {
    getGameId(state) {
      return state.gameId;
    },
    getPlayers(state) {
      return state.players;
    },
    getWebSocket(state) {
      return state.websocket;
    },
    getIsHost(state) {
      return state.isHost;
    },
    getPlayerId(state) {
      return state.playerId;
    }
  },
  mutations: {
    setGameId(state, playload) {
      state.gameId = playload.gameId;
    },
    setPlayers(state, playload) {
      state.players = playload.players;
    },
    setWebSocket(state, playload) {
      state.websocket = playload.websocket;
    },
    setIsHost(state, playload) {
      state.isHost = playload.isHost;
    },
    setPlayerId(state, playload) {
      state.playerId = playload.playerId;
    }
  },
  actions: {
    updateGameId({ commit }, gameId) {
      commit("setGameId", { gameId });
    },
    updatePlayers({ commit }, players) {
      commit("setPlayers", { players });
    },
    setWebSocket({ commit }, websocket) {
      commit("setWebSocket", { websocket });
    },
    setIsHost({ commit }, isHost) {
      commit("setIsHost", { isHost });
    },
    setPlayerId({ commit }, playerId) {
      commit("setPlayerId", { playerId });
    }
  },
  modules: {
  }
})
