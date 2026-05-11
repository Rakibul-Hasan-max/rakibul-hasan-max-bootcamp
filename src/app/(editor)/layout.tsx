"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo, 
  Redo, 
  Eye, 
  Play,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1e1e1e] text-white">
      {/* Editor Header */}
      <header className="h-14 border-b border-[#333] flex items-center justify-between px-4 bg-[#181818]">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="h-8 w-8 rounded-md bg-white/5 p-1">
            <Image src="/icon.png" alt="Dragify" width={32} height={32} className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">Home Page</span>
            <span className="text-[10px] text-gray-500">Draft • Last saved 2m ago</span>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="hidden md:flex items-center gap-1 bg-[#252525] p-1 rounded-md">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary bg-[#333]">
            <Monitor className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Tablet className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="h-6 bg-[#333]" />
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
