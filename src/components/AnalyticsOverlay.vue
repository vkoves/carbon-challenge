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

  tickYears = [
    '2020', '2021', '2030', '2040', '2050', '2060', '2070', '2080', '2090', '2100'
  ];

  tiles: Array<TileObj> = [];

  xScale: any;

  graphMargins = { top: 30, right: 30, bottom: 70, left: 60 };

  mounted(): void {
    const currYear = Simulator.getCurrentYear();

    // Filter ticks to only those in present or future
    this.tickYears = this.tickYears
      .filter(tick => Number.parseInt(tick) >= currYear);

    this.calculateValues();
  }

  calculateValues(): void {
    const totalEmissionsData = Simulator.getTotalEmissionsData(this.tiles);

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
    const width = 1000 - this.graphMargins.left - this.graphMargins.right;
    const height = 300 - this.graphMargins.top - this.graphMargins.bottom;

    // append the svg object to the body of the page
    var svg = d3.select('#emissions-chart')
      .append('svg')
        .attr('width', width + this.graphMargins.left + this.graphMargins.right)
        .attr('height', height + this.graphMargins.top + this.graphMargins.bottom)
      .append('g')
        .attr('transform',
              'translate(' + this.graphMargins.left + ',' + this.graphMargins.top + ')');

    // X axis
    this.xScale = d3.scaleBand()
      .range([ 0, width ])
      .domain(emissionsData.map((d: ITotalEmissionsDatum) => d.year.toString()));

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(this.xScale).tickValues(this.tickYears))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // Add Y axis
    var yScale = d3.scaleLinear()
      .domain([0, 55])
      .range([ height, 0]);
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Bars
    svg.selectAll('mybar')
      .data(emissionsData)
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('data-year', (d: ITotalEmissionsDatum) => d.year)
        .attr('x', (d: ITotalEmissionsDatum) => {
          return this.xScale(d.year.toString()) as number;
        })
        .attr('y', (d: ITotalEmissionsDatum) => yScale(this.emissionsFromDatum(d)))
        .attr('width', this.xScale.bandwidth())
        .attr('height', (d: ITotalEmissionsDatum) => height - yScale(this.emissionsFromDatum(d)))
        .on('click', this.barClick.bind(this));

    d3.select('#emissions-chart')
      .append('div')
      .attr('class', 'tooltip');
  }

  emissionsFromDatum(datum: ITotalEmissionsDatum): number {
    return d3.sum(Object.values(datum.deltas)) + OrigYearlyEmissionsGigaTonnes;
  }

  barClick(event: PointerEvent, datum: ITotalEmissionsDatum) {
    const totalEmissions = this.emissionsFromDatum(datum).toFixed(2);

    const tooltipOffset = 15;
    const tooltipLeft = this.xScale(datum.year.toString())
      + this.graphMargins.left
      + tooltipOffset;

    d3.select('.tooltip')
      .html(`<h1>${datum.year}</h1> Emissions: ${totalEmissions} Gigatonnes`)
      .style('left', tooltipLeft + 'px')
      .classed('-visible', true);

    d3.selectAll('.bar')
      .classed('-active', false);

    d3.select(`.bar[data-year="${datum.year}"]`)
      .classed('-active', true);
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';

h2 { margin-top: $standard; }

figure ::v-deep {
  position: relative;

  .bar {
    transition: fill 0.3s;
    fill: $blue;
    cursor: pointer;
    stroke: $white;

    &:hover { fill: $dark-blue; }
    &.-active { fill: $dark-blue; }
  }

  .tooltip {
    position: absolute;
    padding: $small;
    bottom: 100px;
    min-width: 14rem;
    border-radius: 0.25rem;
    background-color: $white;
    border: solid 1px $light-grey;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5) ;
    opacity: 0;
    transition: opacity 0.3s;

    &::before {
      $tipWidth: 10px;

      position: absolute;
      display: inline-block;
      border-top: $tipWidth solid transparent;
      border-right: $tipWidth solid $white;
      border-bottom: $tipWidth solid transparent;
      border-right-color: rgb(255 255 255);
      left: -$tipWidth;
      top: 20px;
      content: "";
    }

    &.-visible { opacity: 1; }

    h1 { font-size: 1.25rem; }
  }
}

dl {
  dt {
    font-weight: bold;
    margin-top: $small;
  }
}
</style>
