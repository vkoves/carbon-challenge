/**
 * Code related to game simulation.
 */
import { TileObj } from '@/classes/tile-obj';
import { TileType } from '@/interfaces/tile-interfaces';
import {
  OrigYearlyEmissionsGigaTonnes,
  HighEstDegreesWarmingPerGigaTonne,
} from '@/constants/tile-defaults';

export const SimulatorUnits = {
  Temperature: '°C',
  Emissions: 'Gigatonnes',
}

/** The width of our simulator grid */
export const GridWidth = 4;

/**
 * The year until which our simulation runs and also the amount of warming of
 * warming we show. We use 2100 rather than 2050 both so our simulation lasts
 * longer and so that we show a fuller scope of potential warming, even in worst
 * case scenarios where we aren't net zero by 2050 or beyond.
 */
export const SimulationEndYear = 2100;

/**
 * The default layout of board tile types
 */
const DefaultBoardLayout: Array<TileType> = [
    TileType.Forest, TileType.Farm, TileType.Empty, TileType.Forest,
    TileType.Forest, TileType.House, TileType.Office, TileType.Empty,
    TileType.Empty, TileType.Empty, TileType.Power, TileType.Lake,
    TileType.Empty, TileType.Factory, TileType.Forest, TileType.Forest,
]

export enum TempCalcMethod {
  OverBudgetsEstimated,
  TwoDegBudget,
  OneAndAHalfDegBudget,
}

/**
 * The core simulator class, which handles all of the calculation and data \
 * processing for the game board.
 */
export class Simulator {
  /**
   * Get the number of years left in the simulation time till our end year
   * (2100)
   */
  public static GetRemainingSimulationYears(): number {
    return SimulationEndYear - (new Date()).getFullYear();
  }

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
   * Get the total CO2 emissions (in GigaTonnes) from the current year to the
   * SimulationEndYear, using the options set in the passed tiles.
   */
  public static getTotalEmissions(currentTiles: Array<TileObj>): number {
    // TODO: Make this actually use the tile options to reduce the predicted
    // total emissions
    return OrigYearlyEmissionsGigaTonnes
      * Simulator.GetRemainingSimulationYears();
  }

  /**
   * Returns which carbon budget was used to estimate the current degrees of
   * warming, if any, or if we just used the over 2 deg. budget estimation
   * formula.
   */
  public static getThermometerDegreesMethod(
    currentTiles: Array<TileObj>
  ): TempCalcMethod {
    // TODO: Make this return the carbon budgets if the total emissions is within
    // the point we can use the budgets
    return TempCalcMethod.OverBudgetsEstimated;
  }

  /**
   * Returns the estimate degrees of average global temperature rise. Should
   * typically be in the range of 1 - 3.
   *
   * Some implementation details:
   *
   * 1. Loosely based off of carbon budgets from here:
   *
   * https://carbontracker.org/carbon-budgets-where-are-we-now/
   *
   * 2. Above the 2°C budget threshold, we use Viktor's
   * HighEstDegreesWarmingPerGigaTonne
   */
  public static getThermometerDegrees(
    currentTiles: Array<TileObj>
  ): number {
    return Simulator.getTotalEmissions(currentTiles)
      * HighEstDegreesWarmingPerGigaTonne;
  }
}
