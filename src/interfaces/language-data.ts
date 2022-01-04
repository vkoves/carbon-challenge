import { TileType, IOption, TileOption } from './tile-interfaces;'
import { TilePolicyKey } from '../constants/tile-policies';

/**
 * A common interface for all our language data objects we pass into the i18n
 * library. We need an interface for the configurations for each language to
 * ensure that our translations our consistent and complete. If we add a new
 * key, this will ensure it is added in each language file.
 */
export interface ILanguageData {
  title: string;

  /**
   * Whether this language should show a warning for these translations, such
   * as that they are not done or all auto generated
   */
  showTranslationWarning: 'true' | 'false';

  /**
   * The translation warning to show if showTranslationWarning is true for
   * this language
   */
  translationWarning?: string;

  dismiss: string;

  // These are also used for page titles
  header: {
    home: string;
    simulator: string;
    about: string;
    faq: string;
    takeAction: string;
    language: string;
  };

  intro: {
    slogan1: string;
    slogan2: string;
    startBtn: string;
  };

  about: {
    title: string;
  };

  faq: {
    title: string;
  };

  simulator: {
    analytics: string;
    avgTempLabel: string;
    close: string;
    settings: string;
    tempHelpLabel: string;

    tileOverlay: {
      current: string;
      target: string;
      targetYear: string;
      emissionPrcntLabel: string;
      policiesLabel: string;
    };

    // Require each language to declare the translations for each TileType
    tileTypes: {
      [type in TileType]: string;
    };

    // Optional descriptions of each tile type, explaining what falls under this
    // tile and where expected options may be if they fall under another tile.
    // Should include all values from the TileType enum
    tileTypeDescriptions: {
      [type in TileType]: string | null;
    }

    // Require each language to declare titles for each TileOption
    tileOptionTitles: {
      [optValue in TileOption]: string;
    };

    // Require each language to declare the name and description for each policy
    tilePolicies: {
      [policyKey in TilePolicyKey]: {
        name: string;
        description: string;
      };
    }
  },

  notFound: {
    title: string;
    heading: string;
    body: string;
    returnText: string;
  }
}
