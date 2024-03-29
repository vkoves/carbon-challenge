import { TilePolicyKey } from '../constants/tile-policies';

/**
 * The available types of tiles - the enum value is used for accessibility and
 * display.
 *
 * NOTE: Each of these values are rendered via i18n plugin using the
 * `AllLanguageData` constant, in [locale].simulator.tileTypes. Make sure to
 * keep that in sync with this enum!
 */
export enum TileType {
  // Scenery (non-interactive) tile types
  Empty = 'empty',
  ForestD = 'forest-decor',
  Lake = 'lake',
  // Actual interactive types
  Factory = 'factory',
  Farm = 'farm',
  Forest = 'forest',
  Home = 'home',
  Office = 'office',
  Power = 'power',
}


/**
 * All of the possible options for any tile, so we can have internationalization
 * for each of these. These should be:
 *
 *   1. Unique to each tile, so we can use specific wording
 *   2. Should be the name of the underlying emission source, rather than a
 *      potential policy to reduce it. (e.g. "CommercialRoadTransport" rather
 *      than "ElectrifyCommercialRoadTransport")
 *
 * NOTE: Each of these values are rendered via i18n plugin using the
 * `AllLanguageData` constant, in [locale].simulator.tileOptionTitles, so make
 * sure that the language files are updated along with this enum!
 */
export enum TileOption {
  AgriculturalSoils = 'agriculturalSoils',
  Aviation = 'aviation',
  CropBurning = 'cropBurning',
  Cropland = 'cropland',
  Deforestation = 'deforestation',
  DirectAirCapture = 'directAirCapture',
  DirectIndustrialProcesses = 'directIndustrialProcesses',
  EnergyAgriculture = 'energyAgriculture',
  EnergyCommercialBuildings = 'energyCommercialBuildings',
  EnergyIndustry = 'energyIndustry',
  EnergyResidential = 'energyResidential',
  FreightRoadTransport = 'freightRoadTransport',
  FugitiveEmissions = 'fugitiveEmissions',
  LivestockAndManure = 'livestockAndManure',
  PassengerRoadTransport = 'passengerRoadTransport',
  Reforestation = 'reforestation',
  Shipping = 'shipping',
  SoilSequestration = 'soilSequestration',
  UnallocatedFuelCombustion = 'unallocatedFuelCombustion',
  Waste = 'waste',
}

/**
 * The bare-bones of an emissions policy with a weight that we can run
 * calculations on. The tile options interface (IOption) implements this, see
 * that for documentation.
 */
export interface IWeightedPolicy {
  current: number;
  target: number;
  targetYear: number;
  weightPrcnt?: number;
  maxCO2Sequestered?: number;
}

/**
 * A policy that can be activated to reduce the emissions of an option.
 *
 * Example: For the EnergyResidential tile option, we may have a policy like:
 *
 * ```
 * {
 *  key: TilePolicyKey.FullyRenewableBy2050,
 *  target: 100,
 *  targetYear: 2050,
 * }
 * ```
 *
 * And in the translation file, this may have the following data:
 *
 * ```
 * {
  * name: 'Fully Renewable by 2050',
 *  description:
 *    'Aggressively overhaul the grid and support local energy initiatives to ' +
 *    'get 100% of residential energy from renewable sources.'
 * }
 */
export interface IOptionPolicy {
  key: TilePolicyKey;
  target: number | null;
  targetYear: number | null;

  // Whether this policy is only allowed in magic mode, which typically means
  // it's targetYear is the current year
  isMagic?: boolean;
}


/**
 * A single tile option configuration, usually wrapped in IOptions. Most options
 * work something like:
 *
 * - current - the current emissions reduction, typically 0
 * - target - the target reduction as a percentage of the current emissions of
 *    this option
 * - targetYear - the year to hit the target
 *
 * For example, the residential tile may have an option representing residential
 * energy use. To set a target for making residential energy 100% renewable by
 * 2050, from a current of 0%. That is represented like so:
 *
 * ```
 * energyResidential: {
 *   current: 0,
 *   target: 100,
 *   targetYear: 2050,
 *   weightPrcnt: 17.5,
 * }
 * ```
 *
 * This means the user can impact the total warming in three ways:
 * - Change the current value (magic mode only)
 * - Change the target value
 * - Change the target year
 *
 * A single UI option may change multiple of these at once, like if we had
 * buttons for "100% Renewable by 2050", "50% Renewable by 2040", etc.
 */
export interface IOption extends IWeightedPolicy {
  /**
   * The type of this option
   */
  optionType: TileOption;

  /**
   * The type of tile this corresponds to - useful for aggregating back a set
   * of options back to their corresponding types
   */
  tileType: TileType;

  /**
   * A percentage (0 - 100) representing the current value of this option.
   * This should come from real data and is only editable in magic mode (since
   * no policy instantly has an impact).
   */
  current: number;

  /** The key indicating which policy is currently selected */
  currPolicyKey: TilePolicyKey;

  /**
   * A percentage (0 - 100) representing the value this option will reach at the
   * target year.
   */
  target: number;

  /**
   * The year we reach our target policy goal, after which this value is
   * maintained. Expressed as a full number (e.g. `2021`)
   */
  targetYear: number;

  /**
   * A percentage number expressing the weight of this option as a % of current
   * global emissions. This could be undefined if this options is a carbon sink that
   * we can scale up, rather than an emission source we scale down.
   *
   * Example: In 2016, residential building energy use in 2016 was 10.9% of
   * emissions so this value would be 10.9.
   */
  weightPrcnt?: number;

  /**
   * The maximum Gigatonnes per year that can be sequestered with this carbon
   * sequestration policy. This is undefined on most options (since they are carbon
   * sources) and is only set on carbon sinks like reforestation.
   */
  maxCO2Sequestered?: number;

  /**
   * An array of potential changes that can be made to this option. These are
   * policies, like making 100% of vehicles electric by 2050.
   */
  policies?: Array<IOptionPolicy>;
}

/**
 * An object containing all the options for a tile type
 */
export interface IOptions {
  [ optKey: string ]: IOption;
}
