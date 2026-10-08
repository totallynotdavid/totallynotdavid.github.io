import { SITE_URL } from '@/config/site';

export function createImageObject(
  image: { path: string; width: number; height: number },
  baseUrl: string | URL,
) {
  return {
    '@type': 'ImageObject' as const,
    url: new URL(image.path, baseUrl).toString(),
    width: image.width,
    height: image.height,
  };
}

export function getCanonicalUrl(pathname: string, site?: URL) {
  return new URL(pathname, site || SITE_URL).toString();
}
