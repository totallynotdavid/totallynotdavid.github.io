import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    ogImageWidth: z.string().optional(),
    ogImageHeight: z.string().optional(),
    ogImageType: z.string().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
