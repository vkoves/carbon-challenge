import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { i18n } from '@/i18n-init';

import App from '@/App.vue'

// Static pages (views)
import About from '@/views/About.vue'
import FAQ from '@/views/FAQ.vue'
import TakeAction from '@/views/TakeAction.vue'
// Actual components
import Intro from '@/components/Intro.vue'
import SimulatorBoard from '@/components/SimulatorBoard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Intro,
    meta: {
      titlei18nKey: 'header.home'
    }
  },
  {
    path: '/simulator',
    name: 'SimulatorBoard',
    component: SimulatorBoard,
    meta: {
      titlei18nKey: 'header.simulator'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      titlei18nKey: 'header.about'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
    meta: {
      titlei18nKey: 'header.faq'
    }
  },
  {
    path: '/take-action',
    name: 'Take Action',
    component: TakeAction,
    meta: {
      titlei18nKey: 'header.takeAction'
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
  const pageTitle = i18n.global.t(String(to.meta.titlei18nKey));

  document.title = `${pageTitle} | ${appTitle}`

  next();
});


export default router
