<template>
  <div>
    <div class="hero">
      <div class="hero-inner">
        <h1 class="huge-text">
          The Carbon Challenge
        </h1>

        <p class="tagline big-text">
          Climate change is big. <br>
          So we have to go even bigger.
        </p>

        <button @click="goToGame()" class="btn">
          Play
        </button>
      </div>
    </div>

    <div class="hero">
      <div class="hero-inner">
        <h2 class="larger-text">Try your hand at solving climate change</h2>

        <p>
          Climate change isn't going to be solved over night, and we also know there's
          a limit to individual responsibility. But to advocate for policies, you need
          to know the impact. Try out policies in the Carbon Challenge simulation.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AppViews } from '../constants';

@Options({
  name: 'Intro',
  emits: {
    changeView(newView: AppViews): AppViews { return newView; },
  },
  methods: {
    goToGame(): void {
      this.$emit('changeView', AppViews.Game);
    }
  }
})

export default class Intro extends Vue { }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $large;
  min-height: 40vh;

  &:first-of-type {
    background: linear-gradient($dark-blue, $blue);
    color: $white;
    text-align: center;
  }
}
</style>
