<template>
  <div class="inner">
    <h1>Carbon Challenge</h1>

    <button @click="goToIntro()" class="btn">
      Back to Intro
    </button>

    <div class="boards-cont">
      <div class="game-board -main">
        <button v-for="tile in tiles" class="tile" v-bind:key="tile.id">
          <div class="ground"></div>
          <div class="above-ground">
            <img src="@/assets/test.svg">
          </div>
        </button>
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
  }),
  emits: {
    changeView(newView: AppViews): AppViews { return newView; },
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

.inner {
  background: linear-gradient($dark-blue, $blue);
  padding: 100px;
  color: $white;
  min-height: 100vh;
}

.boards-cont { position: relative; }

.game-board {
  // The width of our square grid, in tiles. Must match the GridWith from
  // constants.ts as otherwise Vue won't generate the proper number of tiles
  $grid-width: 4;

  // We rotate the board 45deg to give an isometric view
  $boardRotation: 45deg;
  $skewDeg: -10deg;

  // The raw board size. Keep in mind this gets distorted due to rotation + skew
  $boardSize: min(50vw, 70vh);

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
    border: solid 5px #4caf50;
    margin: 1px;

    // Fix weird flicker in Chrome
    -webkit-transform: translate3d(0, 0, 0);

    &:hover, &:focus {
      outline: none;
      transform: translate(-10px, -10px);
      box-shadow: 5px 5px 5px rgb(0 0 0 / 50%);
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
