import { ILanguageData } from '@/interfaces/language-data';

export const SpanishLanguageData: ILanguageData = {
  title: 'El Desafío Del Carbono',
  header: {
    home: 'Hogar',
    simulator: 'Simulador',
    language: 'Lingua',
    disclaimers: 'Advertencias',
    about: 'Sobre',
  },
  intro: {
    slogan1: 'El cambio climático es grande.',
    slogan2: 'Así que tenemos que ir aún más grandes.',
    startBtn: 'Vamos'
  },
  simulator: {
    avgTempLabel: 'Aumento de la temperatura global promedio',
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
    // Should include all values from the TileOption enum
    tileOptions: {
      deforestation: 'Deforestación',
      electricCarShare: 'Cuota de coches eléctricos',
      electricHeating: 'Cuota de calefacción eléctrica',
      renewableShare: 'Cuota de renovables',
    }
  }
};
