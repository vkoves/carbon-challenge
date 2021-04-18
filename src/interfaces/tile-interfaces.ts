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
 * for each of these. Note that some of these may be unique to a single tile
 * type, some may apply to many!
 *
 * NOTE: Each of these values are rendered via i18n plugin using the
 * `AllLanguageData` constant, in [locale].simulator.tileOptions. Make sure to
 * keep that in sync with this enum!
 */
export enum TileOption {
  Deforestation = 'deforestation',
  ElectricCarShare = 'electricCarShare',
  ElectricHeating = 'electricHeating',
  RenewableShare = 'renewableShare',
  Electrification = 'electrificationPercent',
}

/**
 * A single tile option configuration, usually wrapped in IOptions.
 */
export interface IOption {
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
}

/**
 * Most options work something like:
 *
 * - CurrentValue (pulled from real-world data)
 * - TargetValue
 * - TargetValueYear
 *
 * For example, the power tile may have renewable options like so:
 *
 * renewable: {
 *   current: 5,
 *   target: 100,
 *   targetYear: 2050,
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
