<template>
  <main id="main-content">
    <div class="title-cont">
      <h1>
        {{ $t('title') }}

        <transition name="fade">
          <img v-if="settings.magicModeEnabled"
            src="@/assets/magic-wand.svg"
            class="setting-indicator -magic-mode"
            title="Magic mode is enabled!"
            alt="Magic mode enabled" width="24" height="24">
        </transition>
        <transition name="fade">
          <img v-if="settings.customPoliciesEnabled"
            src="@/assets/graph.svg"
            class="setting-indicator -cust-policies"
            alt="Custom policies enabled"
            title="Custom policies are enabled!"
            width="24" height="24">
        </transition>
      </h1>

      <div class="btn-cont">
        <button class="btn -transparent -small -flex"
          @click="showingAnalytics = true">
          {{ $t('simulator.analytics') }}
          <img src="@/assets/graph.svg" alt="" width="24" height="24">
        </button>

        <button class="btn -transparent -small -flex"
          @click="showingSettings = true">
          {{ $t('simulator.settings') }}
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
            :disabled="selectedTile"
            :class="{ '-active': tile.id === selectedTile?.id }"
            @selected="selectTile(tile)" />
        </div>
      </div>
    </div>

    <TileOverlay
      :tile="selectedTile"
      :settings="settings"
      :escPressed="escPressed"
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

    escPressed: false,

    showingAnalytics: false,
    showingSettings: false,
  }),

  methods: {
    selectTile(tile: TileObj): void {
      this.selectedTile = tile;
    },

    tileUpdated(tile: TileObj): void {
      // Make sure the tile updates any computed properties based on its options
      tile.recalculateProperties();

      // Re-assign the tiles array to propagate changes
      this.tiles = this.tiles.slice();
    },

    /**
     * Clear the selectedTile once the overlay finishes closing to prevent
     * clearing the UI while it's hiding. To prevent glitches we also disabled
     * selecting a new tile until there's no selectedTile
     */
    tileOverlayClosed(): void {
      this.selectedTile = null;
    },

    /**
     * Close all overlays - triggered on press of the Esc key on the document
     */
    closeOverlays(): void {
      this.showingAnalytics = false;
      this.showingSettings = false;

      this.escPressed = true;

      // We only set escPressed very momentarily, as it's basically an event
      // emitter down into child components
      setTimeout(() => {
        this.escPressed = false;
      }, 50);
    },

    /**
     * A listener for the keypress on the document, so we can close child
     * overlays on press of Escape even if the overlay isn't focused
     */
    handleGlobalKeydown(keyEvent: KeyboardEvent): void {
      if (keyEvent.key === 'Escape') {
        this.closeOverlays();
      }
    },
  },

  mounted(): void {
    document.addEventListener('keydown', this.handleGlobalKeydown);
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

  .setting-indicator {
    margin-left: $standard;

    &.-magic-mode {
      animation: bob 2s ease-in-out 0s infinite alternate;
      animation-iteration-count: infinite;
    }
  }

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
  main { padding: 1rem; }

  .title-cont { flex-wrap: wrap; }

  .simulator-board {
    // The raw board size. Keep in mind this gets distorted due to rotation + skew
    $boardSizeMobile: min(52vw, 50vh);

    width: $boardSizeMobile;
    height: $boardSizeMobile;
  }

  @media (orientation: portrait) {
    .main-cont {
      margin-top: 4rem;
      flex-direction: column-reverse;
    }
  }
}
</style>
