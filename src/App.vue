<template>
  <transition name="fade" mode="out-in">
    <Intro v-if="currView === 'intro'"
      @change-view="currView = $event"/>
    <Game v-else-if="currView === 'game'"
      @change-view="currView = $event"/>
  </transition>
</template>

<script>
import Intro from './components/Intro.vue'
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game,
    Intro,
  },
  data: () => ({
    currView: 'intro',
  })
}
</script>

<style lang="scss">
@import './styles/main';
</style>
