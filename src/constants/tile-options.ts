import { IOption, IOptions, IOptionPolicy, TileType, TileOption } from '../interfaces/tile-interfaces';
import { TilePolicies, TilePolicyKey } from './tile-policies';

const EmptyOption: IOption = {
  optionType: null,
  current: 0,
  target: 0,
  targetYear: 2050,
  weightPrcnt: 0,
  currPolicyKey: TilePolicyKey.None,
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

const RoadTransportTotalWeight = 11.9;

/**
 * Create a new option, using EmptyOption to fill in default values
 */
function createOption(optParams: any): IOption {
  return Object.assign({}, EmptyOption, optParams);
}

/**
 * The tile options that are available for each tile type.
 *
 * Weights sourced from Our World in Data:
 * https://ourworldindata.org/ghg-emissions-by-sector
 */
export const TileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    // "Transport > Road transport" * 40% commercial
    [TileOption.FreightRoadTransport]: createOption({
      optionType: TileOption.FreightRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.4,
      policies: TilePolicies[TileOption.FreightRoadTransport]
    }),
    //
    [TileOption.Shipping]: createOption({
      optionType: TileOption.Shipping,
      weightPrcnt: 1.7,
      policies: TilePolicies[TileOption.Shipping]
    }),
    // This comes from "Energy use in industry"
    [TileOption.EnergyIndustry]: createOption({
      optionType: TileOption.EnergyIndustry,
      weightPrcnt:  24.2,
      policies: TilePolicies[TileOption.EnergyIndustry]
    }),
  },

  [TileType.Farm]: {
    [TileOption.LivestockAndManure]: createOption({
      optionType: TileOption.LivestockAndManure,
      weightPrcnt: 5.8,
      policies: TilePolicies[TileOption.LivestockAndManure]
    }),
    [TileOption.Deforestation]: createOption({
      optionType: TileOption.Deforestation,
      weightPrcnt: 2.2,
      policies: TilePolicies[TileOption.Deforestation]
    }),
    // Called "Energy use in agriculture and fishing"
    [TileOption.EnergyAgriculture]: createOption({
      optionType: TileOption.EnergyAgriculture,
      weightPrcnt: 1.7,
      policies: TilePolicies[TileOption.EnergyAgriculture]
    }),
  },

  [TileType.Home]: {
    // "Transport > Road transport" * 60% passenger
    [TileOption.PassengerRoadTransport]: createOption({
      optionType: TileOption.PassengerRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.6,
      policies: TilePolicies[TileOption.PassengerRoadTransport]
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.EnergyResidential]: createOption({
      optionType: TileOption.EnergyResidential,
      weightPrcnt: 10.9,
      policies: TilePolicies[TileOption.EnergyResidential]
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.Aviation]: createOption({
      optionType: TileOption.Aviation,
      weightPrcnt: 10.9,
      policies: TilePolicies[TileOption.Aviation]
    }),
  },

  [TileType.Office]: {
    // "Energy use in buildings > Commercial buildings"
    [TileOption.EnergyCommercialBuildings]: createOption({
      optionType: TileOption.EnergyCommercialBuildings,
      weightPrcnt: 6.6,
      policies: TilePolicies[TileOption.EnergyCommercialBuildings]
    }),
  },

  // Note: General power generation is segmented into its users, like commercial
  // buildings (office tile), industry (factory tile) and residential buildings
  // (home tile)
  [TileType.Power]: {
    [TileOption.FugitiveEmissions]: createOption({
      optionType: TileOption.FugitiveEmissions,
      weightPrcnt: 5.8,
      policies: TilePolicies[TileOption.FugitiveEmissions]
    }),
    [TileOption.UnallocatedFuelCombustion]: createOption({
      optionType: TileOption.UnallocatedFuelCombustion,
      weightPrcnt: 7.8,
      policies: TilePolicies[TileOption.UnallocatedFuelCombustion]
    }),
  },
};
