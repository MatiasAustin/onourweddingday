"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// The shape of our block data
export interface EditorBlock {
  id: string;
  type: string;
  contentJSON: any;
}

interface EditorContextType {
  blocks: EditorBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<EditorBlock[]>>;
  moveBlock: (oldIndex: number, newIndex: number) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Mock initial data
const initialBlocks: EditorBlock[] = [
  {
    id: "block-1",
    type: "hero",
    contentJSON: {
      title: "John & Jane",
      subtitle: "We're getting married!",
      date: "October 12, 2026",
      primaryImageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      layoutStyle: "centered"
    }
  },
  {
    id: "block-2",
    type: "story",
    contentJSON: {
      title: "Our Love Story",
      events: [
        {
          id: "e1",
          date: "May 2022",
          title: "First Met",
          description: "We met at a coffee shop.",
        }
      ]
    }
  }
];

export function EditorProvider({ children }: { children: ReactNode }) {
  const [blocks, setBlocks] = useState<EditorBlock[]>(initialBlocks);

  const moveBlock = (oldIndex: number, newIndex: number) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const [movedItem] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, movedItem);
      return newBlocks;
    });
  };

  return (
    <EditorContext.Provider value={{ blocks, setBlocks, moveBlock }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
