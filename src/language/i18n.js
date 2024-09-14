import {I18n} from 'i18n-js';
import en from '../locales/en.json';
import am from '../locales/am.json';
import oro from '../locales/oro.json'
import * as RNLocalize from 'react-native-localize';

const i18n = new I18n({
    am,
    en,
    
  });
  i18n.defaultLocale="en";
I18n.locale = RNLocalize.getLocales()[0].languageTag;

export default i18n;