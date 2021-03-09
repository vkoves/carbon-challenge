<template>
  <div class="inner">
    <h1>Carbon Challenge</h1>

    <router-link to="/" class="btn">Back to Intro</router-link>

    <div class="main-cont">
      <div class="thermometer">
        <div class="stem">
          <div class="stem-inner"
            v-bind:style="{ height: avgTempAdjusted + '%' }"></div>
        </div>
        <div class="bulb"></div>

        <div class="text">
          <p class="temp">{{ avgTempRise.toFixed(2) }}° F</p>
          <p class="label">Avg. Global Temperature Increase</p>
        </div>
      </div>

      <div class="boards-cont">
        <div class="game-board -main">
          <button v-for="tile in tiles" class="tile" v-bind:key="tile.id"
            @click="recalculateTemps()">
            <div class="ground"></div>
            <div class="above-ground">
              <img src="@/assets/test.svg">
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AppViews } from '../constants';
import { Simulator } from '../simulator';

@Options({
  name: 'Game',
  data: () => ({
    tiles: Simulator.generateTiles(),
    avgTempRise: 0,
    avgTempAdjusted: 0,
    MaxTempRise: 3,
  }),
  emits: {
    changeView(newView: AppViews): AppViews { return newView; },
  },
  methods: {
    goToIntro(): void {
      this.$emit('changeView', AppViews.Intro);
    },

    recalculateTemps(): void {
      this.avgTempRise = Simulator.getThermometerDegrees(this.tiles);

      // Convert decimal temperature rise to a %
      this.avgTempAdjusted = (this.avgTempRise / this.MaxTempRise) * 100;
    }
  }
})

export default class Game extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';

.inner {
  background: linear-gradient($dark-blue, $blue);
  padding: 100px;
  color: $white;
  min-height: 100vh;
}

.main-cont {
  display: flex;
  margin-top: 2rem;
}

.thermometer {
  $thermometer-width: 80px;
  $inner-width: 30px;
  $border-width: 6px;

  position: relative;
  width: $thermometer-width;
  margin-right: 2rem;

  $red: red;

  .bulb, .stem {
    border: solid $border-width $white;
    box-sizing: border-box;
  }

  .stem {
    position: relative;
    overflow: hidden;
    width: $inner-width + $border-width * 2;
    height: 85%;
    margin: auto;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    margin-bottom: 4rem;
  }

  .stem-inner {
    background-color: $red;
    width: $inner-width;
    position: absolute;
    height: 40px;
    z-index: 2;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 0;
    transition: height 1s;
    border-bottom: solid 35px $red;
  }

  .bulb {
    background-color: $red;
    width: $thermometer-width - $border-width;
    height: $thermometer-width - $border-width;
    border-radius: 100%;
    position: absolute;
    top: 82%;
  }

  .text {
    text-align: center;
    font-size: 0.8rem;

    .temp {
      font-size: 1.25rem;
      font-weight: bold;
    }
    .label { margin-top: 0.25rem; }
  }
}

.boards-cont {
  position: relative;
  width: 100%;
}

.game-board {
  // The width of our square grid, in tiles. Must match the GridWith from
  // constants.ts as otherwise Vue won't generate the proper number of tiles
  $grid-width: 4;

  // We rotate the board 45deg to give an isometric view
  $boardRotation: 45deg;
  $skewDeg: -10deg;

  // The raw board size. Keep in mind this gets distorted due to rotation + skew
  $boardSize: min(50vw, 60vh);

  display: grid;
  grid-template-rows: repeat($grid-width, 1fr);
  grid-template-columns: repeat($grid-width, 1fr);
  width: $boardSize;
  height: $boardSize;
  margin: auto;


  &.-main {
    transform: rotate($boardRotation) skew($skewDeg, $skewDeg);
  }

  .tile {
    $ground-green: #4caf50;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, box-shadow 0.3s, border 0.3s;
    border: solid 5px lighten($ground-green, 5%);
    margin: 1px;

    // Fix weird flicker in Chrome
    -webkit-transform: translate3d(0, 0, 0);

    &:hover, &:focus {
      outline: none;
      transform: translate(-10px, -10px);
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
      border: solid 5px $white;
    }

    .ground {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      background: $ground-green;
    }

    // Reverse the game board rotation and skew to straighten above ground
    // assets
    .above-ground {
      transform: skew(-$skewDeg, -$skewDeg) rotate(-$boardRotation);
      width: 85%;
    }

    img { width: 100%; }
  }
}
</style>
