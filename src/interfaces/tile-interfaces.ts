/**
 * The available types of tiles - the enum value is used for accessibility and
 * display.
 *
 * NOTE: Each of these values are rendered via i18n plugin using the
 * `AllLanguageData` constant, in [locale].simulator.tileOptions. Make sure to
 * keep that in sync with this enum!
 */
export enum TileType {
  // Scenery (non-interactive) tile types
  Empty = 'empty',
  Forest = 'forest',
  Lake = 'lake',
  // Actual interactive types
  Factory = 'factory',
  Farm = 'farm',
  House = 'house',
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
 * `AllLanguageData` constant, in [locale].simulator.tileOptions, so make sure
 * that the language files are updated along with this enum!
 */
export enum TileOption {
  Aviation = 'aviation',
  FreightRoadTransport = 'freightRoadTransport',
  Deforestation = 'deforestation',
  EnergyAgriculture = 'energyAgriculture',
  EnergyCommercialBuildings = 'energyCommercialBuildings',
  EnergyIndustry = 'energyIndustry',
  EnergyResidential = 'energyResidential',
  FugitiveEmissions = 'fugitiveEmissions',
  LivestockAndManure = 'livestockAndManure',
  PassengerRoadTransport = 'passengerRoadTransport',
  Shipping = 'shipping',
  UnallocatedFuelCombustion = 'unallocatedFuelCombustion',
}

/**
 * A single tile option configuration, usually wrapped in IOptions.
 */
export interface IOption {
  optionType: TileOption | null;

  /*
    A percentage (0 - 100) representing the current value of this option.
    This should come from real data and is only editable in magic mode (since
    no policy instantly has an impact).
   */
  current: number;

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
   * global emissions.
   *
   * Example: In 2016, residential building energy use in 2016 was 10.9% of
   * emissions so this value would be 10.9
   */
  weightPrcnt: number;
}

/**
 * Most options work something like:
 *
 * - CurrentValue (pulled from real-world data)
 * - TargetValue
 * - TargetValueYear
 *
 * For example, the power tile may have an option to change how much power is
 * made renwable with an option like so:
 *
 * renewable: {
 *   current: 5,
 *   target: 100,
 *   targetYear: 2050,
 *   weightPrcnt: 17.5,
 * }
 *
 * This means the user can impact the total warming in three ways:
 * - Change the current value (magic mode only)
 * - Change the target value
 * - Change the target year
 *
 * A single UI option may change multiple of these at once, like if we had
 * buttons for "100% Renewable by 2050", "50% Renewable by 2040", etc.
 */
export interface IOptions {
  [ optKey: string ]: IOption;
}
