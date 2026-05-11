"use client";

import { 
  DndContext, 
  DragOverlay, 
  DragStartEvent, 
  DragEndEvent, 
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addElement } from "../editorSlice";
import { v4 as uuidv4 } from "uuid";
import { EditorElement } from "../types";
import { Plus } from "lucide-react";

interface EditorShellProps {
  children: React.ReactNode;
}

export const EditorShell = ({ children }: EditorShellProps) => {
  const dispatch = useDispatch();
  const [activeDragItem, setActiveDragItem] = useState<Record<string, any> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItem(event.active.data.current as Record<string, any>);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveDragItem(null);

    const activeData = active.data.current as Record<string, any>;
    
    if (over && activeData?.isNew) {
      const type = activeData.type;
      const newElement: EditorElement = {
        id: uuidv4(),
        type: type,
        name: activeData.name,
        styles: {},
        props: {},
        children: [],
      };

      // Determine parentId
      // If dropped on canvas-root or something that isn't a SECTION, use __root
      // Unless we want to allow dropping inside anything
      const targetId = over.id === "canvas-root" ? "__root" : (over.id as string);
      
      dispatch(addElement({ parentId: targetId, element: newElement }));
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={pointerWithin} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={null} zIndex={1000}>
        {activeDragItem ? (
          <div className="bg-primary border-2 border-primary rounded-xl p-4 shadow-[0_0_30px_rgba(var(--primary),0.3)] opacity-90 backdrop-blur-md flex items-center gap-3 scale-110 transition-transform pointer-events-none">
             <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-primary shadow-lg">
                <Plus className="h-5 w-5" />
             </div>
             <span className="text-sm font-bold text-white tracking-tight uppercase">{activeDragItem.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
