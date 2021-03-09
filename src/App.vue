<template>
  <header>
    <router-link to="/" class="btn">Home</router-link>
    <router-link to="/simulator" class="btn">Simulator</router-link>
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import Intro from './components/Intro.vue'
import Game from './components/Game.vue'

import { AppViews } from './constants';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'App',
  components: {
    Game,
    Intro,
  },
  data: () => ({
    AppViews: AppViews,
    currView: AppViews.Intro,
  })
})

export default class App extends Vue { }
</script>

<style lang="scss">
@import './styles/main';

header {
  background-color: transparent;
  padding: 1rem 2rem;
  position: absolute;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;

  a.btn {
    margin: 0;
    font-size: 1rem;
    background-color: $white;
    border: solid 2px $dark-blue;
    color: $dark-blue;

    + a { margin-left: 1rem; }
  }
}
</style>
