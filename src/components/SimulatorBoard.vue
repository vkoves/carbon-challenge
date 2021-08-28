<template>
  <main id="main-content">
    <div class="title-cont">
      <h1>{{ $t('title') }}</h1>

      <div class="btn-cont">
        <button class="btn -transparent -small -flex"
          @click="showingAnalytics = true">
          Analytics
          <img src="@/assets/graph.svg" alt="" width="24" height="24">
        </button>

        <button class="btn -transparent -small -flex"
          @click="showingSettings = true">
          Settings
          <img src="@/assets/settings.svg" alt="" width="24" height="24">
        </button>
      </div>
    </div>

    <div class="main-cont">
      <Thermometer :tiles="tiles"></Thermometer>

      <div class="boards-cont">
        <div class="simulator-board -main">
          <Tile v-for="(tile, index) in tiles"
            v-bind:key="tile.id"
            :tile="tile"
            :tileNum="index"
            :class="{ '-active': tile.id === selectedTile?.id }"
            @selected="selectTile(tile)" />
        </div>
      </div>
    </div>

    <TileOverlay
      :tile="selectedTile"
      :settings="settings"
      @closed="tileOverlayClosed($event)"
      @tile-updated="tileUpdated($event)"></TileOverlay>

    <AnalyticsOverlay v-if="showingAnalytics"
      :tiles="tiles"
      @closed="showingAnalytics = false"></AnalyticsOverlay>

    <SettingsOverlay v-if="showingSettings"
      :settings="settings"
      @closed="showingSettings = false"></SettingsOverlay>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Simulator } from '@/classes/simulator';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
// eslint-disable-next-line no-unused-vars
import { ISimulatorSettings } from '@/interfaces/settings';

import AnalyticsOverlay from './AnalyticsOverlay.vue';
import SettingsOverlay from './SettingsOverlay.vue';
import Tile from './Tile.vue';
import TileOverlay from './TileOverlay.vue';
import Thermometer from './Thermometer.vue';

@Options({
  name: 'SimulatorBoard',

  components: {
    AnalyticsOverlay,
    SettingsOverlay,
    Thermometer,
    Tile,
    TileOverlay,
  },

  data: () => ({
    tiles: Simulator.generateTiles() as Array<TileObj>,

    selectedTile: null,

    settings: {
      magicModeEnabled: false,
      customPoliciesEnabled: false,
    } as ISimulatorSettings,

    showingTileMenu: false,
    showingAnalytics: false,
    showingSettings: false,
  }),

  methods: {
    selectTile(tile: TileObj) {
      this.selectedTile = tile;
    },

    tileUpdated(tile: TileObj) {
      // Make sure the tile updates any computed properties based on its options
      tile.recalculateProperties();

      // Re-assign the tiles array to propagate changes
      this.tiles = this.tiles.slice();
    },

    tileOverlayClosed(tileId: number) {
      // If the selectedTile is the same as it was when we closed the overlay,
      // clear the selected tile. This safety check is in place to fix issues
      // where selecting one tile during the close animation broke things
      if (this.selectedTile.id === tileId) {
        this.selectedTile = null;
      }
    }
  }
})

export default class SimulatorBoard extends Vue { }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/board';
@import './styles/variables/colors';
@import './styles/variables/spacing';

main {
  padding: 6rem;
  color: $white;
  overflow: hidden;
}

.title-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn-cont {
    display: flex;
    gap: $standard;

    button {
      margin-top: 0;
      padding: $small;
    }
  }
}

.main-cont {
  display: flex;
  margin-top: 2rem;
}

.boards-cont {
  position: relative;
  width: 100%;
}

.simulator-board {
  // The raw board size. Keep in mind this gets distorted due to rotation + skew
  $boardSize: min(40vw, 60vh);

  display: grid;
  transform: rotate($boardRotation) skew($skewDeg, $skewDeg);
  grid-template-rows: repeat($grid-width, 1fr);
  grid-template-columns: repeat($grid-width, 1fr);
  width: $boardSize;
  height: $boardSize;
  margin: auto;
}

// Mobile styling
@media (max-width: $mobile-max-width) {
  main { padding: 3rem; }
}
</style>
