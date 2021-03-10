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
          <Tile v-for="tile in tiles" v-bind:key="tile.id"
            :tile="tile"
            @data-updated="selectTile(tile)" />
        </div>
      </div>
    </div>

    <div @click="clearSelectedTile()"
      class="overlay" :class="{ '-open': showingTileMenu }">
      <transition name="slide-fade">
        <div class="sidebar" v-if="showingTileMenu">
          <button @click="clearSelectedTile()" class="btn">
            {{ $t('simulator.close') }}
          </button>
          <h2>{{ $t(`simulator.tileTypes.${selectedTile.type}`) }}</h2>

          <div v-for="(option, key) in selectedTile.options" :key="key">
              <h3>{{ $t(`simulator.tileOptions.${key}`) }}</h3>

              <ul>
                <li>
                  {{ $t('simulator.tileOverlay.current') }}:
                  {{ option.current * 100 + '%' }}
                </li>
                <li>
                  {{ $t('simulator.tileOverlay.target') }}:
                  {{ option.target * 100 + '%' }}
                </li>
                <li>
                  {{ $t('simulator.tileOverlay.targetYear') }}:
                  {{ option.targetYear }}
                </li>
              </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { Simulator, TileObj } from '../simulator';
import Tile from './Tile.vue';

@Options({
  name: 'Game',
  components: {
    Tile,
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
      this.showingTileMenu = true;

      this.recalculateTemps();
    },

    clearSelectedTile() {
      this.showingTileMenu = false;
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
  padding: 100px;
  color: $white;
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

.overlay {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 2;
  transition: background-color 0.3s;
  background-color: rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &:not(.-open) {
    background-color: transparent;
    pointer-events: none;
  }

  &.-open .sidebar {
    // right: 0;
  }

  &:not(.-open) .sidebar {
    // right: -40%;
  }

  .sidebar {
    // position: absolute;
    // transition: right 0.5s;
    padding: 50px;
    height: 100%;
    width: 40%;
    box-sizing: border-box;
    backdrop-filter: brightness(0.5) blur(10px);

    h2, h3 { margin-top: 1rem; }
  }
}
</style>
