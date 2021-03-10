/** The width of our simulator grid */
export const GridWidth = 4;

export const AvailableLanguages = [{
  locale: 'en',
  name: 'English'
}, {
  locale: 'es',
  name: 'Español'
}];

export const AllLanguageData = {
  en: {
    title: 'The Carbon Challenge',
    header: {
      home: 'Home',
      simulator: 'Simulator',
      language: 'Language',
    },
    intro: {
      slogan1: 'Climate change is big.',
      slogan2: 'So we have to go even bigger.',
      startBtn: 'Let\'s Go'
    },
    simulator: {
      avgTempLabel: 'Average Global Temperature Increase',
      close: 'Close',
      // Should include all value from the TileType enum
      tileTypes: {
        power: 'Power Plant',
        farm: 'Farm',
        house: 'House',
        office: 'Office',
        factory: 'Factory',
        empty: 'Empty',
      }
    }
  },
  // NOTE: Spanish translations are work in progress, and mostly for testing
  // internationalization
  es: {
    title: 'El Desafío Del Carbono',
    header: {
      home: 'Hogar',
      simulator: 'Simulador',
      language: 'Lingua',
    },
    intro: {
      slogan1: 'El cambio climático es grande.',
      slogan2: 'Así que tenemos que ir aún más grandes.',
      startBtn: 'Vamos'
    },
    simulator: {
      avgTempLabel: 'Aumento de la temperatura global promedio',
      close: 'Cerrar',
      // Should include all value from the TileType enum
      tileTypes: {
        power: 'Planta de energía',
        farm: 'Granja',
        house: 'Casa',
        office: 'Oficina',
        factory: 'Fábrica',
        empty: 'Vacío',
      }
    }
  }
};

