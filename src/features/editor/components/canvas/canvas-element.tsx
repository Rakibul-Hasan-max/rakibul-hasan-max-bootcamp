"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectElement, deleteElement, updateElement } from "../../editorSlice";
import { cn } from "@/lib/utils";
import { EditorElement } from "../../types";
import { Trash2, Copy, Move } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CanvasElementProps {
  element: EditorElement;
}

export const CanvasElement = ({ element }: CanvasElementProps) => {
  const dispatch = useDispatch();
  const { selectedElementId, previewMode } = useSelector((state: RootState) => state.editor);
  const isSelected = selectedElementId === element.id;

  const onElementClick = (e: React.MouseEvent) => {
    if (previewMode) return;
    e.stopPropagation();
    dispatch(selectElement(element.id));
  };

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteElement(element.id));
  };

  const renderContent = () => {
    const commonStyles = {
      ...element.styles,
    };

    switch (element.type) {
      case "TEXT":
        return (
          <div 
            style={commonStyles}
            className="p-4 outline-none" 
            contentEditable={!previewMode} 
            suppressContentEditableWarning
            onBlur={(e) => {
              dispatch(updateElement({
                id: element.id,
                updates: { name: e.currentTarget.innerText }
              }));
            }}
          >
            {element.name}
          </div>
        );
      case "BUTTON":
        return (
          <div className="p-4 flex justify-center">
            <button 
              style={commonStyles}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
              {element.name}
            </button>
          </div>
        );
      case "IMAGE":
        return (
          <div className="p-4" style={commonStyles}>
             <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-muted-foreground/30"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
             </div>
          </div>
        );
      case "NAVBAR":
        return (
          <div 
            style={commonStyles}
            className="w-full border-b px-8 py-4 flex items-center justify-between bg-white text-black"
          >
            <div className="font-bold text-lg">Logo</div>
            <div className="flex gap-6 text-sm font-medium">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
        );
      case "SECTION":
        return (
          <div 
            style={commonStyles}
            className="w-full min-h-[200px] border-b border-dashed border-muted p-8 text-black bg-white"
          >
            {element.children.length === 0 && !previewMode && (
              <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground/30 text-xs">
                Drop elements here
              </div>
            )}
            {element.children.map((child) => (
              <CanvasElement key={child.id} element={child} />
            ))}
          </div>
        );
      default:
        return <div style={commonStyles} className="p-4 border bg-white text-black">{element.name}</div>;
    }
  };

  return (
    <div
      onClick={onElementClick}
      className={cn(
        "relative group transition-all",
        !previewMode && "hover:outline hover:outline-2 hover:outline-primary/50",
        isSelected && !previewMode && "outline outline-2 outline-primary z-10 shadow-lg"
      )}
    >
      {isSelected && !previewMode && (
        <div className="absolute -top-8 left-0 flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-t-md text-[10px] font-bold shadow-sm">
          <span className="uppercase">{element.type}</span>
          <div className="flex items-center gap-1 ml-2 border-l pl-2 border-white/20">
            <Copy className="h-3 w-3 cursor-pointer hover:opacity-80" />
            <Trash2 
              className="h-3 w-3 cursor-pointer hover:text-red-300" 
              onClick={onDelete}
            />
          </div>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};
