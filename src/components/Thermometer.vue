<template>
  <div class="thermometer" @click="recalculateTemps()">
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
  },

  watch: {
    // On tiles changed (likely options updatd)
    tiles: function(newVal) {
      if (!newVal) {
          return;
      }

      this.recalculateTemps();
    }
  }
})

export default class Thermometer extends Vue { }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';

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
</style>