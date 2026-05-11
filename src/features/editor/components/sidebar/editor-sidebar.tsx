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
    <aside className="w-80 border-r bg-background flex flex-col overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b">
          <TabsList className="w-full grid grid-cols-3 bg-muted/50">
            <TabsTrigger value="components" className="text-xs">
              <Box className="h-4 w-4 mr-2" />
              Build
            </TabsTrigger>
            <TabsTrigger value="layers" className="text-xs">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs">
              <Layout className="h-4 w-4 mr-2" />
              Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="components" className="flex-1 overflow-auto p-4 m-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Basics</h3>
              <div className="grid grid-cols-2 gap-3">
                <DraggableElement 
                  type="SECTION" 
                  name="Section" 
                  icon={<Columns className="h-5 w-5" />} 
                />
                <DraggableElement 
                  type="TEXT" 
                  name="Heading" 
                  icon={<Type className="h-5 w-5" />} 
                />
                <DraggableElement 
                  type="TEXT" 
                  name="Text" 
                  icon={<Type className="h-5 w-5 opacity-50" />} 
                />
                <DraggableElement 
                  type="BUTTON" 
                  name="Button" 
                  icon={<MousePointer2 className="h-5 w-5" />} 
                />
                <DraggableElement 
                  type="IMAGE" 
                  name="Image" 
                  icon={<ImageIcon className="h-5 w-5" />} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Layouts</h3>
              <div className="grid grid-cols-1 gap-3">
                 <DraggableElement 
                  type="NAVBAR" 
                  name="Navigation Bar" 
                  icon={<Layout className="h-5 w-5" />} 
                  className="w-full h-16 flex-row justify-start px-4 gap-4"
                />
                 <DraggableElement 
                  type="CARD" 
                  name="Feature Card" 
                  icon={<Box className="h-5 w-5" />} 
                  className="w-full h-16 flex-row justify-start px-4 gap-4"
                />
                 <DraggableElement 
                  type="FOOTER" 
                  name="Site Footer" 
                  icon={<Layout className="h-5 w-5 rotate-180" />} 
                  className="w-full h-16 flex-row justify-start px-4 gap-4"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 overflow-auto p-4 m-0">
          <LayersPanel />
        </TabsContent>

        <TabsContent value="templates" className="flex-1 overflow-auto p-4 m-0">
          <p className="text-xs text-muted-foreground italic">Template library coming soon...</p>
        </TabsContent>
      </Tabs>
    </aside>
  );
};
