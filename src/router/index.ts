import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { i18n } from '@/i18n-init';

import App from '@/App.vue'

// Static pages (views)
import About from '@/views/About.vue'
import FAQ from '@/views/FAQ.vue'
import NotFound from '@/views/NotFound.vue';
import TakeAction from '@/views/TakeAction.vue'
// Actual components
import Intro from '@/components/Intro.vue'
import SimulatorBoard from '@/components/SimulatorBoard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Intro,
    meta: {
      titlei18nKey: 'header.home'
    }
  },
  {
    path: '/simulator',
    component: SimulatorBoard,
    meta: {
      titlei18nKey: 'header.simulator'
    }
  },
  {
    path: '/about',
    component: About,
    meta: {
      titlei18nKey: 'header.about'
    }
  },
  {
    path: '/faq',
    component: FAQ,
    meta: {
      titlei18nKey: 'header.faq'
    }
  },
  {
    path: '/take-action',
    component: TakeAction,
    meta: {
      titlei18nKey: 'header.takeAction'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
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
  // Run the app and page title through translation before updating title
  const appTitle = i18n.global.t('title');
  const pageTitle = i18n.global.t(String(to.meta.titlei18nKey));

  document.title = `${pageTitle} | ${appTitle}`

  // Reset scroll position
  window.scrollTo(0, 0);

  next();
});


export default router
