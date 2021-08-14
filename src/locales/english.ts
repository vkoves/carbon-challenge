import { ILanguageData } from '@/interfaces/language-data';

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
  simulator: {
    avgTempLabel: 'Average Global Temperature Increase by 2100',
    close: 'Close',
    tileOverlay: {
      current: 'Current',
      target: 'Target',
      targetYear: 'Target Year',
    },
    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Power Plant',
      farm: 'Farm',
      forest: 'Forest',
      house: 'House',
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
      house: '',
      office: '',
      factory: '',
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
      freightRoadTransport: 'Freight Road Vehicles',
      fugitiveEmissions: 'Fugitive Emissions from Energy Production',
      livestockAndManure: 'Livestock and Manure',
      passengerRoadTransport: 'Passenger Vehicles',
      shipping: 'Shipping (Boats)',
      unallocatedFuelCombustion: 'Unallocated Fuel Combustion',
    }
  }
};
