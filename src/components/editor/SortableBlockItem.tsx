"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Settings2, GripVertical } from "lucide-react";
import { EditorBlock } from "./EditorContext";

interface SortableBlockItemProps {
  block: EditorBlock;
}

export function SortableBlockItem({ block }: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-4 rounded-xl border ${isDragging ? 'border-primary' : 'border-secondary/50'} shadow-sm transition-colors flex items-center justify-between group`}
    >
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-grab hover:text-primary text-foreground/40 touch-none">
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm capitalize">{block.type}</span>
          <span className="text-xs text-foreground/50 truncate max-w-[150px]">
            {block.contentJSON.title || block.type}
          </span>
        </div>
      </div>
      <button className="p-2 hover:bg-secondary/30 rounded-lg text-foreground/40 hover:text-primary transition-colors">
        <Settings2 className="w-4 h-4" />
      </button>
    </div>
  );
}
