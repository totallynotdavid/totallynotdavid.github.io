import { defineCollection, z } from 'astro:content';
import { i18nConfig } from '@/i18n/config';

const postsCollection = defineCollection({
  type: 'content',
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
    slugOverride: z.string().optional(),
    lang: z.string().default(i18nConfig.defaultLang),
    baseSlug: z.string().default(''),
  }),
});

export const collections = {
  posts: postsCollection,
};
