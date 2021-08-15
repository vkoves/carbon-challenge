import { IOptionPolicy, TileOption } from '../interfaces/tile-interfaces';

/**
 * An enum distinguishing each tile policy and letting us specify translations.
 * We don't specify an enum value.
 */
export enum TilePolicyKey {
  // Generic policies - these policies apply to each option
  None,
  Custom,

  // Factory policies
  FactoryElectricFreightRequirement2050,
  FactoryElectricFreightIncentive2050,
}

/**
 * The default policy, which is to do nothing
 */
export const NonePolicy: IOptionPolicy = {
  key: TilePolicyKey.None,
  target: 0,
  targetYear: 2100,
}

/**
 * The policy that lets users input their own parameters. Does not have any
 * target values to prevent ignoring the user's inputs.
 */
export const CustomPolicy: IOptionPolicy = {
  key: TilePolicyKey.Custom,
  target: null,
  targetYear: null,
}

/**
 * The policies available for each tile option to reduce that type of emission.
 * Since the text
 */
export const TilePolicies: { [opt in TileOption]: Array<IOptionPolicy> } = {
  // Factory options
  [TileOption.FreightRoadTransport]: [
    NonePolicy,
    {
      key: TilePolicyKey.FactoryElectricFreightRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.FactoryElectricFreightIncentive2050,
      target: 50,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
  [TileOption.Shipping]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.EnergyIndustry]: [
    NonePolicy,
    CustomPolicy,
  ],

  // Farm options
  [TileOption.LivestockAndManure]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.Deforestation]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.EnergyAgriculture]: [
    NonePolicy,
    CustomPolicy,
  ],

  // House options
  [TileOption.PassengerRoadTransport]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.EnergyResidential]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.Aviation]: [
    NonePolicy,
    CustomPolicy,
  ],

  // Office options
  [TileOption.EnergyCommercialBuildings]: [
    NonePolicy,
    CustomPolicy,
  ],

  // Power options
  [TileOption.FugitiveEmissions]: [
    NonePolicy,
    CustomPolicy,
  ],
  [TileOption.UnallocatedFuelCombustion]: [
    NonePolicy,
    CustomPolicy,
  ],
}
