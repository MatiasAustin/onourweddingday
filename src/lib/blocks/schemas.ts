import { z } from "zod";

// --- Base Animation Settings ---
export const AnimationSettingsSchema = z.object({
  type: z.enum(["fade", "slide-up", "scale", "parallax", "none"]).default("fade"),
  delay: z.number().default(0),
  duration: z.number().default(0.8),
});

export type AnimationSettings = z.infer<typeof AnimationSettingsSchema>;

// --- Block Schemas ---

// 1. Hero Block
export const HeroBlockSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.string().optional(),
  primaryImageUrl: z.string().url(),
  secondaryImageUrl: z.string().url().optional(),
  layoutStyle: z.enum(["centered", "split", "oval-mask"]).default("oval-mask"),
});

export type HeroBlockData = z.infer<typeof HeroBlockSchema>;

// 2. Story / Timeline Block
export const StoryEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
});

export const StoryBlockSchema = z.object({
  title: z.string().default("Our Love Story"),
  events: z.array(StoryEventSchema),
});

export type StoryBlockData = z.infer<typeof StoryBlockSchema>;

// 3. Gallery Block
export const GalleryImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  caption: z.string().optional(),
  colSpan: z.number().min(1).max(3).default(1),
  rowSpan: z.number().min(1).max(3).default(1),
});

export const GalleryBlockSchema = z.object({
  title: z.string().default("Captured Moments"),
  images: z.array(GalleryImageSchema),
  layoutStyle: z.enum(["grid", "masonry", "carousel"]).default("masonry"),
});

export type GalleryBlockData = z.infer<typeof GalleryBlockSchema>;

// --- Unified Block Type ---
// This represents what is stored in Section.contentJSON in the DB
export type BlockDataMap = {
  "hero": HeroBlockData;
  "story": StoryBlockData;
  "gallery": GalleryBlockData;
};

export type BlockType = keyof BlockDataMap;
