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
 * The policies available for each tile option to reduce that type of emission.
 * Since the text
 */
export const TilePolicies: { [opt in TileOption]: Array<IOptionPolicy> } = {
  // Factory options
  [TileOption.FreightRoadTransport]: [
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
  ],
  [TileOption.Shipping]: [

  ],
  [TileOption.EnergyIndustry]: [

  ],

  // Farm options
  [TileOption.LivestockAndManure]: [

  ],
  [TileOption.Deforestation]: [

  ],
  [TileOption.EnergyAgriculture]: [

  ],

  // House options
  [TileOption.PassengerRoadTransport]: [

  ],
  [TileOption.EnergyResidential]: [

  ],
  [TileOption.Aviation]: [

  ],

  // Office options
  [TileOption.EnergyCommercialBuildings]: [

  ],

  // Power options
  [TileOption.FugitiveEmissions]: [

  ],
  [TileOption.UnallocatedFuelCombustion]: [

  ],
}
