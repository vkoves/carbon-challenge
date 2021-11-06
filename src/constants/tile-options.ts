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
  weightPrcnt?: number;
  maxCO2Sequestered?: number;
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
 * The number of metric tonnes of carbon sequestered by one. From EPA, which
 * says "0.82 metric ton CO2/acre/year sequestered annually by one acre of
 * average U.S. forest." Then multiply by the number of acres in a sq. km.,
 * which is 247.1. Thus the value we are looking for is 0.82 * 247.1 = 202.62.
 *
 * From "0.82 metric ton CO2/acre/year sequestered annually by one acre of average U.S. forest."
 * Source; https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
 */
export const TonnesCO2SequesteredPerSqKmPerYear = 202.62;

/**
 * A gigatonne is 1,000,000,000 tonnes or 10^9, so the multiplier to convert
 * tonnes to giga tonnes is 10^-9.
 */
export const TonnesToGigatonnesMult = Math.pow(10, -9);

/**
 * 9.5 million sq km comes from the IPPC 1.5 report which lists it as the
 * maximum reforestation they considered (9.5 mill square kilometers)
 */
export const MaxReforestationSqKm = 9.5 * Math.pow(10, 6);

/**
 * The maximum CO2 we allow to be sequestered by reforestation. This comes out
 * to ~1.9248 GT/year
 */
export const MaxReforestationGTCO2SequesteredPerYear
  = MaxReforestationSqKm * TonnesCO2SequesteredPerSqKmPerYear
    * TonnesToGigatonnesMult;

/**
 * "A recent expert assessment estimates that soil carbon sequestration could be
 * scaled up to sequester 2–5 GtCO2 per year by 2050"
 *
 * Source: https://www.american.edu/sis/centers/carbon-removal/fact-sheet-soil-carbon-sequestration.cfm
 *
 * I then use the minimum of that range, since according to the above source the
 * maximum cumulative potential (due to the limits of the amount of carbon that
 * can be held in soil) is 104–130 GtCO2, but I can't put that into the system.
 */
export const MaxAgricultureGTCO2PerYear = 2;

/**
 * The maximum Gigatonnes CO2
 *
 * Source:
 * https://www.american.edu/sis/centers/carbon-removal/fact-sheet-direct-air-capture.cfm
 */
export const MaxDirectAirCaptureGTCO2PerYearBy2050 = 2.25;

/** The total weight of emissions by road transport */
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
    [TileOption.AgriculturalSoils]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.AgriculturalSoils,
      weightPrcnt: 4.1,
      policies: getPolicies(TileOption.AgriculturalSoils)
    }),
    [TileOption.CropBurning]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.CropBurning,
      weightPrcnt: 3.5,
      policies: getPolicies(TileOption.CropBurning)
    }),
    [TileOption.SoilSequestration]: createOption({
      tileType: TileType.Farm,
      optionType: TileOption.SoilSequestration,
      maxCO2Sequestered: MaxAgricultureGTCO2PerYear,
      policies: getPolicies(TileOption.SoilSequestration)
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
  },

  [TileType.Forest]: {
    [TileOption.Deforestation]: createOption({
      tileType: TileType.Forest,
      optionType: TileOption.Deforestation,
      weightPrcnt: 2.2,
      policies: getPolicies(TileOption.Deforestation)
    }),
    [TileOption.Reforestation]: createOption({
      tileType: TileType.Forest,
      optionType: TileOption.Reforestation,
      maxCO2Sequestered: MaxReforestationGTCO2SequesteredPerYear,
      policies: getPolicies(TileOption.Reforestation)
    }),
    [TileOption.DirectAirCapture]: createOption({
      tileType: TileType.Forest,
      optionType: TileOption.DirectAirCapture,
      maxCO2Sequestered: MaxDirectAirCaptureGTCO2PerYearBy2050,
      policies: getPolicies(TileOption.DirectAirCapture)
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
