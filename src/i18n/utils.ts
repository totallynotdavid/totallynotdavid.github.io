import { ui } from './config';

export function useTranslations(lang: string) {
  const defaultUi = ui['en'];
  const langUi = ui[lang as keyof typeof ui] || defaultUi;

  return (key: keyof typeof defaultUi): string => {
    return langUi[key] || defaultUi[key];
  };
}
