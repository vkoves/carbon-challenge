import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AllLanguageData } from './constants/language-data';

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  messages: AllLanguageData,
});

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app')
