// astro.config.ts imports this file directly. Keep its imports alias-free.
export const SITE_URL = 'https://totallynotdavid.github.io';

export const DEFAULT_LANGUAGE = 'en' as const;
export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;

export const SITE_CONFIG = {
  title: 'David Duran',
  description: {
    en: 'Physicist + Developer + Designer',
    es: 'Físico + Desarrollador + Diseñador',
  },
  url: SITE_URL,

  author: {
    name: 'David Duran',
    email: 'david@caefisica.com',
    jobTitle: 'Researcher',
    avatar: { path: '/icon.png', width: 139, height: 139 },
    social: {
      twitter: 'https://x.com/totallynotdavid',
      github: 'https://github.com/totallynotdavid',
      linkedin: 'https://linkedin.com/in/amosduran',
    },
  },

  analytics: {
    umamiWebsiteId: 'f5b7f149-6026-4028-b5f4-07776424723e',
  },
} as const;
