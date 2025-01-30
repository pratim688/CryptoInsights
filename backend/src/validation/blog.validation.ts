import { z } from 'zod';

// Validate MongoDB ObjectId format
const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format');

// Define schemas for the sub-documents
const BlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    text: z.string().optional(),
    file: z
      .object({
        url: z.string().url(),
        caption: z.string().optional(),
      })
      .optional(),
    style: z.string().optional(),
    items:z
    .array(
      z.object({
        content: z.string(),
        items: z.array(z.any()).optional(),
        meta: z.object({}).optional(),
      })
    )
    .optional(),
  }),
});

const ContentSchema = z.object({
  time: z.number(),
  blocks: z.array(BlockSchema),
  version: z.string(),
});

const ActivitySchema = z.object({
  total_likes: z.number().default(0),
  total_comments: z.number().default(0),
  total_reads: z.number().default(0),
  total_parent_comments: z.number().default(0),
});

// Define the main schema for the Blog document
const BlogSchema = z.object({
  blog_id: z.string(),
  title: z.string(),
  banner: z.string(),
  des: z.string(),
  content: z.array(ContentSchema).default([]),
  tags: z.array(z.string()).default([]),
  author: ObjectIdSchema,
  activity: ActivitySchema,
  comments: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  publishedAt: z.date().optional().default(() => new Date()),
  updatedAt: z.date().optional().default(() => new Date()),
});

// Export the Zod schema
export { BlogSchema, ContentSchema };
