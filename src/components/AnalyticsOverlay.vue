<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#analytics-close">
    <div class="overlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content -large">
        <div class="title">
          <h1>Analytics</h1>

          <button id="analytics-close" class="btn -blue" @click="closeOverlay()">Close</button>
        </div>

        <h2>Total Warming Calculation</h2>

        <dl>
          <dt>Total Emissions</dt>
          <dd>
            {{ Math.round(totalEmissions) }} {{ SimulatorUnits.Emissions }}
          </dd>

          <dt>Degree Warming Calculation Method</dt>
          <dd>
            <span v-if="tempCalcMethod === TempCalcMethod.OverBudgetsEstimated">
              Over Known Budgets - Manually Estimated
            </span>
            <span v-if="tempCalcMethod === TempCalcMethod.TwoDegBudget">
              Near 2°C, used official carbon budget
            </span>
            <span v-if="tempCalcMethod === TempCalcMethod.OneAndAHalfDegBudget">
              Near 1.5°C, used official carbon budget
            </span>
          </dd>

          <dt>Est. Deg. Warming (by {{ SimEndYear }})</dt>
          <dd>
            {{ estDegWarming.toFixed(2) }} {{ SimulatorUnits.Temperature }}
          </dd>
        </dl>
      </div>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
// eslint-disable-next-line no-unused-vars
import { IOption } from '@/interfaces/tile-interfaces';

import { TempCalcMethod, Simulator, SimulatorUnits, SimEndYear } from '@/classes/simulator';

@Options({
  name: 'AnalyticsOverlay',

  components: { FocusTrap },

  props: {
    tiles: [],
  },

  emits: {
    closed(): void { },
  },

  methods: {
    closeOverlay() {
      this.$emit('closed');
    }
  }
})

/**
 * A component that renders an overlay showing all of the Simulator data and
 * assumptions so you can peek under the hood of the simulator and see why it
 * got the total it did.
 */
export default class AnalyticsOverlay extends Vue {
  totalEmissions: number = 0;
  estDegWarming: number = 0;
  tempCalcMethod: TempCalcMethod | null = null;

  // Expose needed constants and enums to template
  SimEndYear = SimEndYear;
  SimulatorUnits = SimulatorUnits;
  TempCalcMethod = TempCalcMethod;

  tiles: Array<TileObj> = [];

  calculateValues(): void {
    this.totalEmissions = Simulator.getTotalEmissions(this.tiles);
    this.tempCalcMethod = Simulator.getThermometerDegreesMethod(this.tiles);
    this.estDegWarming = Simulator.getThermometerDegrees(this.tiles);

    let totalWeight = 0;

    this.tiles.forEach(tile => {
      Object.values(tile.options)
        .forEach((option: IOption) => {
          totalWeight += option.weightPrcnt;
        });
    });

    // The total weight sets a maximum for the amount of emissions a user could
    // possibly cut, so it's important this is as close to 100% as possible
    console.info(`totalWeight: ${totalWeight}%`);
  }

  mounted(): void {
    this.calculateValues();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
dl {
  dt {
    font-weight: bold;
    margin-top: 0.5rem;
  }
}
</style>
