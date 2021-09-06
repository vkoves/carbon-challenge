import { IOption, IOptions, IOptionPolicy, TileType, TileOption } from '../interfaces/tile-interfaces';
import {
  CustomPolicy,
  NonePolicy,
  TilePolicies,
  TilePolicyKey
} from './tile-policies';

/**
 * The params we need to create a new option. Everything else comes from the
 * defaults in DefaultOptionValues
 */
interface ICreateOptionParams {
  tileType: TileType;
  optionType: TileOption;
  weightPrcnt: number;
  policies: Array<IOptionPolicy>;
}

const DefaultOptionValues = {
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
 * Create a new option, using DefaultOptionValues to fill in default values
 */
function createOption(optParams: ICreateOptionParams): IOption {
  return Object.assign({}, DefaultOptionValues, optParams);
}

/**
 * Get the policies for a certain tile option, ensuring the NonePolicy is added
 * as the first option and custom is added as the last
 */
function getPolicies(policyKey: TileOption): Array<IOptionPolicy> {
  return [ NonePolicy ]
    .concat(TilePolicies[policyKey])
    .concat([ CustomPolicy ]);
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
      tileType: TileType.Factory,
      optionType: TileOption.FreightRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.4,
      policies: getPolicies(TileOption.FreightRoadTransport)
    }),
    [TileOption.Shipping]: createOption({
      tileType: TileType.Factory,
      optionType: TileOption.Shipping,
      weightPrcnt: 1.7,
      policies: getPolicies(TileOption.Shipping)
    }),
    // This comes from "Energy use in industry"
    [TileOption.EnergyIndustry]: createOption({
      tileType: TileType.Factory,
      optionType: TileOption.EnergyIndustry,
      weightPrcnt:  24.2,
      policies: getPolicies(TileOption.EnergyIndustry)
    }),
    [TileOption.DirectIndustrialProcesses]: createOption({
      tileType: TileType.Factory,
      optionType: TileOption.DirectIndustrialProcesses,
      weightPrcnt:  5.2,
      policies: getPolicies(TileOption.DirectIndustrialProcesses)
    }),
  },

  [TileType.Farm]: {
    [TileOption.LivestockAndManure]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.LivestockAndManure,
      weightPrcnt: 5.8,
      policies: getPolicies(TileOption.LivestockAndManure)
    }),
    [TileOption.Deforestation]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.Deforestation,
      weightPrcnt: 2.2,
      policies: getPolicies(TileOption.Deforestation)
    }),
    // Called "Energy use in agriculture and fishing"
    [TileOption.EnergyAgriculture]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.EnergyAgriculture,
      weightPrcnt: 1.7,
      policies: getPolicies(TileOption.EnergyAgriculture)
    }),
    [TileOption.Cropland]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.Cropland,
      weightPrcnt: 1.4,
      policies: getPolicies(TileOption.Cropland)
    }),
    [TileOption.CropBurning]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.CropBurning,
      weightPrcnt: 3.5,
      policies: getPolicies(TileOption.CropBurning)
    }),
    [TileOption.AgriculturalSoils]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.AgriculturalSoils,
      weightPrcnt: 4.1,
      policies: getPolicies(TileOption.AgriculturalSoils)
    }),
  },

  [TileType.Home]: {
    // "Transport > Road transport" * 60% passenger
    [TileOption.PassengerRoadTransport]: createOption({
      tileType: TileType.Home,
      optionType: TileOption.PassengerRoadTransport,
      weightPrcnt: RoadTransportTotalWeight * 0.6,
      policies: getPolicies(TileOption.PassengerRoadTransport)
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.EnergyResidential]: createOption({
      tileType: TileType.Home,
      optionType: TileOption.EnergyResidential,
      weightPrcnt: 10.9,
      policies: getPolicies(TileOption.EnergyResidential)
    }),
    // "Energy use in buildings > Residential buildings"
    [TileOption.Aviation]: createOption({
      tileType: TileType.Home,
      optionType: TileOption.Aviation,
      weightPrcnt: 1.9,
      policies: getPolicies(TileOption.Aviation)
    }),
    [TileOption.Waste]: createOption({
      tileType: TileType.Home,
      optionType: TileOption.Waste,
      weightPrcnt: 3.2,
      policies: getPolicies(TileOption.Waste)
    }),
  },

  [TileType.Office]: {
    // "Energy use in buildings > Commercial buildings"
    [TileOption.EnergyCommercialBuildings]: createOption({
      tileType: TileType.Office,
      optionType: TileOption.EnergyCommercialBuildings,
      weightPrcnt: 6.6,
      policies: getPolicies(TileOption.EnergyCommercialBuildings)
    }),
  },

  // Note: General power generation is segmented into its users, like commercial
  // buildings (office tile), industry (factory tile) and residential buildings
  // (home tile)
  [TileType.Power]: {
    [TileOption.FugitiveEmissions]: createOption({
      tileType: TileType.Power,
      optionType: TileOption.FugitiveEmissions,
      weightPrcnt: 5.8,
      policies: getPolicies(TileOption.FugitiveEmissions)
    }),
    [TileOption.UnallocatedFuelCombustion]: createOption({
      tileType: TileType.Power,
      optionType: TileOption.UnallocatedFuelCombustion,
      weightPrcnt: 7.8,
      policies: getPolicies(TileOption.UnallocatedFuelCombustion)
    }),
  },
};
