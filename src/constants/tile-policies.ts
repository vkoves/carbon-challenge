import { IOptionPolicy, TileOption } from '../interfaces/tile-interfaces';

const CurrentYear = (new Date()).getFullYear();

/**
 * An enum distinguishing each tile policy and letting us specify translations.
 * The enum value is the same as the key so that errors are clear when a
 * translation file is missing translations for specific policies.
 *
 * NOTE: Changing this enum will require updates to our language files
 */
export enum TilePolicyKey {
  // Generic policies - these policies apply to each option
  None = 'None',
  Custom = 'Custom',

  // Factory tile policies
  FactoryElectricFreightRequirement2050 = 'FactoryElectricFreightRequirement2050',
  FactoryElectricFreightIncentive = 'FactoryElectricFreightIncentive',
  FactoryElectricFreightMagic = 'FactoryElectricFreightMagic',
  FactoryShippingElectricRequirement2050 = 'FactoryShippingElectricRequirement2050',
  FactoryRenewableEnergyRequirement2050 = 'FactoryRenewableEnergyRequirement2050',
  FactoryRenewableEnergyMagic = 'FactoryRenewableEnergyMagic',

  // Farm tile policies
  FarmManureManagement2050 = 'FarmManureManagement',
  FarmDeforestationElimination2050 = 'FarmDeforestationElimination2050',
  FarmRenewableEnergyRequirement2050 = 'FarmRenewableEnergyRequirement2050',
  FarmRenewableEnergyMagic = 'FarmRenewableEnergyMagic',

  // Home tile policies
  HomeElectricVehicleRequirement2050 = 'HomeElectricVehicleRequirement2050',
  HomeElectricVehicleIncentive = 'HomeElectricVehicleIncentive',
  HomeElectricVehicleMagic = 'HomeElectricVehicleMagic',
  HomeRenewableEnergyRequirement2050 = 'HomeRenewableEnergyRequirement2050',
  HomeRenewableEnergyIncentive = 'HomeRenewableEnergyIncentive',
  HomeRenewableEnergyMagic = 'HomeRenewableEnergyMagic',
  HomeAirTravelIncentive = 'HomeAirTravelIncentive',
  HomeAirTravelMagic = 'HomeAirTravelMagic',

  // Office tile policies
  OfficeRenewableEnergyRequirement2050 = 'OfficeRenewableEnergyRequirement2050',
  OfficeRenewableEnergyIncentive = 'OfficeRenewableEnergyIncentive',
  OfficeRenewableEnergyMagic = 'OfficeRenewableEnergyMagic',

  // Power tile policies
  PowerFugitiveEmissionsBan2050 = 'PowerFugitiveEmissionsBan2050',
  PowerFugitiveEmissionsClampDown = 'PowerFugitiveEmissionsClampDown',
  PowerUnallocatedFuelReduction2050 = 'PowerUnallocatedFuelReduction2050',
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
 *
 * Since the text is located in each language file, this is only the actual
 * numeric meaning of each policy. Any numeric changes should likely be
 * reflected in the language files.
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
      key: TilePolicyKey.FactoryElectricFreightIncentive,
      target: 50,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.FactoryElectricFreightMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],
  [TileOption.Shipping]: [
    NonePolicy,
    {
      key: TilePolicyKey.FactoryShippingElectricRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
  [TileOption.EnergyIndustry]: [
    NonePolicy,
    {
      key: TilePolicyKey.FactoryRenewableEnergyRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.FactoryRenewableEnergyMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],

  // Farm options
  [TileOption.LivestockAndManure]: [
    NonePolicy,
    {
      key: TilePolicyKey.FarmManureManagement2050,
      target: 50,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
  [TileOption.Deforestation]: [
    NonePolicy,
    {
      key: TilePolicyKey.FarmDeforestationElimination2050,
      target: 100,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
  [TileOption.EnergyAgriculture]: [
    NonePolicy,
    {
      key: TilePolicyKey.FarmRenewableEnergyRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.FarmRenewableEnergyMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],

  // Home options
  [TileOption.PassengerRoadTransport]: [
    NonePolicy,
    {
      key: TilePolicyKey.HomeElectricVehicleRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.HomeElectricVehicleIncentive,
      target: 50,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.HomeElectricVehicleMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],
  [TileOption.EnergyResidential]: [
    NonePolicy,
    {
      key: TilePolicyKey.HomeRenewableEnergyRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.HomeRenewableEnergyIncentive,
      target: 50,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.HomeRenewableEnergyMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],
  [TileOption.Aviation]: [
    NonePolicy,
    {
      key: TilePolicyKey.HomeAirTravelIncentive,
      target: 50,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.HomeAirTravelMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],

  // Office options
  [TileOption.EnergyCommercialBuildings]: [
    NonePolicy,
    {
      key: TilePolicyKey.OfficeRenewableEnergyRequirement2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.OfficeRenewableEnergyIncentive,
      target: 50,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.OfficeRenewableEnergyMagic,
      target: 100,
      targetYear: CurrentYear,
      isMagic: true,
    },
    CustomPolicy,
  ],

  // Power options
  [TileOption.FugitiveEmissions]: [
    NonePolicy,
    {
      key: TilePolicyKey.PowerFugitiveEmissionsBan2050,
      target: 100,
      targetYear: 2050,
    },
    {
      key: TilePolicyKey.PowerFugitiveEmissionsClampDown,
      target: 50,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
  [TileOption.UnallocatedFuelCombustion]: [
    NonePolicy,
    {
      key: TilePolicyKey.PowerUnallocatedFuelReduction2050,
      target: 50,
      targetYear: 2050,
    },
    CustomPolicy,
  ],
}
