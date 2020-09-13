import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from 'src/i18n';
import { Cookies } from 'quasar';

Vue.use(VueI18n);

let langIso = 'en-us';
if (Cookies.has('app_lang')) {
  langIso = Cookies.get('app_lang');
}

const i18n = new VueI18n({
  locale: langIso,
  fallbackLocale: 'en-us',
  messages
})

export default ({ app }) => {
  app.i18n = i18n;
};

export { i18n };
