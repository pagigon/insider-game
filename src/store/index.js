import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameId: 0,
    players: []
  },
  getters: {
    getGameId(state) {
      return state.gameId;
    },
    getPlayers(state) {
      console.log(state);
      return state.players;
    }
  },
  mutations: {
    setGameId(state, playload) {
      state.gameId = playload.gameId;
      console.log(state);
    },
    setPlayers(state, playload) {
      state.players = playload.players;
    },
  },
  actions: {
    updateGameId({ commit }, gameId) {
      commit("setGameId", { gameId });
    },
    updatePlayers({ commit }, players) {
      commit("setPlayers", { players });
    },
  },
  modules: {
  }
})
