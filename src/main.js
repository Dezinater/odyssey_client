import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
/*
const fs = require('fs');
const test = require('./stops.txt');
*/
import stopsList from './stops.txt';
import routesList from './stop_times.txt';

let stops = {};
let stopTimes = {};
stopsList.split('\n').forEach(line => {
  let lineData = line.trim().split(',');
  stops[lineData[0]] = { name: lineData[1], lat: parseFloat(lineData[2]), lng: parseFloat(lineData[3]),  };
  stopTimes[lineData[0]] = new Set();
});

routesList.split('\n').forEach(line => {
  let lineData = line.trim().split(',');
  if (lineData[3] in stops) {
    stopTimes[lineData[3]].add(lineData[1]);
    //stops[lineData[3]].routes.push({ arrival: lineData[1], departure: lineData[2] });
  }
});

for (let key of Object.keys(stopTimes)) {
  stopTimes[key] = Array.from(stopTimes[key]).sort();
}

store.commit('setGoStations', stops);
store.commit('setGoStationTimes', stopTimes);
console.log(store.getters.getGoStationTimes('00005'));
//console.log(stops);
/*
fetch('./stops.txt')
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  });
  */