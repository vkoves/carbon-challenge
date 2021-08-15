import { IOptionPolicy, TileOption } from '../interfaces/tile-interfaces';

/**
 * An enum distinguishing each tile policy and letting us specify translations.
 * We don't specify an enum value.
 *
 * NOTE: Changing this enum will require updates to our language files
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
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.EnergyIndustry]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],

  // Farm options
  [TileOption.LivestockAndManure]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.Deforestation]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.EnergyAgriculture]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],

  // Home options
  [TileOption.PassengerRoadTransport]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.EnergyResidential]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.Aviation]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],

  // Office options
  [TileOption.EnergyCommercialBuildings]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],

  // Power options
  [TileOption.FugitiveEmissions]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
  [TileOption.UnallocatedFuelCombustion]: [
    NonePolicy,
    // TODO: Add policy
    CustomPolicy,
  ],
}
