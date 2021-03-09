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

export class Simulator {
  public static generateTiles(): Array<ITile> {
    const tilesCount = Math.pow(GridWidth, 2);

    const tiles: Array<ITile> = [];

    for (var i = 0; i < tilesCount; i++) {
      tiles.push({ id: i });
    }

    console.log('tiles', tiles);

    return tiles;
  }
}
