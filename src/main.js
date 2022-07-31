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

/*const fs = require('fs');
const test = require('./stops.txt');*/
import stopsList from './stops.txt';
import routesList from './stop_times.txt';

let goStations = new Set();
let stops = [];
let stopTimes = {};
stopsList.split('\n').forEach(line => {
  if (line.length == 0) {
    return;
  }
  let lineData = line.trim().split(',');
  if (!lineData[1].includes("@")) {
    stops.push({ id: lineData[0], name: lineData[1], lat: parseFloat(lineData[2]), lng: parseFloat(lineData[3]) })
    goStations.add(lineData[0]);
    stopTimes[lineData[0]] = new Set();
  }
  //stops[lineData[0]] = { name: lineData[1], lat: parseFloat(lineData[2]), lng: parseFloat(lineData[3]),  };

});
console.log(goStations);
routesList.split('\n').forEach(line => {
  let lineData = line.trim().split(',');
  if (goStations.has(lineData[3])) {
    stopTimes[lineData[3]].add(lineData[1]);
  }
  //stops[lineData[3]].routes.push({ arrival: lineData[1], departure: lineData[2] });
});

for (let key of Object.keys(stopTimes)) {
  stopTimes[key] = Array.from(stopTimes[key]).sort();
}

stops.splice(0, 1);
stops.splice(stops.length - 1, 1);
// stopTimes.splice(0, 1);

stops.sort((a, b) => {
  return a.name.localeCompare(b.name);
})

//console.log(stopTimes);

store.commit('setGoStations', stops);
store.commit('setGoStationTimes', stopTimes);
//console.log(store.getters.getGoStationTimes('00005'));
//console.log(stops);

store.commit("addPreviousRide", { name: "Bramalea GO", time: "Yesterday 5:35:00" });
store.commit("addPreviousRide", { name: "Brampton GO", time: "29/07/22 1:20:00" });
            

