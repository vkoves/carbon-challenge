<template>
  <div class="inner">
    <h1>{{ $t('title') }}</h1>

    <div class="main-cont">
      <div class="thermometer">
        <div class="stem">
          <div class="stem-inner"
            v-bind:style="{ height: avgTempAdjusted + '%' }"></div>
        </div>
        <div class="bulb"></div>

        <div class="text">
          <p class="temp">{{ avgTempRise.toFixed(2) }} °C</p>
          <p class="label">{{ $t('simulator.avgTempLabel') }}</p>
        </div>
      </div>

      <div class="boards-cont">
        <div class="game-board -main">
          <Tile v-for="tile in tiles"
            v-bind:key="tile.id"
            :tile="tile"
            :class="{ '-active': tile.id === selectedTile?.id }"
            @data-updated="selectTile(tile)" />
        </div>
      </div>
    </div>

    <TileOverlay
      :tile="selectedTile"
      @closed="tileOverlayClosed()"></TileOverlay>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { Simulator, TileObj } from '../simulator';
import Tile from './Tile.vue';
import TileOverlay from './TileOverlay.vue';

@Options({
  name: 'Game',
  components: {
    Tile,
    TileOverlay,
  },
  data: () => ({
    tiles: Simulator.generateTiles(),
    selectedTile: null,
    showingTileMenu: false,
    avgTempRise: 0,
    avgTempAdjusted: 0,
    MaxTempRise: 3,
  }),
  methods: {
    recalculateTemps(): void {
      this.avgTempRise = Simulator.getThermometerDegrees(this.tiles);

      // Convert decimal temperature rise to a %
      this.avgTempAdjusted = (this.avgTempRise / this.MaxTempRise) * 100;
    },

    selectTile(tile: TileObj) {
      this.selectedTile = tile;

      this.recalculateTemps();
    },

    tileOverlayClosed() {
      this.selectedTile = null;
    }
  }
})

export default class Game extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/board';
@import './styles/variables/colors';
@import './styles/variables/spacing';

.inner {
  padding: 6rem;
  color: $white;
}

.main-cont {
  display: flex;
  margin-top: 2rem;
}

.thermometer {
  $thermometer-width: 5rem;
  $inner-width: 1.875rem;
  $border-width: 0.375rem;

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
    height: 2.5rem;
    z-index: 2;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0;
    transition: height 1s;
    border-bottom: solid 2.1875rem $red;
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
  // The raw board size. Keep in mind this gets distorted due to rotation + skew
  $boardSize: min(50vw, 60vh);

  display: grid;
  transform: rotate($boardRotation) skew($skewDeg, $skewDeg);
  grid-template-rows: repeat($grid-width, 1fr);
  grid-template-columns: repeat($grid-width, 1fr);
  width: $boardSize;
  height: $boardSize;
  margin: auto;
}
</style>
