import Vue from 'vue'
import Vuex from 'vuex'
import NetworkClient from "../NetworkClient.js";

Vue.use(Vuex);

let networkClient = new NetworkClient();

export default new Vuex.Store({
  state: {
    networkClient,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    getNetworkClient: (state) => {
      return state.networkClient;
    },
  },
})
