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

export const DraggableElement = ({ type, name, icon, className }: DraggableElementProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${type.toLowerCase()}-${Math.random()}`,
    data: {
      type,
      isNew: true,
      name,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 p-3 text-xs font-medium transition-all hover:bg-primary/5 hover:border-primary/30 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 ring-2 ring-primary",
        className
      )}
    >
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="text-[10px] text-muted-foreground">{name}</span>
    </div>
  );
};
