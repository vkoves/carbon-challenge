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
          @click="currentOverlay = OverlayType.Policy">
          <img src="@/assets/checklist-white.svg" alt="" width="24" height="24">
          Policies
        </button>

        <button class="btn -transparent -small -flex"
          @click="currentOverlay = OverlayType.Analytics">
          <img src="@/assets/graph.svg" alt="" width="24" height="24">
          {{ $t('simulator.analytics') }}
        </button>

        <button class="btn -transparent -small -flex"
          @click="currentOverlay = OverlayType.Settings">
          <img src="@/assets/settings.svg" alt="" width="24" height="24">
          {{ $t('simulator.settings') }}
        </button>
      </div>
    </div>

    <div class="main-cont">
      <Thermometer :tiles="tiles"
        @helpClick="currentOverlay = OverlayType.Warming"
        @success="showSuccessState()"></Thermometer>

      <div class="boards-cont">
        <div class="simulator-board -main">
          <!-- Disabled tiles that aren't the selected one when is selected to
            prevent switching tiles too quickly and breaking the sidebar -->
          <Tile v-for="(tile, index) in tiles"
            v-bind:key="tile.id"
            :tile="tile"
            :tileNum="index"
            :disabled="selectedTile && tile.id !== selectedTile.id"
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

    <transition name="fade">
      <AnalyticsOverlay v-if="currentOverlay === OverlayType.Analytics"
        :tiles="tiles"
        @closed="closeOverlays()"></AnalyticsOverlay>
    </transition>

    <transition name="fade">
      <SettingsOverlay v-if="currentOverlay === OverlayType.Settings"
        :settings="settings"
        @closed="closeOverlays()"></SettingsOverlay>
    </transition>

    <transition name="fade">
      <WarmingOverlay v-if="currentOverlay === OverlayType.Warming"
        @closed="closeOverlays()"></WarmingOverlay>
    </transition>

    <transition name="fade">
      <PolicyOverlay v-if="currentOverlay === OverlayType.Policy"
        :settings="settings"
        :successState="successState"
        :tiles="tiles"
        @closed="closeOverlays()"></PolicyOverlay>
    </transition>
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
import PolicyOverlay from './PolicyOverlay.vue';
import SettingsOverlay from './SettingsOverlay.vue';
import Thermometer from './Thermometer.vue';
import Tile from './Tile.vue';
import TileOverlay from './TileOverlay.vue';
import WarmingOverlay from './WarmingOverlay.vue';

/* eslint-disable no-unused-vars */
export enum OverlayType {
  Analytics = 'analytics',
  Policy = 'policy',
  Settings = 'settings',
  Warming = 'warming',
}
/* eslint-enable no-unused-vars */

@Options({
  name: 'SimulatorBoard',

  components: {
    AnalyticsOverlay,
    PolicyOverlay,
    SettingsOverlay,
    Thermometer,
    Tile,
    TileOverlay,
    WarmingOverlay,
  },

  data: () => ({
    tiles: Simulator.generateTiles() as Array<TileObj>,

    selectedTile: null,

    settings: {
      magicModeEnabled: false,
      customPoliciesEnabled: false,
    } as ISimulatorSettings,


    /** The currentOverlay being shown if any. Of type OverlayType. */
    currentOverlay: undefined,

    /** Whether showing the policy overlay upon reaching < 1.5 deg. warming */
    successState: false,

    /** Whether the Escape key was recently pressed, which closes overlay */
    escPressed: false,

    // Expose OverlayType enum to the template
    OverlayType: OverlayType,
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
      this.currentOverlay = undefined;
      this.escPressed = true;

      // Reset successState on close
      this.successState = false;

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

    /**
     * Show the analytics overlay a short-delay after < 1.5 degrees is reached
     */
    showSuccessState(): void {
      setTimeout(() => {
        this.closeOverlays();

        // Wait 300ms after closing overlays to show the policy overlay in case
        // we had to close the tile sidebar
        setTimeout(() => {
          this.successState = true;
          this.currentOverlay = OverlayType.Policy;
        }, 300);
      }, 1000);
    }
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
  // Ensure the simulator always takes up almost the full screen height
  height: calc(100vh - 70px);
  padding: 4rem;
  box-sizing: border-box;
  overflow: hidden;
  color: $white;
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

// Small desktop styling (< 800px tall)
@media (max-height: 50rem) {
 main { padding: 1rem 2rem; }
 .thermometer-cont { margin-top: 0; }
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
      align-items: center;
    }
  }
}
</style>
