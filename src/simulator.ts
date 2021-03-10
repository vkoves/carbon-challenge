/**
 * Code related to game simulation.
 */
import { GridWidth } from './constants';

/**
 * The available types of tiles - the enum value is used for accessibility and
 * display.
 */
export enum TileType {
  Empty = 'empty',
  Factory = 'factory',
  Farm = 'farm',
  House = 'house',
  Office = 'office',
  Power = 'power',
}


export interface IOption {
  /** A percentage expressed as a decimal */
  current: number;
  /** A percentage expressed as a decimal */
  target: number;
  /** A full year (e.g. 2020) */
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
 *   current: 0,
 *   target: 1, // 100% as a decimal
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

const EmptyOption: IOption = {
  current: 0,
  target: 1,
  targetYear: 2050,
};

export const DefaultTileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    renewableShare: EmptyOption,
  },

  [TileType.Farm]: {
    deforestation: EmptyOption,
  },

  [TileType.House]: {
    electricCarShare: EmptyOption,
    electricHeating: EmptyOption,
  },

  [TileType.Office]: {
    electricHeating: EmptyOption,
  },

  [TileType.Power]: {
    renewableShare: EmptyOption,
  },
};

/**
 * A tile object, which contains all the info needed for rendering this tile
 * plus any of it's impacts on the total emissions
 */
export class TileObj {
  id: number;
  type: TileType;
  options: IOptions | null; // empty tiles don't have options

  constructor(id: number, type: TileType) {
    this.id = id;
    this.type = type;
    this.options = DefaultTileOptions[type];
  }
}

/**
 * The default layout of board tile types
 */
const DefaultBoardLayout: Array<TileType> = [
    TileType.Empty, TileType.Farm, TileType.Empty, TileType.Empty,
    TileType.Empty, TileType.House, TileType.Office, TileType.Empty,
    TileType.Empty, TileType.Power, TileType.Factory, TileType.Empty,
    TileType.Empty, TileType.Empty, TileType.Empty, TileType.Empty,
]

/**
 * The core simulator class, which handles all of the calculation and data \
 * processing for the game board.
 */
export class Simulator {
  /**
   * Generate the starting tiles for the game board.
   */
  public static generateTiles(): Array<TileObj> {
    const tilesCount = Math.pow(GridWidth, 2);

    const tiles: Array<TileObj> = [];

    for (var i = 0; i < tilesCount; i++) {
      const newTile: TileObj = new TileObj(i, DefaultBoardLayout[i]);

      tiles.push(newTile);
    }

    return tiles;
  }

  /**
   * Returns the estimate degrees of average global temperature rise. Should
   * typically be in the range of 1 - 3.
   */
  public static getThermometerDegrees(
    currentTiles: Array<TileObj>
  ): number {
    // TODO: Make this use the current tiles to calculate stuff
    return 1 + 2 * Math.random();
  }
}
