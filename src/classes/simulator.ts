/**
 * Code related to game simulation.
 */
import { TilePolicyKey } from '@/constants/tile-policies';
import {
  IOption,
  IOptionPolicy,
  IWeightedPolicy,
  TileOption,
  TileType
} from '@/interfaces/tile-interfaces';
import { TileObj } from '@/classes/tile-obj';


/**
 * A mapping of certain tile policy keys to their total emissions delta, used
 * for showing the estimated emissions saved by enacting certain policies.
 */
export interface IPolicyDeltaEstimates {
 [policyKey: string]: number
}

export interface IPolicyDatum {
  year: number;
  delta: number;
}

export interface IPolicyEmissionsWithBreakdown {
  total: number,
  data: Array<IPolicyDatum>,
}

/**
 * A data point for debugging the total emissions, containing the year of this
 * calculation and the delta emissions for each tile option type.
 *
 * Example:
 * {
 *   year: 2030,
 *   // no change
 *   [TileOption.Aviation]: 0,
 *   // save 5 Gigatonnes of emissions compared to the start year
 *   [TileOption.EnergyResidential]: -5,
 * }
 */
export interface ITotalEmissionsDatum {
  year: number;
  deltas: {
    [tileOptionType: string]: number;
  }
}

export interface ITotalEmissionsWithBreakdown {
  total: number;
  data: Array<ITotalEmissionsDatum>;
}

/**
 * All data is based on Our World in Data emissions by sector in April 2021, which
 * was showing emissions for 2016.
 */

/**
 * The total emissions in our "start year" (the year we use for the weight data)
 * in gigatonnes (billion tonnes) of eq. CO2.
 */
export const OrigYearlyEmissionsGigaTonnes = 49.4;

/**
 * A high bound estimate for the additional degrees of warming by 2100 per extra
 * GigaTonne of emissions. This is a high estimate based the Carbon Tracker
 * budgets page:
 *
 * https://carbontracker.org/carbon-budgets-where-are-we-now/
 *
 * To get this number, I took the IPCC 66% budget of 1,100 Gigatonnes CO2 and
 * divided the 2° warming that budget corresponds to by that value. This
 * yields ~0.001818 °C/Gigatonne, which I rounded up to 0.002. This seems
 * reasonable considering that emissions have a cascading effect, so emissions
 * beyond the 2°C threshold likely have greater effects than the emissions up
 * to that point.
 */
export const HighEstDegreesWarmingPerGigaTonne = 0.002;

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
export const SimEndYear = 2100;

/**
 * The default layout of board tile types
 */
const DefaultBoardLayout: Array<TileType> = [
    TileType.Forest, TileType.Farm, TileType.Empty, TileType.Forest,
    TileType.Forest, TileType.Home, TileType.Office, TileType.Empty,
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
    return (new Date()).getFullYear();
  }

  /**
   * Get the number of years left in the simulation time till our end year
   * (2100). E.g. in 2025 this would return 75.
   */
  public static getTotalSimulationYears(): number {
    return SimEndYear - Simulator.getCurrentYear();
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
   * Validates a property of a tile option is in a specified range and throws an
   * error if not
   */
  public static validateNumInRange(
    key: string,
    value: number,
    min: number,
    max: number
  ): void {
    if (value > max || value < min) {
      throw new Error(
        `${key} is outside of range (${min} - ${max}) with value ${value}!`)
    }
  }

  /**
   * Given a tile option, returns the difference in total emissions (over the
   * remaining simulator years) this tile's state creates, in Gigatonnes CO2.
   * For example setting a tile to increase the share of electirc cars would
   * return a negative  number.
   */
  public static getOptionTotalEmissionDelta(
    tileOption: IOption
  ): IPolicyEmissionsWithBreakdown {
    return Simulator.getPolicyEmissionsDelta({
      current: tileOption.current,
      target: tileOption.target,
      targetYear: tileOption.targetYear,
      weightPrcnt: tileOption.weightPrcnt,
    });
  }

  /**
   * Given a tile option, returns the difference in total emissions (over the
   * remaining simulator years) this tile's state creates, in Gigatonnes CO2.
   * For example setting a tile to increase the share of electirc cars would
   * return a negative  number.
   *
   * TODO: Write unit tests for this function
   */
  public static getPolicyEmissionsDelta({
    current,
    target,
    targetYear,
    weightPrcnt,
  }: IWeightedPolicy): IPolicyEmissionsWithBreakdown {
    const totalSimYears = Simulator.getTotalSimulationYears();
    const startYear = Simulator.getCurrentYear();

    // Validate properties are in a valid range
    Simulator.validateNumInRange('current', current, 0, 100);
    Simulator.validateNumInRange('target', target, 0, 100);
    Simulator.validateNumInRange('targetYear', targetYear, startYear, SimEndYear);
    Simulator.validateNumInRange('weightPrcnt', weightPrcnt, 0, 100);

    const yearsFromTodayTillTarget = targetYear - startYear;

    const emissionDeltaArr: Array<IDeltaObj> = [];

    // Loop through every year of the simulation and calculate emissions in in
    // that year
    for (let i = 0; i < totalSimYears; i++) {
      const currYear = startYear + i;

      // If the current year is beyond the option's target year, we've reached
      // the target
      if (currYear >= targetYear) {
        emissionDeltaArr.push({
          year: currYear,
          valuePrcnt: target,
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
          valuePrcnt: (yearsPassed / yearsFromTodayTillTarget) * target,
        })
      }
    }

    let totalEmissionsDelta = 0;

    let deltaArrFinal: Array<IPolicyDatum>;

    deltaArrFinal = emissionDeltaArr.map((delta: IDeltaObj) => ({
        year: delta.year,
        // Make sure the final delta is negative, since this is a subtractive
        // process
        delta: -1 * (delta.valuePrcnt / 100)
          * (weightPrcnt / 100) * OrigYearlyEmissionsGigaTonnes,
    }));

    deltaArrFinal.forEach((policyDatum: IPolicyDatum) => {
      totalEmissionsDelta += policyDatum.delta;
    });

    return {
      total: totalEmissionsDelta,
      data: deltaArrFinal,
    };
  }

  /**
   * Get just the final emissions number from getTotalEmissionsData, in
   * Gigatonnes CO2 emitted by 2100.
   */
  public static getTotalEmissions(currentTiles: Array<TileObj>): number {
    return Simulator.getTotalEmissionsData(currentTiles).total;
  }

  /**
   * Get the total CO2 emissions (in GigaTonnes) from the current year to the
   * SimEndYear, using the options set in the passed tiles.
   *
   * This process is _subtractive_ not additive. As in each tile can return a
   * subtraction from the default OrigYearlyEmissionsGigaTonnes if the user has
   * made emissions reductions.
   *
   * This is necessary since some emissions sources cannot be changed within
   * our simulator and to make the system more reliable.
   */
  public static getTotalEmissionsData(currentTiles: Array<TileObj>): ITotalEmissionsWithBreakdown {
    let totalTileDelta = 0;

    let tileData: Array<ITotalEmissionsDatum> = [];


    // Loop through each tile and then each option underneath it
    currentTiles.forEach((tile: TileObj) => {
      Object.values(tile.options).forEach((tileOption: IOption) => {
        const optionData = Simulator.getOptionTotalEmissionDelta(tileOption);

        totalTileDelta += optionData.total;

        // If the tileData hasn't been set yet, start with the yar and the first
        // option
        if (tileData.length === 0) {
          tileData = optionData.data.map((datum: IPolicyDatum) => ({
            year: datum.year,
            deltas: {
              [tileOption.optionType as string]: datum.delta,
            }
          }));
        }
        // Otherwise just add this tile option
        else {
          optionData.data.forEach((datum: IPolicyDatum, index: number) => {
            tileData[index].deltas[tileOption.optionType  as string] = datum.delta;
          });
        }
      });
    });

    const origEmissions = OrigYearlyEmissionsGigaTonnes
      * Simulator.getTotalSimulationYears();

    return {
      total: origEmissions + totalTileDelta,
      data: tileData,
    };
  }


  /**
   * Calculate the emissions delta for every single policy on a tile to show a
   * preview of the impacts in the UI
   */
  public static calculateAllPolicyEmissionDeltas(
    tile: TileObj
  ): IPolicyDeltaEstimates {
    const policyDeltas: IPolicyDeltaEstimates = {};

    Object.values(tile.options).forEach((option: IOption) => {
      (option.policies || []).forEach((policy: IOptionPolicy) => {
        if (policy.key === TilePolicyKey.Custom
          || policy.key === TilePolicyKey.None) {
          return;
        }

        if (!policy.target || !policy.targetYear) {
          throw new Error('Trying to calculate policy emissions for policy '
              + `"${policy.key}" with missing target or targetYear!`);
          return;
        }

        const policyEmissionDelta = Simulator.getPolicyEmissionsDelta({
          current: 0,
          target: policy.target,
          targetYear: policy.targetYear,
          weightPrcnt: option.weightPrcnt,
        }).total;

        // Round off to the nearest giggatonne, since this is for the UI
        policyDeltas[policy.key] = Math.round(policyEmissionDelta);
      })
    });

    // For simplicity, make sure to include that no policy always has an impact
    // of zero
    policyDeltas[TilePolicyKey.None] = 0;

    return policyDeltas;
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
    // TODO: Make this actually use the carbon budgets when appropriate
    return Simulator.getTotalEmissions(currentTiles)
      * HighEstDegreesWarmingPerGigaTonne;
  }
}
