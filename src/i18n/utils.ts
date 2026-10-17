import { DEFAULT_LANGUAGE } from '@/config/site';
import { locales, type SupportedLanguage, ui } from './config';

export function useTranslations(lang: string) {
  const langUi = ui[lang as SupportedLanguage] ?? ui[DEFAULT_LANGUAGE];

  return (key: keyof (typeof ui)[typeof DEFAULT_LANGUAGE]): string =>
    langUi[key];
}

export function getLocale(lang: string): string {
  return locales[lang as SupportedLanguage] ?? locales[DEFAULT_LANGUAGE];
}

export function getOgLocale(lang: string): string {
  return getLocale(lang).replace('-', '_');
}
