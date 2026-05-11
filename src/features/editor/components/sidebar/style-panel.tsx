"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateElement } from "../../editorSlice";
import { 
  Type, 
  Layout, 
  Palette, 
  Move, 
  Square,
  ChevronDown
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const StylePanel = () => {
  const dispatch = useDispatch();
  const { selectedElementId, elements } = useSelector((state: RootState) => state.editor);

  const findElement = (els: any[], id: string): any => {
    for (const el of els) {
      if (el.id === id) return el;
      if (el.children) {
        const found = findElement(el.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedElement = selectedElementId ? findElement(elements, selectedElementId) : null;

  const handleStyleChange = (key: string, value: string) => {
    if (!selectedElementId) return;
    dispatch(updateElement({
      id: selectedElementId,
      updates: {
        styles: {
          ...selectedElement?.styles,
          [key]: value
        }
      }
    }));
  };

  if (!selectedElementId || !selectedElement) {
    return (
      <aside className="w-[280px] border-l border-zinc-800 bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-center">
        <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
          <Square className="h-5 w-5 text-zinc-700" />
        </div>
        <h3 className="text-[12px] font-bold text-zinc-300">No selection</h3>
        <p className="text-[11px] text-zinc-600 mt-2">
          Select an element on the canvas to edit its properties.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-[280px] border-l border-zinc-800 bg-[#0d0d0d] flex flex-col overflow-hidden">
      <div className="px-4 h-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900/20">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Styles</h3>
        <Badge variant="outline" className="text-[9px] h-4 px-1.5 border-zinc-700 text-zinc-500 bg-zinc-900 font-mono">
          {selectedElement.type}
        </Badge>
      </div>
      
      <div className="flex-1 overflow-auto scrollbar-hide">
        <Accordion type="multiple" defaultValue={["spacing", "typography", "background"]} className="w-full">
          <AccordionItem value="layout" className="border-b border-zinc-800">
            <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center text-[11px] font-bold text-zinc-300 uppercase tracking-tight">
                <Layout className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                Layout
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Display</Label>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 font-normal">
                    {selectedElement.styles.display || "Block"} <ChevronDown className="h-3 w-3 opacity-30" />
                  </Button>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Position</Label>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 font-normal">
                    {selectedElement.styles.position || "Relative"} <ChevronDown className="h-3 w-3 opacity-30" />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="spacing" className="border-b border-zinc-800">
            <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center text-[11px] font-bold text-zinc-300 uppercase tracking-tight">
                <Move className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                Spacing
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
               <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Margin</Label>
                    <Input 
                      placeholder="0px" 
                      className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-primary/20" 
                      value={selectedElement.styles.margin || ""}
                      onChange={(e) => handleStyleChange("margin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Padding</Label>
                    <Input 
                      placeholder="0px" 
                      className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-primary/20" 
                      value={selectedElement.styles.padding || ""}
                      onChange={(e) => handleStyleChange("padding", e.target.value)}
                    />
                  </div>
               </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="typography" className="border-b border-zinc-800">
            <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center text-[11px] font-bold text-zinc-300 uppercase tracking-tight">
                <Type className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                Typography
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Font Size</Label>
                <div className="relative">
                  <Input 
                    placeholder="16px" 
                    className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-primary/20 pr-8" 
                    value={selectedElement.styles.fontSize || ""}
                    onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-zinc-600 font-bold">PX</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Color</Label>
                    <div className="flex gap-2">
                       <div 
                        className="h-8 w-8 rounded bg-zinc-900 border border-zinc-800 flex-shrink-0"
                        style={{ backgroundColor: selectedElement.styles.color || "#000000" }}
                      />
                      <Input 
                        placeholder="#000000" 
                        className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-primary/20 uppercase" 
                        value={selectedElement.styles.color || ""}
                        onChange={(e) => handleStyleChange("color", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Weight</Label>
                    <Input 
                      placeholder="400" 
                      className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-primary/20" 
                      value={selectedElement.styles.fontWeight || ""}
                      onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                    />
                  </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="background" className="border-b border-zinc-800">
            <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center text-[11px] font-bold text-zinc-300 uppercase tracking-tight">
                <Palette className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                Appearance
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <div className="space-y-2">
                <Label className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Background Color</Label>
                <div className="flex gap-2">
                  <div 
                    className="h-8 w-8 rounded border border-zinc-800" 
                    style={{ backgroundColor: selectedElement.styles.backgroundColor || "transparent" }}
                  />
                  <Input 
                    placeholder="#FFFFFF" 
                    className="h-8 text-[11px] bg-zinc-900 border-zinc-800 text-zinc-300 flex-1 focus-visible:ring-primary/20 uppercase" 
                    value={selectedElement.styles.backgroundColor || ""}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
