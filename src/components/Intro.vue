<template>
  <div>
    <div class="hero -primary">
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

    <!-- TODO: Move all hero copy into i18n text -->
    <div class="hero">
      <div class="hero-inner">
        <div class="img-cont">
        </div>

        <div class="text-cont">
          <h2 class="larger-text">
            Try Out Policies to <br>
            Combat Climate Change
          </h2>

          <p>
            Test out policies from moving to renewable energy, transitioning to
            electric cars, and even geo-engineering, and see how they impact our
            climate.
          </p>
        </div>
      </div>
    </div>

    <div class="hero -blue">
      <div class="hero-inner">
        <div class="text-cont">
          <h2 class="larger-text">
            Learn How You Can <br>
            Reduce Your Impact
          </h2>

          <p>
            Look at the impact of changes you can make in your home, like
            composting, installing solar panels, or driving less.
          </p>
        </div>

        <div class="img-cont">
        </div>
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
  padding: 10rem $large;
  background-color: $white;

  &.-primary {
    background: linear-gradient($dark-blue, $blue);
    color: $white;
    text-align: center;
    padding: 15rem $large;
  }

  &:not(.-primary) .hero-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 75rem;
    margin: auto;
  }

  &.-blue {
    background-color: $dark-blue;
    color: $white;

    .img-cont { background-color: $white; }
  }

  .img-cont {
    background-color: $blue;
    width: 25%;
    border-radius: 10rem;
    padding: 9rem 0;
  }

  .text-cont {
    max-width: 31.25rem;
  }
}

.tagline {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: $mobile-max-width) {
  .hero:not(.primary) .hero-inner {
    flex-direction: column;

    > div:last-of-type {
      margin-top: $x-large;
    }
  }
}
</style>
