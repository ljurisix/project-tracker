import i18n from 'i18n-js';

import moment from 'moment';
import 'moment/locale/hr';
import 'moment/locale/en-gb';

import en from '../../assets/i18n/en.json';
import hr from '../../assets/i18n/hr.json';

let lang = localStorage.getItem('APP_LANG');
lang = lang ? lang : 'hr';

i18n.locale = lang;
i18n.fallbacks = true;
i18n.translations = { en, hr };

export const setLang = (lang: string) => {
  moment.locale(lang);
  i18n.locale = lang;
  localStorage.setItem('APP_LANG', lang);
};

export default i18n;
