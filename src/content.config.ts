import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

const projectLink = z.object({
  href: z.string().url(),
  label: z.string(),
  style: z.enum(["solid", "outline"]).default("solid"),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    problem: z.string(),
    whatIBuilt: z.string(),
    stack: z.string(),
    status: z.string().optional(),
    order: z.number().int().default(0),
    cover: z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("gateway"),
        line: z.string(),
        caption: z.string(),
        badge: z.string().optional(),
      }),
      z.object({
        kind: z.literal("image"),
        src: z.string(),
        alt: z.string(),
      }),
    ]),
    links: z.array(projectLink).default([]),
    demoVideo: z
      .object({
        src: z.string().min(1),
        poster: z.string().min(1),
        title: z.string().optional(),
        captions: z
          .object({
            src: z.string().min(1),
            srclang: z.string().default("en"),
            label: z.string().default("English"),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, projects };
