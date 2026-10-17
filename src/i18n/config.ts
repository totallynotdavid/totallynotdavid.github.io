import { SITE_CONFIG, type SUPPORTED_LANGUAGES } from '@/config/site';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const locales: Record<SupportedLanguage, string> = {
  en: 'en-US',
  es: 'es-ES',
};

export const ui = {
  en: {
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
