import { IOption, IOptions, TileOption, TileType } from '../interfaces/tile-interfaces';

const EmptyOption: IOption = {
  current: 0,
  target: 100,
  targetYear: 2050,
};

export const DefaultTileOptions: { [ type: string ]: IOptions } = {
  [TileType.Factory]: {
    [TileOption.RenewableShare]: Object.assign({}, EmptyOption),
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
