import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from '@/views/About.vue'
import Disclaimers from '@/views/Disclaimers.vue'
import Game from '@/components/Game.vue'
import Intro from '@/components/Intro.vue'

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
  {
    path: '/disclaimers',
    name: 'Disclaimers',
    component: Disclaimers
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
