import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameId: 0,
    players: [],
    websocket: null,
    isHost: false
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
    }
  },
  modules: {
  }
})
