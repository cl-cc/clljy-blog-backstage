// index.ts 文件内容

import { createI18n } from 'vue-i18n';

import ZH from './zh';
import EN from './en';

const message = {
  zh: {
    ...ZH,
  },
  en: {
    ...EN,
  },
};

const getCurrentLanguage = () => {
  const UAlang = navigator.language; // zh-CN
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en';
  localStorage.setItem('lang', langCode);
  return langCode;
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: message,
});

export default i18n;
