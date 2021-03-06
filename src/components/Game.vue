<template>
  <div>
    <h1>Game</h1>

    <button @click="goToIntro()">
      Back to Intro
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AppViews } from '../constants';

@Options({
  name: 'Game',
  emits: {
    changeView(newView: string): void { return newView; },
  },
  methods: {
    goToIntro(): void {
      this.$emit('changeView', AppViews.Intro);
    }
  }
})

export default class Game extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';


</style>
