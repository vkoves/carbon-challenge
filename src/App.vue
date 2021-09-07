<template>
  <a href="#main-content" class="btn -small focus-elem skip-btn">
    Skip to Main Content
  </a>
  <header :class="{ '-scrolled': isScrolledDown }">
    <div class="mobile-header" :class="{ '-open': mobileMenuOpen }">
      <router-link to="/" class="btn -transparent">
        {{ $t('title') }}
      </router-link>

      <button class="btn -transparent"
        :aria-expanded="mobileMenuOpen"
        @click="mobileMenuOpen = !mobileMenuOpen">
        <img src="@/assets/menu.svg" alt="Toggle Mobile Menu"
          width="24" height="24">
      </button>
    </div>

    <transition name="vert-slide-fade">
      <div class="menu-inner" v-show="mobileMenuOpen">
        <div class="nav-links">
          <router-link to="/" class="btn -transparent">
            {{ $t('header.home') }}
          </router-link>
          <router-link to="/simulator" class="btn -transparent">
            {{ $t('header.simulator') }}
          </router-link>
          <router-link to="/about" class="btn -transparent">
            {{ $t('header.about') }}
          </router-link>
          <router-link to="/faq" class="btn -transparent">
            {{ $t('header.faq') }}
          </router-link>
          <router-link to="/take-action" class="btn -transparent">
            {{ $t('header.takeAction') }}
          </router-link>
        </div>

        <div class="lang-selector">
          <label for="lang-select">
            {{ $t('header.language') }}
            <img src="@/assets/earth.svg" alt=""
              width="20" height="20">
          </label>
          <select v-model="$i18n.locale" id="lang-select"
            @change="langagugeChanged">
            <option v-for="langObj in AvailableLanguages"
              :key="`${langObj.locale}`"
              :value="langObj.locale">
              {{ langObj.name }}
            </option>
          </select>
        </div>
      </div>
    </transition>
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { i18n } from '@/i18n-init';
import router from '@/router'
import { AvailableLanguages } from '@/constants/languages';

@Options({
  name: 'App',

  data: () => ({
    AvailableLanguages: AvailableLanguages,
    mobileMenuOpen: false,
    isScrolledDown: false,
  }),

  methods: {
    closeMenu(): void {
      this.mobileMenuOpen = false;
    },

    /**
     * Called when the user scrolls
     */
    handleScroll() {
      this.isScrolledDown = window.pageYOffset > 10;
    },

    /**
     * Called when the user changes languages - we re-set the document title
     * from the current route and store the route in localStorage to ensure it
     * persists over multiple sessions
     */
    langagugeChanged() {
      App.setTitleFromRoute(this.$route);

      localStorage.setItem(App.LocaleStorageKey, this.$i18n.locale);
    },
  },

  mounted() {
    const cachedLocale = localStorage.getItem(App.LocaleStorageKey);

    if (cachedLocale) {
      this.$i18n.locale = cachedLocale;
    }

    const closeMenuFunc = this.closeMenu;

    // Watch for route changes and close the mobile menu
    router.beforeEach((to, from, next) => {
      closeMenuFunc();
      next();
    });

    // Listen for scroll events to change <header> styling
    window.addEventListener('scroll', this.handleScroll);
  }
})

export default class App extends Vue {
  static readonly LocaleStorageKey = 'i18n-locale';

  /**
   * Set the document title based on the current route using the i18n library to
   * ensure it's translated to the user's desired language
   */
  static setTitleFromRoute(route: any) {
    // Run the app and page title through translation before updating title
    const appTitle = i18n.global.t('title');
    const pageTitle = i18n.global.t(String(route.meta.titlei18nKey));

    document.title = `${pageTitle} | ${appTitle}`;
  }

}
</script>

<style lang="scss">
@import './styles/main';

.skip-btn {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  background: $dark-blue;
  z-index: 11;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

header {
  position: sticky;
  top: 0;
  background-color: $dark-blue;
  padding: 0.75rem 2rem;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
  transition: box-shadow 0.3s;

  &.-scrolled {
    box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.5);
  }

  .menu-inner, .mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-header {
    padding: $small;
    background-color: $dark-blue;
    transition: border 0.3s;
    border-bottom: solid 0.125rem transparent;

    &.-open {
      border-color: white;
    }

    a.btn { padding-left: 1rem; }

    button {
      display: flex;
      background: none;
      margin-top: 0;
      padding: 0.5rem;
    }
  }

  a.btn {
    margin: 0;
    font-size: 1rem;
    background-color: $white;
    border: solid 0.125rem $dark-blue;
    color: $dark-blue;
    transition: padding 0.3s, font-size 0.3s, box-shadow 0.3s;

    + a { margin-left: 1rem; }
  }

  .lang-selector {
    label {
      display: inline-flex;
      align-items: center;
      color: $white;
      font-weight: bold;

      img { margin-left: 0.5rem; }
    }

    select {
      margin-left: 1rem;
      font-weight: bold;
      font-size: 1rem;
      padding: 0.25rem;
    }
  }

  // Desktop styling - hide mobile specific UI
  @media (min-width: $desktop-min-width) {
    .mobile-header { display: none; }

    // Always render the inner menu on desktop, overriding mobile closed state
    .menu-inner { display: flex !important; }
  }

  @media (max-width: $small-desktop-max-width) {
    a.btn {
      padding: $tiny $standard;

      + a { margin-left: $small; }
    }
  }
}

// Mobile styling
@media (max-width: $mobile-max-width) {
  header {
    padding: 0;

    .btn.-transparent { border: none; }

    .menu-inner, .nav-links {
      display: flex;
      flex-direction: column;
      align-items: stretch;

      a + a {
        margin-left: 0;
        margin-top: 1rem;
      }
    }

    .nav-links a, .lang-selector { padding: 1rem; }

    .menu-inner {
      position: absolute;
      background: $dark-blue;
      width: 100%;
      left: 0;
      padding: 1rem;
      box-sizing: border-box;
      z-index: -1;
    }

    .lang-selector {
      display: flex;
      justify-content: space-between;

      select { width: 40%; }
    }
  }
}

</style>
