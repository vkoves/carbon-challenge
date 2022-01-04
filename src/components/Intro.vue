<template>
  <main id="main-content">
    <div class="hero -primary">
      <div class="hero-inner">
        <h1 class="huge-text">
          {{ $t('title') }}
        </h1>

        <p class="tagline big-text">
          {{ $t('intro.slogan1') }} <br>
          {{ $t('intro.slogan2') }}
        </p>

        <router-link to="/simulator" class="btn -start">
          {{ $t('intro.startBtn') }}
        </router-link>
      </div>
    </div>

    <!-- TODO: Move all hero copy into i18n text -->
    <div class="hero">
      <div class="hero-inner">
        <div class="img-cont">
          <div class="circle"></div>
          <div class="img -farm-green"></div>
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
          <div class="circle"></div>
          <div class="img -power-green"></div>
        </div>
      </div>
    </div>
  </main>
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

.btn.-start {
  margin-top: 3rem;
  font-size: 1.75rem;
}

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
    padding: 25vh $large;
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

    .img-cont .circle { background-color: $white; }
  }

  .img-cont {
    position: relative;
    width: 25%;
    padding: 12.5% 0;

    .circle {
      position: absolute;
      background-color: $light-grey;
      bottom: 0;
      border-radius: 10rem;
      width: 100%;
      padding: 50% 0;
      filter: drop-shadow(2px 4px 0px $shadow-medium);
      transform: scale(1, 0.8);
    }

    .img {
      position: absolute;
      width: 80%;
      left: 10%;
    }
  }

  .img {
    background-image: url('~@/assets/tile-sheet.webp');
    background-size: 300%;
    padding: 50% 0;
    filter: drop-shadow(1px 2px 0px $shadow-medium);

    &.-farm-green {
      top: -8%;
      background-position: 100% 104%;
    }

    &.-power-green {
      top: -15%;
      background-position: 100% 81%;
    }

    &.-office-green {
      top: -8%;
      background-position: 100% 41%;
    }
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

    .img-cont {
      width: 50%;
      padding: 25% 0;
    }
  }
}
</style>
