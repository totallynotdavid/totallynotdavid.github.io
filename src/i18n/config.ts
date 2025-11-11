import { SITE_CONFIG } from '@/config/site';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './settings';

export interface LanguageConfig {
  code: string;
  name: string;
  locale: string;
  rtl?: boolean;
}

export interface I18nConfig {
  languages: Record<string, LanguageConfig>;
  defaultLang: string;
  showDefaultLang: boolean;
  routes: Record<string, Record<string, string>>;
}

export const i18nConfig: I18nConfig = {
  languages: {
    en: { code: 'en', name: 'English', locale: 'en-US' },
    es: { code: 'es', name: 'Español', locale: 'es-ES' },
  },
  defaultLang: DEFAULT_LANGUAGE,
  showDefaultLang: true,
  routes: {
    es: {
      posts: 'articulos',
      about: 'acerca-de',
    },
  },
};

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'site.title': SITE_CONFIG.title,
    'site.description': SITE_CONFIG.description.en,
    'posts.draft': 'DRAFT',
    'footer.tagline': 'Letting time pass...',
    'toc.index': 'Index',
    'toc.nav_label': 'Table of contents',
    'toc.return_home': 'Return to home page',
    'toc.jump_to_section': 'Jump to section:',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.posts': 'Artículos',
    'site.title': SITE_CONFIG.title,
    'site.description': SITE_CONFIG.description.es,
    'posts.draft': 'BORRADOR',
    'footer.tagline': 'Dejando pasar el tiempo...',
    'toc.index': 'Índice',
    'toc.nav_label': 'Tabla de contenidos',
    'toc.return_home': 'Volver al inicio',
    'toc.jump_to_section': 'Ir a la sección:',
  },
} as const;

function validateI18nConfig(config: I18nConfig): void {
  if (!config.languages[config.defaultLang]) {
    throw new Error(
      `Default language ${config.defaultLang} not found in languages`,
    );
  }

  for (const lang of Object.keys(config.routes)) {
    if (!config.languages[lang]) {
      throw new Error(`Route mapping for unknown language: ${lang}`);
    }
  }

  const langKeys = Object.keys(config.languages);
  for (const l of SUPPORTED_LANGUAGES) {
    if (!langKeys.includes(l)) {
      throw new Error(
        `SUPPORTED_LANGUAGES entry "${l}" missing from i18nConfig.languages`,
      );
    }
  }
}

validateI18nConfig(i18nConfig);
