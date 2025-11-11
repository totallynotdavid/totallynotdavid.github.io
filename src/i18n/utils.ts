import {
  DEFAULT_LANGUAGE,
  languages,
  type SupportedLanguage,
  ui,
} from './config';

export function useTranslations(lang: string) {
  const defaultUi = ui[DEFAULT_LANGUAGE];
  const langUi = ui[lang as SupportedLanguage] || defaultUi;

  return (key: keyof typeof defaultUi): string => {
    return langUi[key] || defaultUi[key];
  };
}

export function getOgLocale(lang: string): string {
  return (
    languages[lang as SupportedLanguage]?.locale ||
    languages[DEFAULT_LANGUAGE].locale
  ).replace('-', '_');
}
