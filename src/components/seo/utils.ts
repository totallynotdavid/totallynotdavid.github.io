import { SITE_CONFIG } from '@/config/site';

export function createImageObject(url: string, baseUrl?: string) {
  const fullUrl = baseUrl ? new URL(url, baseUrl).toString() : url;
  return {
    '@type': 'ImageObject' as const,
    url: fullUrl,
    width: 1200,
    height: 630,
  };
}

export function getCanonicalUrl(pathname: string, site?: URL) {
  return new URL(pathname, site || SITE_CONFIG.url).toString();
}
