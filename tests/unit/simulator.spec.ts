import { expect } from 'chai'
import { Simulator, GridWidth } from '@/classes/simulator';

describe('Simulator', () => {
  describe('generateTiles', () => {
    it('generates GridWidth squared tiles', () => {
      const tiles = Simulator.generateTiles();

      expect(tiles.length).equal(GridWidth * GridWidth)
    })
  });
})
