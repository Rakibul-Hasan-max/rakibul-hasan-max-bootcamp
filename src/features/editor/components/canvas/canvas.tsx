"use client";

import { useDroppable } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import { EditorElement } from "../../types";
import { CanvasElement } from "./canvas-element";
import { selectElement } from "../../editorSlice";
import { Plus } from "lucide-react";

export const Canvas = () => {
  const dispatch = useDispatch();
  const { elements, deviceMode, previewMode } = useSelector((state: RootState) => state.editor);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-root",
    data: {
      isCanvas: true,
    },
  });

  const rootElement = elements.find(el => el.id === "__root");

  return (
    <div 
      className={cn(
        "min-h-full py-12 px-8 flex justify-center transition-all duration-500 ease-in-out",
        previewMode && "p-0"
      )}
      onClick={() => dispatch(selectElement(null))}
    >
      <div
        ref={setNodeRef}
        style={{
          width: deviceMode === "DESKTOP" ? "100%" : deviceMode === "TABLET" ? "768px" : "390px",
          minHeight: previewMode ? "100vh" : "calc(100vh - 100px)",
        }}
        className={cn(
          "bg-white transition-all duration-500 ease-in-out relative overflow-hidden",
          !previewMode && "shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-md border border-zinc-800",
          isOver && "ring-2 ring-primary/50 ring-offset-4 ring-offset-[#111]",
          previewMode && "shadow-none rounded-none border-none"
        )}
      >
        {rootElement?.children.map((element) => (
          <CanvasElement key={element.id} element={element} />
        ))}
        
        {rootElement?.children.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 bg-zinc-50/5">
            <div className="h-16 w-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 shadow-sm border border-zinc-200">
              <Plus className="h-8 w-8 text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-800 mb-2">Build your page</h2>
            <p className="text-sm text-zinc-500 max-w-[200px] text-center leading-relaxed">
              Drag and drop components from the left sidebar to start creating.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
