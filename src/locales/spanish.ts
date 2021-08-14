import { ILanguageData } from '@/interfaces/language-data';

export const SpanishLanguageData: ILanguageData = {
  title: 'El Desafío Del Carbono',
  header: {
    home: 'Hogar',
    simulator: 'Simulador',
    disclaimers: 'Advertencias',
    about: 'Sobre',
    language: 'Lingua',
  },
  intro: {
    slogan1: 'El cambio climático es grande.',
    slogan2: 'Así que tenemos que ir aún más grandes.',
    startBtn: 'Vamos'
  },
  simulator: {
    avgTempLabel: 'Aumento de la temperatura global promedio para 2100',
    close: 'Cerrar',
    tileOverlay: {
      current: 'Actual',
      target: 'Objetivo',
      targetYear: 'Año objetivo',
    },
    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Planta de energía',
      farm: 'Granja',
      forest: 'Bosque',
      house: 'Casa',
      office: 'Oficina',
      factory: 'Fábrica',
      empty: 'Vacío',
    },
    // Optional descriptions of each tile type, explaining what falls under this
    // tile and where expected options may be if they fall under another tile.
    // Should include all values from the TileType enum
    tileTypeDescriptions: {
      // TODO: Add translations
      power:
        'Emissions that are broadly tied to generating power. Emissions for ' +
        'specific uses are under the Home, Office, and Factory tiles.',
      farm: null,
      forest: null,
      house: null,
      office: null,
      factory: null,
      empty: null,
    },
    // Should include all values from the TileOption enum
    tileOptionTitles: {
      // TODO: Fill these out
      aviation: '',
      commercialRoadTransport: '',
      deforestation: '',
      energyAgriculture: '',
      energyCommercialBuildings: '',
      energyIndustry: '',
      energyResidential: '',
      freightRoadTransport: '',
      fugitiveEmissions: '',
      livestockAndManure: '',
      passengerRoadTransport: '',
      shipping: '',
      unallocatedFuelCombustion: '',
    }
  }
};
