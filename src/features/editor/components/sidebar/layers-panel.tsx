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
import { motion, AnimatePresence } from "framer-motion";

export const LayersPanel = () => {
  const dispatch = useDispatch();
  const { elements, selectedElementId } = useSelector((state: RootState) => state.editor);

  const root = elements.find(el => el.id === "__root");

  if (!root) return null;

  return (
    <div className="flex flex-col">
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
      case "CARD": return <Box className="h-3 w-3" />;
      default: return <Box className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-2 px-2 py-1 cursor-pointer transition-colors group h-8",
          isSelected ? "bg-zinc-800 text-zinc-100" : "hover:bg-zinc-900 text-zinc-500"
        )}
        style={{ paddingLeft: `${depth * 10 + 8}px` }}
        onClick={() => onSelect(element.id)}
      >
        {hasChildren ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="hover:bg-white/5 rounded-sm p-0.5"
          >
            {isOpen ? <ChevronDown className="h-3 w-3 opacity-40" /> : <ChevronRight className="h-3 w-3 opacity-40" />}
          </button>
        ) : (
          <div className="w-4" />
        )}
        <div className={cn("transition-colors", isSelected ? "text-primary" : "text-zinc-600")}>
          {getIcon()}
        </div>
        <span className="text-[10.5px] font-bold uppercase tracking-tight truncate flex-1">{element.name}</span>
        {element.id !== "__root" && (
          <button
            className={cn(
              "h-5 w-5 flex items-center justify-center rounded hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity",
              isSelected ? "text-zinc-400" : "text-zinc-700"
            )} 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
