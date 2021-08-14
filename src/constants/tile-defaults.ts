import { IOption, IOptions, TileType, TileOption } from '../interfaces/tile-interfaces';

/**
 * All data is based on Our World in Data emissions by sector in April 2021, which
 * was showing emissions for 2016.
 */

/**
 * The total emissions in our "start year" (the year we use for the weight data)
 * in gigatonnes (billion tonnes) of eq. CO2.
 */
export const OrigYearlyEmissionsGigaTonnes = 49.4;

/**
 * A high bound estimate for the additional degrees of warming by 2100 per extra
 * GigaTonne of emissions. This is a high estimate based the Carbon Tracker
 * budgets page:
 *
 * https://carbontracker.org/carbon-budgets-where-are-we-now/
 *
 * To get this number, I took the IPCC 66% budget of 1,100 Gigatonnes CO2 and
 * divided the 2° warming that budget corresponds to by that value. This
 * yields ~0.001818 °C/Gigatonne, which I rounded up to 0.002. This seems
 * reasonable considering that emissions have a cascading effect, so emissions
 * beyond the 2°C threshold likely have greater effects than the emissions up
 * to that point.
 */
export const HighEstDegreesWarmingPerGigaTonne = 0.002;

const EmptyOption: IOption = {
  optionType: null,
  current: 0,
  target: 0,
  targetYear: 2050,
  weightPrcnt: 0,
};


/**
 * # Data I Need
 *
 * For each type tile option, I need:
 *
 * - The current value (e.g. the current % of cars that are electric)
 * - The current global policy target year and avg. (e.g. globally we are
 *   targeting 50% of cars to be electric by 2050)
 * - Expected emissions (emissions % times current emissions )
 *
 * I need this for the following tile options:
 *
 * - Factory electrification???
 * - Farm greening
 * - Office electrification
 */

export const RoadTransportTotalWeight = 11.9;

/**
 * Weights sourced from Our World in Data:
 * https://ourworldindata.org/ghg-emissions-by-sector
 */
export const DefaultTileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    // "Transport > Road transport" * 40% commercial
    [TileOption.FreightRoadTransport]: Object.assign({
      optionType: TileOption.FreightRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.4,
    }, EmptyOption),
    //
    [TileOption.Shipping]: Object.assign({}, EmptyOption, {
      optionType: TileOption.Shipping,
      weightPrcnt: 1.7,
    }),
    // This comes from "Energy use in industry"
    [TileOption.EnergyIndustry]: Object.assign({}, EmptyOption, {
      optionType: TileOption.EnergyIndustry,
      weightPrcnt:  24.2,
    }),
  },

  [TileType.Farm]: {
    [TileOption.LivestockAndManure]: Object.assign({}, EmptyOption, {
      optionType: TileOption.LivestockAndManure,
      weightPrcnt: 5.8,
    }),
    [TileOption.Deforestation]: Object.assign({}, EmptyOption, {
      optionType: TileOption.Deforestation,
      weightPrcnt: 2.2,
    }),
    // Called "Energy use in agriculture and fishing"
    [TileOption.EnergyAgriculture]: Object.assign({}, EmptyOption, {
      optionType: TileOption.EnergyAgriculture,
      weightPrcnt: 1.7,
    }),
  },

  [TileType.House]: {
    // "Transport > Road transport" * 60% passenger
    [TileOption.PassengerRoadTransport]: Object.assign({}, EmptyOption, {
      optionType: TileOption.PassengerRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.6,
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.EnergyResidential]: Object.assign({}, EmptyOption, {
      optionType: TileOption.EnergyResidential,
      weightPrcnt: 10.9,
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.Aviation]: Object.assign({}, EmptyOption, {
      optionType: TileOption.Aviation,
      weightPrcnt: 10.9,
    }),
  },

  [TileType.Office]: {
    // "Energy use in buildings > Commercial buildings"
    [TileOption.EnergyCommercialBuildings]: Object.assign({}, EmptyOption, {
      optionType: TileOption.EnergyCommercialBuildings,
      weightPrcnt: 6.6,
    }),
  },

  // Note: General power generation is segmented into its users, like commercial
  // buildings (office tile), industry (factory tile) and residential buildings
  // (house tile)
  [TileType.Power]: {
    [TileOption.FugitiveEmissions]: Object.assign({}, EmptyOption, {
      optionType: TileOption.FugitiveEmissions,
      weightPrcnt: 5.8,
    }),
    [TileOption.UnallocatedFuelCombustion]: Object.assign({}, EmptyOption, {
      optionType: TileOption.UnallocatedFuelCombustion,
      weightPrcnt: 7.8,
    }),
  },
};
