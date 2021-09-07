import { expect, should } from 'chai';
import chai from 'chai';

import {
  GridWidth,
  OrigYearlyEmissionsGigaTonnes,
  Simulator,
} from '@/classes/simulator';

describe('Simulator', () => {
  describe('generateTiles', () => {
    it('generates GridWidth squared tiles', () => {
      const tiles = Simulator.generateTiles();

      expect(tiles.length).equal(GridWidth * GridWidth)
    })
  });

  describe('getPolicyEmissionsDelta', () => {
    const TotalSimYears = 5;
    const CurrentYear = Simulator.getCurrentYear();
    const TestWeightDec = 0.5;

    it('should return total delta equal to simYears * weight * OrigEmissions if past targetYear and target is 100%', () => {
      const TotalSimYears = Simulator.getTotalSimulationYears();

      const simDeltas = Simulator.getPolicyEmissionsDelta({
        current: 0,
        target: 100,
        targetYear: CurrentYear,
        weightPrcnt: TestWeightDec * 100,
      });

      const expectedEmissionsReduction
        = Math.round(-OrigYearlyEmissionsGigaTonnes * TestWeightDec * TotalSimYears);

      expect(Math.round(simDeltas.total)).equal(expectedEmissionsReduction);
    });

    it('should return total delta equal to 1/2 * simYears * weight * OrigEmissions if past targetYear and target is 50%', () => {
      const TotalSimYears = Simulator.getTotalSimulationYears();

      const TargetDec = 0.5;

      const simDeltas = Simulator.getPolicyEmissionsDelta({
        current: 0,
        target: TargetDec * 100,
        targetYear: CurrentYear,
        weightPrcnt: TestWeightDec * 100,
      });

      const expectedEmissionsReduction
        = Math.round(-OrigYearlyEmissionsGigaTonnes * TestWeightDec * TotalSimYears * TargetDec);

      expect(Math.round(simDeltas.total)).equal(expectedEmissionsReduction);
    });

    // TODO: Add unit test confirming future targetYear works properly
  });

  describe('getTotalEmissionsData', () => {
    // TODO: Add tests
  });

  describe('validateNumInRange', () => {
    it('throws an error if value is greater than max', () => {
      expect(() => Simulator.validateNumInRange('test', 112, 0, 100)).to.throw(Error);
    });

    it('throws an error if value is less than min', () => {
      expect(() => Simulator.validateNumInRange('test', -5, 0, 100)).to.throw(Error);
    });

    it('does not throw an error if value is in range', () => {
      expect(() => Simulator.validateNumInRange('test', 10, 0, 100)).not.to.throw(Error);
    });

    it('does not throw an error if value is on edge of range', () => {
      expect(() => Simulator.validateNumInRange('test', 0, 0, 100)).not.to.throw(Error);
    });
  });
})
