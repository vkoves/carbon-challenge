import { EnglishLanguageData } from '@/locales/english';
import { SpanishLanguageData } from '@/locales/spanish';

export const AvailableLanguages = [{
  locale: 'en',
  name: 'English'
}, {
  locale: 'es',
  name: 'Español'
}];

/**
 * We need an interface for the configurations for each language to ensure that
 * our translations our complete. If we add a new key, we need to make sure to
 * add it in every language!
 */
export interface ILanguageData {
  title: string;
  header: {
    home: string;
    simulator: string;
    language: string;
    disclaimers: string;
    about: string;
  };
  intro: {
    slogan1: string;
    slogan2: string;
    startBtn: string;
  };
  simulator: {
    avgTempLabel: string;
    close: string;
    tileOverlay: {
      current: string;
      target: string;
      targetYear: string;
    };
    // Should include all values from the TileType enum
    tileTypes: {
      power: string;
      farm: string;
      forest: string;
      house: string;
      office: string;
      factory: string;
      empty: string;
    };
    // Should include all values from the TileOption enum
    tileOptions: {
      deforestation: string;
      electricCarShare: string;
      electricHeating: string;
      renewableShare: string;
    };
  }
}

export interface IStringMap {
  [key: string]: string;
}

interface IStringMapNested {
  [key: string]: string | IStringMap;
}

/**
 * Map our language data away from our strict interface so we can pass it into
 * the internationalization library.
 */
export const AllLanguageData = {
  en: EnglishLanguageData as unknown as IStringMapNested,
  // NOTE: Spanish translations are work in progress, and mostly for testing
  // internationalization
  es: SpanishLanguageData as unknown as IStringMapNested,
};

