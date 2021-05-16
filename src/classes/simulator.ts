/**
 * Code related to game simulation.
 */
import { TileObj } from '@/classes/tile-obj';
import { IOption, TileOption, TileType } from '@/interfaces/tile-interfaces';
import {
  OrigYearlyEmissionsGigaTonnes,
  HighEstDegreesWarmingPerGigaTonne,
} from '@/constants/tile-defaults';

export const SimulatorUnits = {
  Temperature: '°C',
  Emissions: 'Gigatonnes',
}

/**
 * A single point in time for a tile option, indicating its % value (0 - 100)
 * and the year in question.
 */
export interface IDeltaObj {
  valuePrcnt: number;
  year: number;
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
   * Returns the current year as a number (e.g. 2021, 2030).
   */
  public static getCurrentYear(): number {
    return (new Date()).getFullYear()
  }

  /**
   * Get the number of years left in the simulation time till our end year
   * (2100). E.g. in 2025 this would return 75.
   */
  public static getTotalSimulationYears(): number {
    return SimulationEndYear - Simulator.getCurrentYear();
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
   * Given a tile option, returns the difference in total emissions (over the
   * remaining simulator years) this tile's state creates, in Gigatonnes CO2.
   * For example setting a tile to increase the share of electirc cars would
   * return a negative  number.
   *
   * TODO: Write unit tests for this function
   */
  public static getOptionTotalEmissionDelta(tileOption: IOption): number {
    const totalSimYears = Simulator.getTotalSimulationYears();
    const startYear = Simulator.getCurrentYear();

    const yearsFromTodayTillTarget = tileOption.targetYear - startYear;

    const emissionDeltaArr: Array<IDeltaObj> = [];

    for (let i = 0; i < totalSimYears; i++) {
      const currYear = startYear + i;

      // If the current year is beyond the option's target year, we've reached
      // the target
      if (currYear >= tileOption.targetYear) {
        emissionDeltaArr.push({
          year: currYear,
          valuePrcnt: tileOption.target,
        });
      }
      // Otherwise we're part-way to the target. We assume a linear progression
      // towards the target. Ex: If target is 100, the startYear is 2000 and the
      // targetYear is 2050, in 2040 the current value of this option is 80.
      // The formula for this is:
      // (currYear - startYear / totalSimYears) * target = currAmt
      // In the example, this yields:
      // (2040 - 2000) / (2050 - 2000) * 100 = 40 / 50 * 100 = 0.8 * 100 = 80
      else {
        const yearsPassed = currYear - startYear;

        emissionDeltaArr.push({
          year: currYear,
          valuePrcnt: (yearsPassed / yearsFromTodayTillTarget) * tileOption.target,
        })
      }
    }

    let totalEmissionsDelta = 0;

    console.log('OrigYearlyEmissionsGigaTonnes', OrigYearlyEmissionsGigaTonnes);

    emissionDeltaArr.forEach((delta: IDeltaObj) => {
      if (tileOption.optionType === TileOption.ResidentialElectricCarShare) {
        console.log({
          year: delta.year,
          valuePrcnt: delta.valuePrcnt,
          weightPrcnt: tileOption.weightPrcnt,

          optDelta: (delta.valuePrcnt / 100)
          * (tileOption.weightPrcnt / 100) * OrigYearlyEmissionsGigaTonnes,
        });
      }

      totalEmissionsDelta -= (delta.valuePrcnt / 100)
        * (tileOption.weightPrcnt / 100) * OrigYearlyEmissionsGigaTonnes;
    });


    if (tileOption.optionType === TileOption.ResidentialElectricCarShare) {
      console.log('tileOption', tileOption);

      console.log('totalEmissionsDelta', totalEmissionsDelta);

      // TODO: Double check this and maybe write unit tests
      console.log('emissionDeltaArr', emissionDeltaArr);
    }

    return totalEmissionsDelta;
  }

  /**
   * Get the total CO2 emissions (in GigaTonnes) from the current year to the
   * SimulationEndYear, using the options set in the passed tiles.
   *
   * This process is _subtractive_ not additive. As in each tile can return a
   * subtraction from the default OrigYearlyEmissionsGigaTonnes if the user has
   * made emissions reductions.
   *
   * This is necessary since some emissions sources cannot be changed within
   * our simulator and to make the system more reliable.
   */
  public static getTotalEmissions(currentTiles: Array<TileObj>): number {
    let totalTileDelta = 0;

    currentTiles.forEach((tile: TileObj) => {
      Object.values(tile.options).forEach((tileOption: IOption) => {
        totalTileDelta += Simulator.getOptionTotalEmissionDelta(tileOption);
      });
    });

    console.log('totalTileDelta', totalTileDelta.toLocaleString());

    const origEmissions = OrigYearlyEmissionsGigaTonnes
      * Simulator.getTotalSimulationYears();

    console.log('origEmissions', origEmissions.toLocaleString());

    // TODO: Make this actually use the tile options to reduce the predicted
    // total emissions
    return origEmissions + totalTileDelta;
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
    console.log('getThermometerDegrees called!');

    // TODO: Make this actually use the carbon budgets when appropriate
    return Simulator.getTotalEmissions(currentTiles)
      * HighEstDegreesWarmingPerGigaTonne;
  }
}
