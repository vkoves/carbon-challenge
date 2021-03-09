/**
 * Code related to game simulation.
 */
import { GridWidth } from './constants';

/**
 * The available types of tiles
 */
export enum TileType {
  Power = 'power',
  Farm = 'farm',
  House = 'house',
  Office = 'office',
  Factory = 'factory',
  Empty = 'empty',
}

/**
 * A tile object, which contains all the info needed for rendering this tile
 * plus any of it's impacts on the total emissions
 */
export interface ITile {
  id: number;
  type: TileType;
}

/**
 * The core simulator class, which handles all of the calculation and data \
 * processing for the game board.
 */
export class Simulator {
  /**
   * Generate the starting tiles for the game board.
   */
  public static generateTiles(): Array<ITile> {
    const tilesCount = Math.pow(GridWidth, 2);

    const tiles: Array<ITile> = [];

    for (var i = 0; i < tilesCount; i++) {
      const newTile: ITile = {
        id: i,
        type: TileType.Empty,
      };

      tiles.push(newTile);
    }

    return tiles;
  }

  /**
   * Returns the estimate degrees of average global temperature rise. Should
   * typically be in the range of 1 - 3.
   */
  public static getThermometerDegrees(
    currentTiles: Array<ITile>
  ): number {
    // TODO: Make this use the current tiles to calculate stuff
    return 1 + 2 * Math.random();
  }
}
