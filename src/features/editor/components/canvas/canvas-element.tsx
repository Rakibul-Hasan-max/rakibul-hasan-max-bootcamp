"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { selectElement, deleteElement, updateElement } from "../../editorSlice";
import { cn } from "@/lib/utils";
import { EditorElement } from "../../types";
import { Trash2, Copy, Move, Plus, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

interface CanvasElementProps {
  element: EditorElement;
}

export const CanvasElement = ({ element }: CanvasElementProps) => {
  const dispatch = useDispatch();
  const { selectedElementId, previewMode } = useSelector((state: RootState) => state.editor);
  const isSelected = selectedElementId === element.id;

  const { setNodeRef, isOver } = useDroppable({
    id: element.id,
    disabled: previewMode,
  });

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
            className="p-4 outline-none min-h-[1em] text-zinc-800" 
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
          <div className="p-6 flex justify-center">
            <button 
              style={commonStyles}
              className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              {element.name}
            </button>
          </div>
        );
      case "IMAGE":
        return (
          <div className="p-8" style={commonStyles}>
             <div className="aspect-video bg-zinc-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 group/img transition-colors hover:border-primary/30">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                  <Plus className="h-6 w-6 text-zinc-400 group-hover/img:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Upload Image</span>
             </div>
          </div>
        );
      case "NAVBAR":
        return (
          <div 
            style={commonStyles}
            className="w-full border-b border-zinc-100 px-12 py-6 flex items-center justify-between bg-white text-zinc-900"
          >
            <div className="font-black text-2xl tracking-tighter italic">DRAGIFY.</div>
            <div className="flex gap-10 text-[13px] font-bold uppercase tracking-widest text-zinc-500">
              <span className="hover:text-primary cursor-pointer transition-colors">Solutions</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Pricing</span>
              <span className="hover:text-primary cursor-pointer transition-colors">About</span>
            </div>
            <button className="px-6 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">Get Started</button>
          </div>
        );
      case "SECTION":
        return (
          <div 
            style={commonStyles}
            className={cn(
              "w-full min-h-[300px] p-12 text-zinc-900 bg-white relative transition-colors",
              !previewMode && "hover:bg-zinc-50/50"
            )}
          >
            {element.children.length === 0 && !previewMode && (
              <div className="h-48 border-2 border-dashed border-zinc-100 rounded-3xl flex flex-col items-center justify-center text-zinc-300 group/sec transition-all hover:border-primary/20 hover:bg-primary/[0.02]">
                <Plus className="h-8 w-8 mb-2 opacity-20 group-hover/sec:opacity-100 group-hover/sec:text-primary transition-all" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Drop Content Here</span>
              </div>
            )}
            {element.children.map((child) => (
              <CanvasElement key={child.id} element={child} />
            ))}
          </div>
        );
       case "CARD":
        return (
          <div className="p-8">
            <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Box className="h-6 w-6 text-primary" />
               </div>
               <h3 className="text-xl font-bold text-zinc-900 mb-2">Advanced Analytics</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">
                  Track your progress with our state-of-the-art reporting tools designed for high-growth teams.
               </p>
            </div>
          </div>
        );
      default:
        return <div style={commonStyles} className="p-6 border border-zinc-100 bg-white text-zinc-800">{element.name}</div>;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      onClick={onElementClick}
      className={cn(
        "relative group transition-all duration-200",
        !previewMode && "hover:ring-2 hover:ring-primary/20 hover:ring-offset-0",
        isSelected && !previewMode && "ring-2 ring-primary z-20 shadow-2xl",
        isOver && "ring-2 ring-primary/50 ring-offset-4 ring-offset-white"
      )}
    >
      <AnimatePresence>
        {isSelected && !previewMode && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-9 left-0 flex items-center gap-1 bg-primary text-white h-7 px-3 rounded-t-lg shadow-lg z-30"
          >
            <span className="text-[9px] font-black uppercase tracking-widest">{element.type}</span>
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
              <button className="hover:text-white/70 transition-colors">
                <Copy className="h-3 w-3" />
              </button>
              <button 
                className="hover:text-red-200 transition-colors"
                onClick={onDelete}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
            {/* Drag Handle */}
            <div className="ml-2 cursor-grab active:cursor-grabbing">
              <Move className="h-3 w-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {renderContent()}
    </motion.div>
  );
};
