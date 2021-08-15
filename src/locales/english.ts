import { ILanguageData } from '@/interfaces/language-data';
import { TilePolicyKey } from '@/constants/tile-policies';

export const EnglishLanguageData: ILanguageData = {
  title: 'The Carbon Challenge',

  header: {
    home: 'Home',
    simulator: 'Simulator',
    disclaimers: 'Disclaimers',
    about: 'About',
    language: 'Language',
  },

  intro: {
    slogan1: 'Climate change is big.',
    slogan2: 'So we have to go even bigger.',
    startBtn: 'Let\'s Go'
  },

  about: {
    title: 'About The Carbon Challenge',
  },

  simulator: {
    avgTempLabel: 'Average Global Temperature Increase by 2100',
    close: 'Close',
    tileOverlay: {
      current: 'Current',
      target: 'Target Emissions Reduction',
      targetYear: 'Target Year',
      emissionPrcntLabel: 'orig.',
      policiesLabel: 'Policy',
    },
    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Power Plant',
      farm: 'Farm',
      forest: 'Forest',
      house: 'Home',
      office: 'Office',
      factory: 'Factory',
      empty: 'Empty',
    },

    // Optional descriptions of each tile type, explaining what falls under this
    // tile and where expected options may be if they fall under another tile.
    // Should include all values from the TileType enum
    tileTypeDescriptions: {
      power:
        'Emissions that are broadly tied to generating power. Emissions for ' +
        'specific uses are under the Home, Office, and Factory tiles.',
      farm: '',
      forest: '',
      house: 'Emissions related to homes and individual behaviors like driving.',
      office: '',
      factory:
        'Emissions related to industry, including manufacturing of all kinds.',
      empty: '',
    },

    // Should include all values from the TileOption enum
    tileOptionTitles: {
      aviation: 'Aviation',
      deforestation: 'Deforestation',
      energyAgriculture: 'Energy for Agriculture',
      energyCommercialBuildings: 'Energy for Commercial Buildings',
      energyIndustry: 'Energy for Industry',
      energyResidential: 'Energy for Residential Buildings',
      freightRoadTransport: 'Freight Trucking',
      fugitiveEmissions: 'Fugitive Emissions from Energy Production',
      livestockAndManure: 'Livestock and Manure',
      passengerRoadTransport: 'Passenger Vehicles',
      shipping: 'Shipping',
      unallocatedFuelCombustion: 'Unallocated Fuel Combustion',
    },

    // Should contain all values from TilePolicyKey
    tilePolicies: {
      [TilePolicyKey.None]: {
        name: 'None',
        description:
          'Keep related emissions the same for the forseable future.',
      },
      [TilePolicyKey.Custom]: {
        name: 'Custom',
        description:
          'Create your own fully custom policy.',
      },
      [TilePolicyKey.FactoryElectricFreightRequirement2050]: {
        name: 'Require All Electric Freight by 2050',
        description:
          'Require all road freight vehicles to be electric by 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightIncentive2050]: {
        name: 'Electric Freight Incentives',
        description:
          'Provide tax incentives for electric freight vehicles, cutting gas ' +
          'powered trucks in half by 2050.',
      }
    }
  }
};
