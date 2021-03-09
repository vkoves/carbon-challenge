import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Intro from '../components/Intro.vue'
import Game from '../components/Game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Intro
  },
  {
    path: '/simulator',
    name: 'Game',
    component: Game
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
