"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { selectElement, deleteElement } from "../../editorSlice";
import { 
  Type, 
  Box, 
  ImageIcon, 
  MousePointer2, 
  Layout, 
  Trash2,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EditorElement } from "../../types";

export const LayersPanel = () => {
  const dispatch = useDispatch();
  const { elements, selectedElementId } = useSelector((state: RootState) => state.editor);

  const root = elements.find(el => el.id === "__root");

  if (!root) return null;

  return (
    <div className="flex flex-col gap-1">
      <LayerItem 
        element={root} 
        depth={0} 
        selectedId={selectedElementId} 
        onSelect={(id) => dispatch(selectElement(id))}
        onDelete={(id) => dispatch(deleteElement(id))}
      />
    </div>
  );
};

const LayerItem = ({ 
  element, 
  depth, 
  selectedId, 
  onSelect, 
  onDelete 
}: { 
  element: EditorElement; 
  depth: number; 
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedId === element.id;
  const hasChildren = element.children && element.children.length > 0;

  const getIcon = () => {
    switch (element.type) {
      case "TEXT": return <Type className="h-3 w-3" />;
      case "BUTTON": return <MousePointer2 className="h-3 w-3" />;
      case "IMAGE": return <ImageIcon className="h-3 w-3" />;
      case "NAVBAR": return <Layout className="h-3 w-3" />;
      case "SECTION": return <Box className="h-3 w-3" />;
      default: return <Box className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors group",
          isSelected ? "bg-primary text-white" : "hover:bg-muted"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => onSelect(element.id)}
      >
        {hasChildren ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="hover:bg-black/10 rounded"
          >
            {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        ) : (
          <div className="w-3" />
        )}
        {getIcon()}
        <span className="text-[11px] font-medium truncate flex-1">{element.name}</span>
        {element.id !== "__root" && (
          <Trash2 
            className={cn(
              "h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity",
              isSelected ? "text-white" : "text-muted-foreground hover:text-destructive"
            )} 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
          />
        )}
      </div>
      
      {isOpen && hasChildren && (
        <div className="flex flex-col mt-1">
          {element.children.map((child) => (
            <LayerItem 
              key={child.id} 
              element={child} 
              depth={depth + 1} 
              selectedId={selectedId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
