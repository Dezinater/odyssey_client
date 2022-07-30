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
import stops from './stops.txt';
console.log(stops);
/*
fetch('./stops.txt')
  .then((response) => response.text())
  .then((text) => {
    console.log(text);
  });
  */