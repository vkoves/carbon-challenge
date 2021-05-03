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
  weight: 0,
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

/**
 * Weights sourced from Our World in Data:
 * https://ourworldindata.org/ghg-emissions-by-sector
 */
export const DefaultTileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    [TileOption.BusinessElectricVehicleShare]: Object.assign({
      optionType: TileOption.BusinessElectricVehicleShare,
      weight: 11.9 * 0.4, // "Transport > Road transport" * 40% commercial
    }, EmptyOption),
    // "Transport > Road transport" * 40% commercial
    [TileOption.Shipping]: Object.assign({}, EmptyOption, {
      optionType: TileOption.Shipping,
      weight: 1.7,
    }),
    // This comes from "Energy use in industry"
    [TileOption.RenewableShare]: Object.assign({}, EmptyOption, {
      optionType: TileOption.RenewableShare,
      weight:  24.2,
    }),
  },

  [TileType.Farm]: {
    [TileOption.Deforestation]: Object.assign({}, EmptyOption, {
      optionType: TileOption.Deforestation,
      weight: 2.2,
    }),
    // Called "Energy use in agriculture and fishing"
    [TileOption.RenewableShareAgriculture]: Object.assign({}, EmptyOption, {
      optionType: TileOption.RenewableShareAgriculture,
      weight: 1.7,
    }),
  },

  [TileType.House]: {
    // "Transport > Road transport" * 60% passenger
    [TileOption.ResidentialElectricCarShare]: Object.assign({}, EmptyOption, {
      optionType: TileOption.ResidentialElectricCarShare,
      weight: 11.9 * 0.6,
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.RenewableShare]: Object.assign({}, EmptyOption, {
      optionType: TileOption.RenewableShare,
      weight: 10.9,
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.AviationElectrification]: Object.assign({}, EmptyOption, {
      optionType: TileOption.AviationElectrification,
      weight: 10.9,
    }),
  },

  [TileType.Office]: {
    // "Energy use in buildings > Commercial buildings"
    [TileOption.RenewableShare]: Object.assign({}, EmptyOption, {
      optionType: TileOption.RenewableShare,
      weight: 6.6,
    }),
  },

  [TileType.Power]: {
    [TileOption.FugitiveEmissionsReduction]: Object.assign({}, EmptyOption, {
      optionType: TileOption.FugitiveEmissionsReduction,
      weight: 5.8,
    }),
    [TileOption.LivestockAndManure]: Object.assign({}, EmptyOption, {
      optionType: TileOption.LivestockAndManure,
      weight: 5.8,
    }),
  },
};
