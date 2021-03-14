<template>
  <a href="#main-content" class="btn -small focus-elem skip-btn">
    Skip to Main Content
  </a>
  <header>
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
          <router-link to="/disclaimers" class="btn -transparent">
            {{ $t('header.disclaimers') }}
          </router-link>
          <router-link to="/about" class="btn -transparent">
            {{ $t('header.about') }}
          </router-link>
        </div>

        <div class="lang-selector">
          <label for="lang-select">
            {{ $t('header.language') }}
            <img src="@/assets/earth.svg" alt=""
              width="20" height="20">
          </label>
          <select v-model="$i18n.locale" id="lang-select">
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

import router from '@/router'
import { AvailableLanguages } from '@/constants/languages';

@Options({
  name: 'App',
  data: () => ({
    AvailableLanguages: AvailableLanguages,
    mobileMenuOpen: false,
  }),
  methods: {
    closeMenu(): void {
      this.mobileMenuOpen = false;
    }
  },
  mounted() {
    const closeMenuFunc = this.closeMenu;

    // Watch for route changes and close the mobile menu
    router.beforeEach((to, from, next) => {
      closeMenuFunc();
      next();
    });
  }
})

export default class App extends Vue { }
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
  background-color: $dark-blue;
  padding: 0.75rem 2rem;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;

  .menu-inner, .mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-header {
    padding: 1rem;
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

  // Mobile styling
  @media (max-width: $mobile-max-width) {
    // On mobile, the <header> is sticky and leaves padding to it's mobile child
    position: fixed;
    padding: 0;
    top: 0;

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

@media (max-width: $mobile-max-width) {
  // Since the header becomes sticky, add <body> padding to compensate
  body { padding-top: 4.5rem; }
}
</style>
