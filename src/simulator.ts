/**
 * Code related to game simulation.
 */
import { GridWidth } from './constants';

/**
 * A tile object, which contains all the info needed for rendering this tile
 * plus any of it's impacts on the total emissions
 */
export interface ITile {
  id: number;
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
      tiles.push({ id: i });
    }

    return tiles;
  }
}
