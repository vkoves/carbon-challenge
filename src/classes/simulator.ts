/**
 * Code related to game simulation.
 */
import { TileObj } from '../classes/tile-obj';
import { TileType } from '../interfaces/tile-interfaces';

/** The width of our simulator grid */
export const GridWidth = 4;

/**
 * The default layout of board tile types
 */
const DefaultBoardLayout: Array<TileType> = [
    TileType.Empty, TileType.Farm, TileType.Empty, TileType.Forest,
    TileType.Forest, TileType.House, TileType.Office, TileType.Empty,
    TileType.Empty, TileType.Power, TileType.Factory, TileType.Empty,
    TileType.Empty, TileType.Empty, TileType.Forest, TileType.Forest,
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
