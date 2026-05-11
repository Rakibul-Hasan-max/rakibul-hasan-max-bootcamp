"use client";

import { useDroppable, DndContext, DragOverlay } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import { EditorElement } from "../../types";
import { CanvasElement } from "./canvas-element";
import { addElement, selectElement } from "../../editorSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const Canvas = () => {
  const dispatch = useDispatch();
  const { elements, deviceMode, previewMode } = useSelector((state: RootState) => state.editor);
  const [activeDragItem, setActiveDragItem] = useState<any>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: {
      isCanvas: true,
    },
  });

  const handleDragStart = (event: any) => {
    setActiveDragItem(event.active.data.current);
  };

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    setActiveDragItem(null);

    if (over && active.data.current?.isNew) {
      const type = active.data.current.type;
      const newElement: EditorElement = {
        id: uuidv4(),
        type: type,
        name: active.data.current.name,
        styles: {},
        props: {},
        children: [],
      };

      // In this basic version, we just add to root
      dispatch(addElement({ parentId: "__root", element: newElement }));
    }
  };

  const rootElement = elements.find(el => el.id === "__root");

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div 
        className={cn(
          "min-h-full p-10 flex justify-center transition-all duration-300",
          previewMode && "p-0"
        )}
        onClick={() => dispatch(selectElement(null))}
      >
        <div
          ref={setNodeRef}
          style={{
            width: deviceMode === "DESKTOP" ? "100%" : deviceMode === "TABLET" ? "768px" : "390px",
          }}
          className={cn(
            "bg-white shadow-2xl min-h-[800px] transition-all duration-300 relative rounded-sm overflow-hidden",
            isOver && "ring-2 ring-primary ring-inset",
            previewMode && "shadow-none rounded-none"
          )}
        >
          {rootElement?.children.map((element) => (
            <CanvasElement key={element.id} element={element} />
          ))}
          
          {rootElement?.children.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 opacity-20"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
              </div>
              <p className="text-sm font-medium">Drag components here to start building</p>
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeDragItem ? (
          <div className="bg-primary/10 border-2 border-primary rounded-xl p-4 shadow-xl opacity-80 backdrop-blur-sm flex items-center gap-3">
             <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
             </div>
             <span className="text-sm font-bold text-primary">{activeDragItem.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
