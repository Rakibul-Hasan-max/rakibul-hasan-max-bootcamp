"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
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

export const StylePanel = () => {
  const { selectedElementId, elements } = useSelector((state: RootState) => state.editor);

  if (!selectedElementId) {
    return (
      <aside className="w-80 border-l bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Square className="h-6 w-6 text-muted-foreground/50" />
        </div>
        <h3 className="text-sm font-bold">No element selected</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Select an element on the canvas to edit its styles and properties.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-l bg-background flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30">
        <h3 className="text-xs font-bold uppercase tracking-wider">Style Editor</h3>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Accordion type="multiple" defaultValue={["spacing", "typography"]} className="w-full">
          <AccordionItem value="layout" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
              <div className="flex items-center text-xs font-semibold">
                <Layout className="h-4 w-4 mr-2" />
                Layout
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-muted-foreground">Display</Label>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs font-normal">
                    Block <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase text-muted-foreground">Position</Label>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs font-normal">
                    Relative <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="spacing" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
              <div className="flex items-center text-xs font-semibold">
                <Move className="h-4 w-4 mr-2" />
                Spacing
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Margin</Label>
                      <Input placeholder="0" className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Padding</Label>
                      <Input placeholder="0" className="h-8 text-xs" />
                    </div>
                 </div>
               </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="typography" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
              <div className="flex items-center text-xs font-semibold">
                <Type className="h-4 w-4 mr-2" />
                Typography
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] text-muted-foreground">Font Family</Label>
                  <Button variant="outline" size="sm" className="w-full justify-between h-8 text-xs font-normal">
                    Inter <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Size</Label>
                      <Input placeholder="16px" className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Weight</Label>
                      <Input placeholder="400" className="h-8 text-xs" />
                    </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="background" className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 transition-colors">
              <div className="flex items-center text-xs font-semibold">
                <Palette className="h-4 w-4 mr-2" />
                Background
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground">Color</Label>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded border bg-white" />
                  <Input placeholder="#FFFFFF" className="h-8 text-xs flex-1" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
