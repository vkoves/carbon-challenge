import { expect } from 'chai'
import { Simulator } from '@/simulator';
import { GridWidth } from '@/constants';

describe('Simulator', () => {
  describe('generateTiles', () => {
    it('generates GridWidth squared tiles', () => {
      const tiles = Simulator.generateTiles();

      expect(tiles.length).equal(GridWidth * GridWidth)
    })
  });
})
