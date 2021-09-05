<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#analytics-close">
    <div class="overlay" @click="closeOverlay" @keydown.esc="closeOverlay">
      <!-- TODO: Move all text to come from i18n -->
      <div class="overlay-content -large" @click="absorbClick">
        <div class="title">
          <h1>Analytics</h1>

          <button id="analytics-close" class="btn -blue -light"
            @click="closeOverlay">
            Close
          </button>
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

          <dt>Total Tile Option Weight:</dt>
          <dd>{{ totalWeight }}%</dd>

          <p>
            The total weight sets a maximum for the amount of emissions a user could
            possibly cut, so it's important this is as close to 100% as possible
          </p>

          <figure id="emissions-chart">
          </figure>
        </dl>
      </div>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { FocusTrap } from 'focus-trap-vue';

import * as d3 from 'd3';

// eslint-disable-next-line no-unused-vars
import { TileObj } from '@/classes/tile-obj';
// eslint-disable-next-line no-unused-vars
import { IOption } from '@/interfaces/tile-interfaces';

import {
  // eslint-disable-next-line no-unused-vars
  ITotalEmissionsDatum,
  OrigYearlyEmissionsGigaTonnes,
  SimEndYear,
  Simulator,
  SimulatorUnits,
  TempCalcMethod,
} from '@/classes/simulator';

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
    /**
     * Absorb click events to the content to prevent closing it
     */
    absorbClick(clickEvent: MouseEvent) {
      clickEvent.stopPropagation();
    },

    closeOverlay() {
      this.$emit('closed');
    },
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

  totalWeight: number = 0;

  // Expose needed constants and enums to template
  SimEndYear = SimEndYear;
  SimulatorUnits = SimulatorUnits;
  TempCalcMethod = TempCalcMethod;

  tiles: Array<TileObj> = [];

  calculateValues(): void {
    const totalEmissionsData = Simulator.getTotalEmissionsData(this.tiles);

    console.log({ 'totalEmissionsData': totalEmissionsData.data });

    this.graphEmissionsOverTime(totalEmissionsData.data);

    this.totalEmissions = totalEmissionsData.total;

    this.tempCalcMethod = Simulator.getThermometerDegreesMethod(this.tiles);
    this.estDegWarming = Simulator.getThermometerDegrees(this.tiles);

    let totalWeight = 0;

    this.tiles.forEach(tile => {
      Object.values(tile.options)
        .forEach((option: IOption) => {
          totalWeight += option.weightPrcnt;
        });
    });

    this.totalWeight = totalWeight;
  }

  graphEmissionsOverTime(emissionsData: Array<ITotalEmissionsDatum>): void {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#emissions-chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var xScale = d3.scaleBand()
      .padding(0.2)
      .range([ 0, width ])
      .domain(emissionsData.map((d: ITotalEmissionsDatum) => d.year.toString()));
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Bars
    svg.selectAll("mybar")
      .data(emissionsData)
      .enter()
      .append("rect")
        .attr("x", (d: ITotalEmissionsDatum) => xScale(d.year.toString()) as number)
        .attr("y", (d: ITotalEmissionsDatum) => yScale(d3.sum(Object.values(d.deltas)) + OrigYearlyEmissionsGigaTonnes))
        .attr("width", xScale.bandwidth())
        .attr("height", (d: ITotalEmissionsDatum) => height - yScale(d3.sum(Object.values(d.deltas)) + OrigYearlyEmissionsGigaTonnes))
        .attr("fill", "#69b3a2");
  }

  mounted(): void {
    this.calculateValues();
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/spacing';

h2 { margin-top: $standard; }

dl {
  dt {
    font-weight: bold;
    margin-top: $small;
  }
}
</style>
