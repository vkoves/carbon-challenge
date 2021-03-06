<template>
  <transition name="fade" mode="out-in">
    <Intro v-if="currView === AppViews.Intro"
      @change-view="currView = $event"/>
    <Game v-else-if="currView === AppViews.Game"
      @change-view="currView = $event"/>
  </transition>
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
</style>
