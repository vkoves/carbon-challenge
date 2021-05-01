<template>
  <div class="overlay">
    <!-- TODO: Move all text to come from i18n -->
    <div class="debug-cont">
      <div class="title">
        <h1>Debug View</h1>

        <button class="btn -blue" @click="closeOverlay()">Close</button>
      </div>

      <h2>Total Warming Calculation</h2>

      <dl>
        <dt>Total Emissions</dt>
        <dd>
          {{ totalEmissions }} {{ SimulatorUnits.Emissions }}
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

        <dt>Est. Deg. Warming (by {{ SimulationEndYear }})</dt>
        <dd>
          {{ estDegWarming }} {{ SimulatorUnits.Temperature }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
// eslint-disable-next-line no-unused-vars
import { IOption } from '@/interfaces/tile-interfaces';

import { TempCalcMethod, Simulator, SimulatorUnits, SimulationEndYear } from '@/classes/simulator';
// import { TileObj } from '@/classes/tile-obj';

@Options({
  name: 'DebugView',

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
export default class DebugView extends Vue {
  totalEmissions: number | null = null;
  estDegWarming: number | null = null;
  tempCalcMethod: TempCalcMethod | null = null;

  // Expose needed constants and enums to template
  SimulationEndYear = SimulationEndYear;
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
          totalWeight += option.weight;
        });
    });

    // The total weight sets a maximum for the amount of emissions a user could
    // possibly cut, so it's important this is as close to 100% as possible
    console.log(`totalWeight: ${totalWeight}%`);
  }

  mounted(): void {
    this.calculateValues();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';


.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.debug-cont {
  flex-basis: 800px;
  margin: 0 auto 5rem auto;
  background-color: #000;
  border-radius: 0.5rem;
  padding: 1rem;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn { margin-top: 0; }
  }

  dl {
    dt {
      font-weight: bold;
      margin-top: 0.5rem;
    }
  }
}
</style>
