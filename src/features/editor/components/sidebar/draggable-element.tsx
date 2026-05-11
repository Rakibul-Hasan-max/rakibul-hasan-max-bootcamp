"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementType } from "../../types";

interface DraggableElementProps {
  type: ElementType;
  name: string;
  icon: React.ReactNode;
  className?: string;
}

import { useId } from "react";
import { motion } from "framer-motion";

export const DraggableElement = ({ type, name, icon, className }: DraggableElementProps) => {
  const generatedId = useId();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${type.toLowerCase()}-${generatedId}`,
    data: {
      type,
      isNew: true,
      name,
    },
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 ring-2 ring-primary border-primary",
        className
      )}
    >
      <div className="text-zinc-500 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tight">{name}</span>
    </motion.div>
  );
};
