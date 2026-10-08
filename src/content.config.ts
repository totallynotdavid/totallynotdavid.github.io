import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      ogImage: image().optional(),
    }),
});

// Home entries use the language code as the filename.
const homeCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/home' }),
});

export const collections = {
  posts: postsCollection,
  home: homeCollection,
};
