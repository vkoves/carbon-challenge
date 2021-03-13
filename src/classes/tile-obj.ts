import { DefaultTileOptions } from '../constants/tile-defaults';
import { TileType, IOptions } from '../interfaces/tile-interfaces';

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

  /**
   * We have multiple scenery tiles with distinct types for rendering, so this
   * makes sure those tiles aren't interactive
   */
  isScenery(): boolean {
    return this.type === TileType.Empty
      || this.type === TileType.Forest
      || this.type === TileType.Lake;
  }
}
