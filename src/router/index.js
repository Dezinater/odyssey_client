import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/findRide',
    name: 'Find Ride',
    component: () => import('../views/FindRide.vue')
  },
  {
    path: '/viewRide',
    name: 'View Ride',
    props:true,
    component: () => import('../views/ViewRide.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
