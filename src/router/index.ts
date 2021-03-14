import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { i18n } from '@/i18n-init';

import App from '@/App.vue'

import About from '@/views/About.vue'
import Disclaimers from '@/views/Disclaimers.vue'
import Game from '@/components/Game.vue'
import Intro from '@/components/Intro.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Intro,
    meta: {
      langKey: 'home'
    }
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: Game,
    meta: {
      langKey: 'simulator'
    }
  },
  {
    path: '/disclaimers',
    name: 'Disclaimers',
    component: Disclaimers,
    meta: {
      langKey: 'disclaimers'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      langKey: 'about'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach(function(to, from, next) {

  const appTitle = i18n.global.t('title');
  const pageTitle = i18n.global.t('header.' + String(to.meta.langKey));

  document.title = `${pageTitle} | ${appTitle}`

  next();
});


export default router
