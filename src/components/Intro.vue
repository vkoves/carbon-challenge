<template>
  <div>
    <div class="hero">
      <div class="hero-inner">
        <h1 class="huge-text">
          {{ $t('title') }}
        </h1>

        <p class="tagline big-text">
          {{ $t('intro.slogan1') }} <br>
          {{ $t('intro.slogan2') }}
        </p>

        <router-link to="/simulator" class="btn">
          {{ $t('intro.startBtn') }}
        </router-link>
      </div>
    </div>

    <div class="hero">
      <div class="hero-inner">
        <!-- TODO: Move into i18n text -->
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

@Options({
  name: 'Intro'
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
  background-color: $white;

  &:first-of-type {
    background: linear-gradient($dark-blue, $blue);
    color: $white;
    text-align: center;
  }
}

.tagline {
  margin-left: auto;
  margin-right: auto;
}
</style>
