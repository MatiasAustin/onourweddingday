"use client";

import { motion } from "framer-motion";
import { AnimationSettings } from "@/lib/blocks/schemas";
import { ReactNode } from "react";

interface BlockWrapperProps {
  children: ReactNode;
  animation?: AnimationSettings;
  className?: string;
}

export function BlockWrapper({ children, animation, className = "" }: BlockWrapperProps) {
  // Default animation is a simple fade
  const type = animation?.type || "fade";
  const delay = animation?.delay || 0;
  const duration = animation?.duration || 0.8;

  let initial = {};
  let whileInView = {};

  switch (type) {
    case "slide-up":
      initial = { opacity: 0, y: 50 };
      whileInView = { opacity: 1, y: 0 };
      break;
    case "scale":
      initial = { opacity: 0, scale: 0.9 };
      whileInView = { opacity: 1, scale: 1 };
      break;
    case "fade":
      initial = { opacity: 0 };
      whileInView = { opacity: 1 };
      break;
    case "none":
      return <div className={className}>{children}</div>;
    default:
      initial = { opacity: 0 };
      whileInView = { opacity: 1 };
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
