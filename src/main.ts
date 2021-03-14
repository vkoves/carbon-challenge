import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AllLanguageData, Locales } from './constants/languages';

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: Locales.English,
  messages: AllLanguageData,
});

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
