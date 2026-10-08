import { SUPPORTED_LANGUAGES } from '@/config/site';
import type { SupportedLanguage } from '@/i18n/config';
import { getPosts } from '@/lib/posts';

/**
 * The languages a page exists in, and the path shared by all of them once the
 * language prefix is removed. The home page exists in every language; a post
 * exists only in the languages that have a file for it.
 */
export async function getAlternates(pathname: string) {
  const [, , ...rest] = pathname.split('/');
  const path = rest.filter(Boolean).join('/');

  if (!path) return { path, languages: [...SUPPORTED_LANGUAGES] };

  const ids = new Set((await getPosts()).map((post) => post.id));
  const languages: SupportedLanguage[] = SUPPORTED_LANGUAGES.filter((lang) =>
    ids.has(`${lang}/${path}`),
  );
  return { path, languages };
}
