<template>
  <div class="thermometer-cont">
    <div class="thermometer">
      <div class="stem">
        <div class="stem-inner"
          v-bind:style="{ height: avgTempAdjusted + '%' }"></div>
        <div class="tick"></div>
        <div class="tick"></div>
        <div class="tick"></div>
      </div>
      <div class="bulb"></div>
    </div>

    <div class="text">
      <div class="temp">{{ avgTempRise.toFixed(2) }} °C</div>
      <p class="label">{{ $t('simulator.avgTempLabel') }}</p>

      <div class="emoji">
        <span v-if="avgTempRise < TempThresholds.great">
          😌
        </span>
        <span v-else-if="avgTempRise < TempThresholds.okay">
          😬
        </span>
        <span v-else-if="avgTempRise < TempThresholds.bad">
          😨
        </span>
        <span v-else-if="avgTempRise < TempThresholds.horrifying">
          😰
        </span>
      </div>

      <button class="btn -transparent -small -flex"
        @click="helpClicked">
        <img src="@/assets/help-outline.svg"
          :alt="$t('simulator.tempHelpLabel')"
          width="24" height="24">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { TileObj } from '@/classes/tile-obj';
import { Simulator } from '@/classes/simulator';

import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Thermometer',

  props: {
    tiles: [],
  },

  data: () => ({
    TempThresholds: {
      great: 1.5,
      okay: 2,
      bad: 2.5,
      // Anything over 2.5 is horrifying, but we know the simulator can't go up
      // to 100
      horrifying: 100,
    }
  }),

  emits: {
    /**
     * Emits when the help button is clicked, which should show the warming info
     * overlay
     */
    helpClick(): void { },

    /** Emits when < 1.5 is reached, which should show the success UI */
    success(): void { },
  },

  methods: {
    helpClicked() {
      this.$emit('helpClick');
    }
  },

  watch: {
    // On tiles changed (likely options updated) recalculate temperature
    tiles: function(newVal) {
      if (!newVal) {
        return;
      }

      this.calculateTemperature();
    }
  }
})

export default class Thermometer extends Vue {
  /** The actual predicted average temperature rise */
  avgTempRise: number = 0;

  tiles: Array<TileObj> = [];

  /** A % equivalent of the temperature. Used to show the height of the
    thermometer. */
  avgTempAdjusted: number = 0;

  // What 100% of the .stem-inner height equates to in degrees
  static readonly MaxTempRise: number = 3;

  calculateTemperature(): void {
    this.avgTempRise = Simulator.getThermometerDegrees(this.tiles);

    // Convert decimal temperature rise to a %
    this.avgTempAdjusted = (this.avgTempRise / Thermometer.MaxTempRise) * 100;

    if (this.avgTempRise < 1.5) {
      this.$emit('success');
    }
  }

  // On Thermometer component being mounted, calculate avg. warming
  mounted() {
    this.calculateTemperature();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';


$thermometer-width: 5rem;
$inner-width: 1.875rem;
$border-width: 0.375rem;

.thermometer-cont {
  margin-top: $large;
  width: $thermometer-width;
}

.thermometer {
  position: relative;
  width: $thermometer-width;
  flex-shrink: 0;

  $red: red;

  .bulb, .stem {
    border: solid $border-width $white;
    box-sizing: border-box;
  }

  .stem {
    position: relative;
    overflow: hidden;
    width: $inner-width + $border-width * 2;
    height: 25rem;
    max-height: 40vh;
    margin: auto;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
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
    width: $thermometer-width;
    height: $thermometer-width;
    border-radius: 100%;
    position: relative;
    top: -1rem;
  }
}

.text {
  text-align: center;
  font-size: 0.8rem;

  .emoji {
    font-size: 2.5rem;
    margin-top: $standard;
  }

  .temp {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .label { margin-top: 0; }
}

// Mobile styling
@media (max-width: $mobile-max-width) {
  // Hide the thermometer and show text only on mobile
  .thermometer { display: none; }

  // Increse padding if in portrait mode to space the thermoeter from the game
  // board
  @media (orientation: portrait) {
    .thermometer-cont { margin-top: 4rem; }
  }
}
</style>
