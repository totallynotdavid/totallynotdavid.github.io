import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Drafts are only built by the dev server. */
export async function getPosts(): Promise<Post[]> {
  return getCollection(
    'posts',
    ({ data }) => !import.meta.env.PROD || !data.draft,
  );
}

export function parsePostId(id: string) {
  const [lang, ...slugParts] = id.split('/');
  return { lang, slug: slugParts.join('/') };
}
