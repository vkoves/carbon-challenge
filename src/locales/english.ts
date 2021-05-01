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
    // Should include all values from the TileOption enum
    tileOptions: {
      aviationElectrification: 'Share of Electric Planes',
      businessElectricVehicleShare: 'Electric Vehicle Share (Commercial)',
      deforestation: 'Deforerstation Reduction',
      electrificationPercent: 'Electrification',
      fugitiveEmissionsReduction: 'Fugitive Emissions Reduction',
      livestockAndManure: 'Livestock and Manure Reduction',
      renewableShare: 'Renewable Share',
      renewableShareAgriculture: 'Renewable Share (Agriculture)',
      residentialElectricCarShare: 'Electric Car Share (Residential)',
      shipping: 'Shipping',
    }
  }
};
