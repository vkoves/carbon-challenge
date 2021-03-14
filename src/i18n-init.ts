/**
 * A separate file to initialize vue-i18n so we can use it in the router
 */
import { createI18n } from 'vue-i18n'

import { AllLanguageData, Locales } from '@/constants/languages';

export const i18n = createI18n({
  locale: Locales.English,
  messages: AllLanguageData,
});
