import { EnglishLanguageData } from '@/locales/english';
import { SpanishLanguageData } from '@/locales/spanish';

/**
 * The more generic interface for our language data objects, so vue-i18n is fine
 * with it.
 */
interface IStringMapNested {
  [key: string]: string | { [key: string]: string };
}

/**
 * An enum to keep our locales consistent and readable, as the short
 * strings may not always be intuitive
 */
export enum Locales {
  English = 'en',
  Spanish = 'es',
}

/**
 * An array of available languages with their names (in the language) and
 * locale. This updates the cross-app language selector.
 */
export const AvailableLanguages = [{
  locale: Locales.English,
  name: 'English'
}, {
  locale: Locales.Spanish,
  name: 'Español'
}];

/**
 * Map our language data away from our strict interface so we can pass it into
 * the internationalization library.
 */
export const AllLanguageData = {
  [Locales.English]: EnglishLanguageData as unknown as IStringMapNested,
  // NOTE: Spanish translations are work in progress, and mostly for testing
  // internationalization
  [Locales.Spanish]: SpanishLanguageData as unknown as IStringMapNested,
};

