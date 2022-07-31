import Vue from 'vue'
import Vuex from 'vuex'
import NetworkClient from "../NetworkClient.js";

Vue.use(Vuex);

let networkClient = new NetworkClient();

export default new Vuex.Store({
  state: {
    networkClient,
    goStations: [],
    goStationsTimes: [],
    upcomingRides: [],
    previousRides: [],
  },
  mutations: {
    setGoStations(state, goStations) {
      state.goStations = goStations;
    },
    setGoStationTimes(state, goStationsTimes) {
      state.goStationsTimes = goStationsTimes;
    },
    addUpcomingRide(state, data) {
      state.upcomingRides.push(data)
    },
    removeUpcomingRide(state, index) {
      state.upcomingRides.splice(index, 1);
    }
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
    getGoStations: (state) => {
      return state.goStations;
    },
    getGoStationTimes: (state) => (station) => {
      return state.goStationsTimes[station];
    },
    getUpcomingRides: (state) => {
      return state.upcomingRides;
    },
  },
})
