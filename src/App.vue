<template>
  <a href="#main-content" class="btn -small focus-elem skip-btn">
    Skip to Main Content
  </a>
  <header>
    <div>
      <router-link to="/" class="btn">
        {{ $t('header.home') }}
      </router-link>
      <router-link to="/simulator" class="btn">
        {{ $t('header.simulator') }}
      </router-link>
      <router-link to="/disclaimers" class="btn">
        {{ $t('header.disclaimers') }}
      </router-link>
      <router-link to="/about" class="btn">
        {{ $t('header.about') }}
      </router-link>
    </div>

    <div class="lang-selector">
      <label for="lang-select">
        {{ $t('header.language') }}
        <img src="@/assets/earth.svg" alt="">
      </label>
      <select v-model="$i18n.locale" id="lang-select">
        <option v-for="langObj in AvailableLanguages"
          :key="`${langObj.locale}`"
          :value="langObj.locale">
          {{ langObj.name }}
        </option>
      </select>
    </div>
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { AvailableLanguages } from './constants/language-data';

@Options({
  name: 'App',
  data: () => ({
    AvailableLanguages: AvailableLanguages,
  })
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
  z-index: 10;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $dark-blue;
  padding: 0.75rem 2rem;
  position: absolute;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;

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

      img {
        height: 1.25rem;
        margin-left: 0.5rem;
      }
    }

    select {
      margin-left: 1rem;
      font-weight: bold;
      font-size: 1rem;
      padding: 0.25rem;
    }
  }
}
</style>
