"use client";

import { useEditor } from "./EditorContext";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

export function EditorCanvas() {
  const { blocks } = useEditor();

  return (
    <div className="w-full min-h-full bg-background flex flex-col relative pb-32">
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-sm font-medium">
          Drag sections here to build the invitation
        </div>
      )}
      
      {blocks.map((section) => (
        <BlockRenderer
          key={section.id}
          type={section.type}
          contentJSON={section.contentJSON}
        />
      ))}
    </div>
  );
}
