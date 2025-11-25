import { SITE_CONFIG } from '@/config/site';

export const DEFAULT_LANGUAGE = 'en' as const;
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageConfig {
  code: string;
  name: string;
  locale: string;
  rtl?: boolean;
}

export const languages: Record<SupportedLanguage, LanguageConfig> = {
  en: { code: 'en', name: 'English', locale: 'en-US' },
  es: { code: 'es', name: 'Español', locale: 'es-ES' },
};

export const defaultLanguage = languages[DEFAULT_LANGUAGE];

export function createLanguagePattern(): RegExp {
  return new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})`);
}

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'site.title': SITE_CONFIG.title,
    'site.description': SITE_CONFIG.description.en,
    'posts.draft': 'DRAFT',
    'footer.tagline': 'Letting time pass…',
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
    'footer.tagline': 'Dejando pasar el tiempo…',
    'toc.index': 'Índice',
    'toc.nav_label': 'Tabla de contenidos',
    'toc.return_home': 'Volver al inicio',
    'toc.jump_to_section': 'Ir a la sección:',
  },
} as const;
