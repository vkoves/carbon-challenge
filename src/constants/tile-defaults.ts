import { IOption, IOptions, TileOption, TileType } from '../interfaces/tile-interfaces';

const EmptyOption: IOption = {
  current: 0,
  target: 100,
  targetYear: 2050,
};


/**
 * # Data I Need
 *
 * For each type tile option, I need:
 *
 * - The current value (e.g. the current % of cars that are electric)
 * - The current global policy target year and avg. (e.g. globally we are
 *   targeting 50% of cars to be electric by 2050)
 *
 * I need this for the following tile options:
 *
 * - Factory electrification???
 * - Farm greening
 * - Office electrification
 *
 */
export const DefaultTileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    [TileOption.Electrification]: Object.assign({}, EmptyOption),
  },

  [TileType.Farm]: {
    [TileOption.Deforestation]: Object.assign({}, EmptyOption),
  },

  [TileType.House]: {
    [TileOption.ElectricCarShare]: Object.assign({}, EmptyOption),
    [TileOption.ElectricHeating]: Object.assign({}, EmptyOption),
  },

  [TileType.Office]: {
    [TileOption.ElectricHeating]: Object.assign({}, EmptyOption),
  },

  [TileType.Power]: {
    [TileOption.RenewableShare]: Object.assign({}, EmptyOption),
  },
};
