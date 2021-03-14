import { ILanguageData } from '@/interfaces/language-data';

export const EnglishLanguageData: ILanguageData = {
  title: 'The Carbon Challenge',
  header: {
    home: 'Home',
    simulator: 'Simulator',
    language: 'Language',
    disclaimers: 'Disclaimers',
    about: 'About',
  },
  intro: {
    slogan1: 'Climate change is big.',
    slogan2: 'So we have to go even bigger.',
    startBtn: 'Let\'s Go'
  },
  simulator: {
    avgTempLabel: 'Average Global Temperature Increase',
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
      deforestation: 'Deforestation',
      electricCarShare: 'Share of Electric Cars',
      electricHeating: 'Share of Electric Heating',
      renewableShare: 'Share of Renewables',
    }
  }
};
