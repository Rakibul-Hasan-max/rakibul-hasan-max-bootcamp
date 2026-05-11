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
    <div className="h-screen w-full bg-[#0a0a0a] overflow-hidden">
      {children}
    </div>
  );
}
