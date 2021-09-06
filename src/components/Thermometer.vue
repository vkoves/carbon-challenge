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

.thermometer-cont {
  margin-top: $large;
}

.thermometer {
  $thermometer-width: 5rem;
  $inner-width: 1.875rem;
  $border-width: 0.375rem;

  position: relative;
  width: $thermometer-width;
  margin: 0 $standard;
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
  .thermometer-cont { margin-top: 4rem; }

  .thermometer { display: none; }
}
</style>
