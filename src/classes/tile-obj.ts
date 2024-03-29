import { TileOptions } from '../constants/tile-options';
import { TileType, IOption, IOptions } from '../interfaces/tile-interfaces';

/**
 * A tile object, which contains all the info needed for rendering this tile
 * plus any of it's impacts on the total emissions
 */
export class TileObj {
  id: number;
  type: TileType;
  // Empty tiles don't have options and will have an empty object
  options: IOptions;

  /** Whether this tile should */
  isGreenVariant: boolean = false;

  constructor(id: number, type: TileType) {
    this.id = id;
    this.type = type;
    this.options = TileOptions[type] || {};
  }

  /**
   * We have multiple scenery tiles with distinct types for rendering, so this
   * makes sure those tiles aren't interactive
   */
  isScenery(): boolean {
    return this.type === TileType.Empty
      || this.type === TileType.ForestD
      || this.type === TileType.Lake;
  }

  /**
   * Recalculate any properties of the tile that are based on its options. This
   * should be called anytime when the tiles options are updated, to update
   * properties like `isGreenVariant`.
   */
  recalculateProperties() {
    this.isGreenVariant = this.shouldBeGreen();
  }

  /**
   * A total 0 - 1 green score to help us judge whether this tile should show
   * its green variant or the default polluting variant. We show the tile as
   * green if the score is > 0.5.
   *
   * This basically is equivalent to an average of the option target values
   * clamped to 0 - 1. (e.g. targets of 100, 50, and 0 yields 0.5)
   */
  totalGreenScore(): number {
    // Guard against not having options (empty tile)
    if (!this.options) {
      return 0;
    }

    const optionsArr = Object.values(this.options);

    let targetTotal = 0;

    optionsArr
      .forEach((opt: IOption) => targetTotal += (opt.target / 100));

    return targetTotal / optionsArr.length;
  }

  /**
   * Whether this tile should render as a "green" (renewable) variant based on
   * its options. This should start false and flip to true after the user has
   * changed a few options to make the tile fairly more climate friendly.
   */
  shouldBeGreen(): boolean {
    return this.totalGreenScore() > 0.5;
  }
}
