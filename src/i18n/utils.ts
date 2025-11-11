import { getCollection } from 'astro:content';
import { i18nConfig, ui } from './config';

export function getLangFromUrl(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const potentialLang = segments[0];
  return isValidLang(potentialLang) ? potentialLang : i18nConfig.defaultLang;
}

export function isValidLang(lang: string): boolean {
  return lang in i18nConfig.languages;
}

export function useTranslations(lang: string) {
  const defaultUi = ui[i18nConfig.defaultLang as keyof typeof ui];
  const langUi = ui[lang as keyof typeof ui] || defaultUi;

  return (key: keyof typeof defaultUi): string => {
    return langUi[key] || defaultUi[key];
  };
}

export function useTranslatedPath(lang: string) {
  return function translatePath(
    path: string,
    targetLang: string = lang,
  ): string {
    const cleanPath = path.replace(/^\/+|\/+$/g, '') || '';
    return buildUrl(cleanPath, targetLang);
  };
}

function translateRoute(baseRoute: string, targetLang: string): string {
  if (targetLang === i18nConfig.defaultLang) {
    return baseRoute;
  }
  return i18nConfig.routes[targetLang]?.[baseRoute] || baseRoute;
}

function buildUrl(baseRoute: string, lang: string): string {
  const translatedRoute = translateRoute(baseRoute, lang);
  const needsLangPrefix =
    i18nConfig.showDefaultLang || lang !== i18nConfig.defaultLang;

  let path = needsLangPrefix ? `/${lang}` : '';
  if (translatedRoute && translatedRoute !== '/') {
    path += `/${translatedRoute}`;
  }

  return path || '/';
}

export function parseLocalizedId(id: string): { base: string; lang: string } {
  const filename = id.split(/[/\\]/).pop() || id;
  const match = filename.match(/^(.+)\.([a-z]{2})\.(mdx?|md)$/);

  if (match) {
    return { base: match[1], lang: match[2] };
  }

  // Fallback for files without language suffix
  const base = filename.replace(/\.(mdx?|md)$/, '');
  return { base, lang: i18nConfig.defaultLang };
}

let articleTranslations: Record<string, Record<string, string>> | null = null;

async function getArticleTranslations() {
  if (articleTranslations) return articleTranslations;

  const posts = await getCollection('posts');
  const translations: Record<string, Record<string, string>> = {};

  for (const post of posts) {
    const { base, lang } = parseLocalizedId(post.id);
    const slug = post.data.slugOverride || base;
    const url = buildUrl(slug, lang);

    if (!translations[base]) {
      translations[base] = {};
    }
    translations[base][lang] = url;
  }

  articleTranslations = translations;
  return translations;
}

export async function getLanguageHref(
  targetLang: string,
  currentUrl: string,
  fallbackRoute: string = '',
): Promise<string> {
  const translations = await getArticleTranslations();

  // find the base slug for current URL
  const currentBase = Object.entries(translations).find(([_, variants]) =>
    Object.values(variants).includes(currentUrl.replace(/\/$/, '') || '/'),
  )?.[0];

  // if we found a translation for this article, use it
  if (currentBase && translations[currentBase]?.[targetLang]) {
    return translations[currentBase][targetLang];
  }

  // fallback to translated route
  return buildUrl(fallbackRoute, targetLang);
}
