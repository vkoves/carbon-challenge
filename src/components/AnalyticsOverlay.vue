<template>
  <focus-trap :returnFocusOnDeactivate="true" initialFocus="#analytics-close">
    <div class="overlay -analytics" @click="closeOverlay" @keydown.esc="closeOverlay">
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

        <p>
          Curious about how these calculations were made? Check out
          <router-link to="/about">Our About Page</router-link>.
        </p>

        <dl>
          <dt>Total Emissions</dt>
          <dd>
            {{ Math.round(totalEmissions) }} {{ SimulatorUnits.Emissions }}
          </dd>

          <dt>Est. Deg. Warming (by {{ SimEndYear }})</dt>
          <dd>
            {{ estDegWarming.toFixed(2) }} {{ SimulatorUnits.Temperature }}
          </dd>

          <!-- The total tile option weight is really only important to
              developers working on the app -->
          <!--
            <dt>Total Tile Option Weight:</dt>
            <dd>{{ totalWeight }}%</dd>

            <p>
              The total weight sets a maximum for the amount of emissions a user could
              possibly cut, so it's important this is as close to 100% as possible
            </p>
          -->
        </dl>

        <h2>Emissions by Sector/Tile</h2>

        <div class="graph-cont">
          <figure id="emissions-chart">

            <div class="tooltip"
              :class="{ '-visible': tooltipOpen, '-left': isTooltipLeft }">
              <template v-if="tooltipData">
                <div class="title-row">
                  <h1>{{ tooltipData.datum.year }}</h1>

                  <button @click="closeTooltip" class="btn -grey -small">Close</button>
                </div>

                <strong>Total Emissions:</strong>
                {{ tooltipData.totalEmissions.toFixed(2) }} GT (Gigatonnes)

                <ul>
                  <li>
                    <div class="legend-square -power"></div>
                    <strong>Power:</strong>
                    {{ tooltipData.datum.power.toFixed(2) }} GT
                  </li>
                  <li>
                    <div class="legend-square -factory"></div>
                    <strong>Industry:</strong>
                    {{ tooltipData.datum.factory.toFixed(2) }} GT
                  </li>
                  <li>
                    <div class="legend-square -home"></div>
                    <strong>Home:</strong>
                    {{ tooltipData.datum.home.toFixed(2) }} GT
                  </li>
                  <li>
                    <div class="legend-square -office"></div>
                    <strong>Office:</strong>
                    {{ tooltipData.datum.office.toFixed(2) }} GT
                  </li>
                  <li>
                    <div class="legend-square -farm"></div>
                    <strong>Agriculture:</strong>
                    {{ tooltipData.datum.farm.toFixed(2) }} GT
                  </li>

                  <li>
                    <div class="legend-square -forest"></div>
                    <strong>Forests:</strong>
                    {{ tooltipData.datum.forest.toFixed(2) }} GT
                  </li>
                </ul>
              </template>
            </div>
          </figure>
        </div>
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
  ITileDelta,
  // eslint-disable-next-line no-unused-vars
  ITotalEmissionsDatum,
  // OrigYearlyEmissionsGigaTonnes,
  SimEndYear,
  Simulator,
  SimulatorUnits,
} from '@/classes/simulator';

interface IEmissionsDatum {
  year: number;
  [TileOptionType: string]: number;
}

/**
 * The IEmissionsDatum after we apply the D3 stack function to it
 */
interface IStackedDatum {
  0: number;
  1: number;
  data: IEmissionsDatum;
}

interface ITooltipData {
  totalEmissions: number;
  datum: IEmissionsDatum;
}


@Options({
  name: 'AnalyticsOverlay',

  components: { FocusTrap },

  data: () => ({
    tooltipData: undefined,

    tooltipOpen: false,
    isTooltipLeft: false,
  }),

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

    closeTooltip() {
      this.tooltipOpen = false;

      d3.selectAll('.bar')
        .classed('-active', false);
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

  totalWeight: number = 0;

  // Expose needed constants and enums to template
  SimEndYear = SimEndYear;
  SimulatorUnits = SimulatorUnits;

  tickYears = [
    '2021', '2030', '2040', '2050', '2060', '2070', '2080', '2090', '2100'
  ];

  isTooltipLeft: boolean = false;
  tiles: Array<TileObj> = [];
  tooltipData?: ITooltipData;
  tooltipOpen: boolean = false;

  xScale: any;
  yScale: any;

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

    this.estDegWarming = Simulator.getThermometerDegrees(this.tiles);

    let totalWeight = 0;

    this.tiles.forEach(tile => {
      Object.values(tile.options)
        .forEach((option: IOption) => {
          if (option.weightPrcnt) {
            totalWeight += option.weightPrcnt;
          }
        });
    });

    this.totalWeight = totalWeight;
  }

  graphEmissionsOverTime(emissionsData: Array<ITotalEmissionsDatum>): void {
    const parsedData: Array<IEmissionsDatum> = emissionsData
      .map((datum: ITotalEmissionsDatum) => this.emissionsFromDatum(datum));

    const outerWidth = 1000;
    const outerHeight = 300;

    // set the dimensions and margins of the graph
    const width = outerWidth - this.graphMargins.left - this.graphMargins.right;
    const height = outerHeight - this.graphMargins.top - this.graphMargins.bottom;

    // append the svg object to the body of the page
    var svg = d3.select('#emissions-chart')
      .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 ${outerWidth} ${outerHeight}`)
        .attr('width', width + this.graphMargins.left + this.graphMargins.right)
        .attr('height', height + this.graphMargins.top + this.graphMargins.bottom)
      .append('g')
        .attr('transform',
              'translate(' + this.graphMargins.left + ',' + this.graphMargins.top + ')');

    // X axis
    this.xScale = d3.scaleBand()
      .range([ 0, width ])
      .domain(parsedData.map((d: IEmissionsDatum) => d.year.toString()));

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(this.xScale).tickValues(this.tickYears))
      .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // TODO: Move this into a constant
    const emissionGroups = [ 'factory', 'farm', 'forest', 'home', 'office', 'power' ];

    // Add Y axis
    this.yScale = d3.scaleLinear()
      .domain([0, 55])
      .range([ height, 0]);

    svg.append('g')
      .call(d3.axisLeft(this.yScale));

    const stackedData = d3.stack().keys(emissionGroups)(parsedData);

    svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
        .attr('class', 'bar-cont')
        .attr('class', d => `bar-cont -${d.key}`)
        .selectAll('rect')
        // enter a second time = loop subgroup per subgroup to add all
        // rectangles. We also coerce the types here
        .data((d: unknown) => d as Array<IStackedDatum>)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('data-year', (d: IStackedDatum) => d.data.year)
          .attr('x', (d: IStackedDatum) => {
            return this.xScale(d.data.year.toString());
          })
          .attr('y', (d: IStackedDatum) => {
            return this.yScale(d[1]);
          })
          .attr('height', (d: IStackedDatum) => {
            // Prevent negative heights from carbon sinks and just make them 0
            // height on the graph
            return Math.max(this.yScale(d[0]) - this.yScale(d[1]), 0);
          })
          .attr('width', this.xScale.bandwidth())
          .on('click', (event: PointerEvent, d: IStackedDatum) => {
            return this.barClick(event, d.data);
          });
  }

  /**
   * Sum up all of the emissions by each type, since the Simulator returns
   * emission data broken out by each option for specificity
   */
  emissionsFromDatum(datum: ITotalEmissionsDatum): IEmissionsDatum {
    const emissionsByType: IEmissionsDatum = { year: datum.year };

    Object.entries(datum.emissions).forEach(([ optType, emissions ]) => {
      emissionsByType[optType] = d3.sum(Object.values(emissions));
    });

    return emissionsByType;
  }

  barClick(event: PointerEvent, datum: IEmissionsDatum) {
    // Create a copy of the datum without the year so we can loop through the
    // other emissions
    const datumWithoutYear = Object.assign({}, datum);
    delete datumWithoutYear.year;

    // Add up all the data values (except the year)
    const totalEmissions = d3.sum(Object.values(datumWithoutYear));

    // Tooltips default to the right, but past 2070 we'll flip it
    const isTooltipLeft = datum.year >= 2070;
    const tooltipWidth = (d3.select('.tooltip').node() as HTMLDivElement).offsetWidth;

    const tooltipOffset = 3;
    const tooltipLeft = this.xScale(datum.year.toString())
      + this.graphMargins.left
      + (isTooltipLeft ? -tooltipWidth : this.xScale.bandwidth())
      + (isTooltipLeft ? -tooltipOffset : tooltipOffset);

    d3.select('.tooltip')
      .style('left', tooltipLeft + 'px');

    d3.selectAll('.bar')
      .classed('-active', false);

    d3.selectAll(`.bar[data-year="${datum.year}"]`)
      .classed('-active', true);

    this.tooltipData = { totalEmissions, datum };
    this.tooltipOpen = true;
    this.isTooltipLeft = isTooltipLeft;
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './styles/variables/colors';
@import './styles/variables/spacing';

h2 { margin-top: $standard; }

$homeColor:     #ff6b6b;
$powerColor:    #ffc200;
$officeColor:   #5c76ff;
$factoryColor:  #bd8d6b;
$farmColor:     #5cb860;
$forestColor:   #397a3c;

.graph-cont {
  overflow: auto;
  padding-top: 2rem;
}

figure {
  position: relative;
  width: 1000px;

  :deep(svg) {
    width: 100%;

    .bar-cont {
      &.-factory rect { fill: $factoryColor; }
      &.-farm rect { fill: $farmColor; }
      &.-home rect { fill: $homeColor; }
      &.-office rect { fill: $officeColor; }
      &.-power rect { fill: $powerColor; }
      &.-forest rect { fill: $forestColor; }
    }

    .bar {
      transition: filter 0.3s;
      cursor: pointer;
      stroke: $white;

      &.-active { filter: brightness(0.7) }
    }
  }

  .legend-square {
    position: relative;
    top: 3px;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: solid 2px $white;
    border-radius: 1px;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 25%);
    margin-right: $standard;

    &.-factory { background: $factoryColor; }
    &.-farm { background: $farmColor; }
    &.-forest { background: $forestColor; }
    &.-home { background: $homeColor; }
    &.-office { background: $officeColor; }
    &.-power { background: $powerColor; }
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    padding: $standard;
    bottom: 0.5rem;
    min-width: 19rem;
    border-radius: 0.25rem;
    background-color: $white;
    border: solid 1px $light-grey;
    filter: drop-shadow(2px 2px 5px $shadow-medium);
    opacity: 0;
    transition: opacity 0.3s, left 0.3s;

    &::before {
      $tipWidth: 0.625rem;

      position: absolute;
      display: inline-block;
      border-top: $tipWidth solid transparent;
      border-right: $tipWidth solid $white;
      border-bottom: $tipWidth solid transparent;
      border-right-color: rgb(255 255 255);
      left: -$tipWidth;
      bottom: 5rem;
      content: "";
    }

    &.-visible {
      visibility: visible;
      opacity: 1;
    }

    &.-left {
      &::before {
        left: 100%;
        transform: rotate(180deg);
      }
    }

    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $standard;

      button { margin-top: 0; }
    }

    h1 { font-size: 1.5rem; }

    ul {
      margin-top: $standard;

      li { margin-top: $small; }
    }
  }
}

dl {
  dt {
    font-weight: bold;
    margin-top: $small;
  }
}

@media (max-width: $mobile-max-width) {
  .graph-cont {
    margin: 1rem -2rem 0 -2rem;
    border: solid 2px #dcdcdc;
    background: #ebebeb;
    padding-top: 1rem;
  }

  figure .tooltip {
    min-width: 220px;
    max-width: 50vw;

    ul { margin-top: 0.5rem; }
    ul li { margin-top: 0; }
  }
}
</style>
