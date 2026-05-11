"use client";

import { useState } from "react";
import { 
  Box, 
  Layers, 
  Layout, 
  Settings2,
  Plus,
  Type,
  Image as ImageIcon,
  MousePointer2,
  Columns
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DraggableElement } from "./draggable-element";
import { LayersPanel } from "./layers-panel";

export const EditorSidebar = () => {
  const [activeTab, setActiveTab] = useState("components");

  return (
    <aside className="w-[260px] border-r border-zinc-800 bg-[#0d0d0d] flex flex-col overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-3 py-2">
          <TabsList className="w-full grid grid-cols-3 bg-zinc-900/50 h-9 p-1 border border-zinc-800">
            <TabsTrigger value="components" className="text-[10px] uppercase font-bold tracking-tight data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">
              <Box className="h-3 w-3 mr-1.5" />
              Build
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-[10px] uppercase font-bold tracking-tight data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">
              <Layers className="h-3 w-3 mr-1.5" />
              Layers
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-[10px] uppercase font-bold tracking-tight data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">
              <Layout className="h-3 w-3 mr-1.5" />
              Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="components" className="flex-1 overflow-auto p-3 m-0 space-y-6 scrollbar-hide">
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 px-1">Basics</h3>
            <div className="grid grid-cols-2 gap-2">
              <DraggableElement 
                type="SECTION" 
                name="Section" 
                icon={<Columns className="h-4 w-4" />} 
              />
              <DraggableElement 
                type="TEXT" 
                name="Text" 
                icon={<Type className="h-4 w-4" />} 
              />
              <DraggableElement 
                type="BUTTON" 
                name="Button" 
                icon={<MousePointer2 className="h-4 w-4" />} 
              />
              <DraggableElement 
                type="IMAGE" 
                name="Image" 
                icon={<ImageIcon className="h-4 w-4" />} 
              />
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 px-1">Layouts</h3>
            <div className="space-y-2">
               <DraggableElement 
                type="NAVBAR" 
                name="Navigation Bar" 
                icon={<Layout className="h-4 w-4" />} 
                className="w-full h-12 flex-row justify-start px-3 gap-3"
              />
               <DraggableElement 
                type="CARD" 
                name="Feature Card" 
                icon={<Box className="h-4 w-4" />} 
                className="w-full h-12 flex-row justify-start px-3 gap-3"
              />
               <DraggableElement 
                type="FOOTER" 
                name="Site Footer" 
                icon={<Layout className="h-4 w-4 rotate-180" />} 
                className="w-full h-12 flex-row justify-start px-3 gap-3"
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 overflow-auto p-3 m-0 scrollbar-hide">
          <LayersPanel />
        </TabsContent>

        <TabsContent value="templates" className="flex-1 overflow-auto p-3 m-0 scrollbar-hide">
          <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
            <Layout className="h-8 w-8 text-zinc-800" />
            <p className="text-[11px] text-zinc-600">Assets coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};
