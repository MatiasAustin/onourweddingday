"use client";

import { BlockType } from "@/lib/blocks/schemas";
import { BlockWrapper } from "./BlockWrapper";
import { HeroBlock } from "./HeroBlock";
import { StoryBlock } from "./StoryBlock";
import { GalleryBlock } from "./GalleryBlock";

// This maps the string 'type' from the database to the actual React component
const BlockComponents: Record<BlockType, React.FC<{ data: any }>> = {
  hero: HeroBlock,
  story: StoryBlock,
  gallery: GalleryBlock,
};

interface BlockRendererProps {
  type: string;
  contentJSON: any;
  animationSettingsJSON?: any;
}

export function BlockRenderer({ type, contentJSON, animationSettingsJSON }: BlockRendererProps) {
  // Validate if the type exists in our registry
  if (!(type in BlockComponents)) {
    console.warn(`Block type "${type}" not found in registry.`);
    return null;
  }

  const Component = BlockComponents[type as BlockType];

  return (
    <BlockWrapper animation={animationSettingsJSON}>
      <Component data={contentJSON} />
    </BlockWrapper>
  );
}
