"use client";

import Link from "next/link";
import { 
  ChevronLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo, 
  Redo, 
  Eye, 
  Play,
  Save,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDeviceMode, setPreviewMode, undo, redo, setElements } from "../../editorSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { savePageContent } from "../../actions/editor-actions";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const EditorNavbar = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { deviceMode, previewMode, history, elements } = useSelector((state: RootState) => state.editor);
  const [isSaving, setIsSaving] = useState(false);

  const projectId = params.projectId as string;

  const onSave = async () => {
    setIsSaving(true);
    try {
      const res = await savePageContent(projectId, elements);
      if (res.error) toast.error(res.error);
      if (res.success) toast.success(res.success);
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <nav className="h-14 border-b flex items-center justify-between px-4 bg-background z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/projects">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="h-8 w-8 rounded-md bg-primary/10 p-1">
          <Image src="/icon.png" alt="Dragify" width={32} height={32} className="h-full w-full object-contain" />
        </div>
        <div className="h-4 w-[1px] bg-border mx-2" />
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">Home Page</span>
          <span className="text-[10px] text-muted-foreground">Draft • Auto-saved</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
        <Button
          variant={deviceMode === "DESKTOP" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => dispatch(setDeviceMode("DESKTOP"))}
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant={deviceMode === "TABLET" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => dispatch(setDeviceMode("TABLET"))}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button
          variant={deviceMode === "MOBILE" ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={() => dispatch(setDeviceMode("MOBILE"))}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => dispatch(undo())}
            disabled={history.past.length === 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => dispatch(redo())}
            disabled={history.future.length === 0}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={() => dispatch(setPreviewMode(!previewMode))}>
          {previewMode ? <Edit3 className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {previewMode ? "Edit" : "Preview"}
        </Button>

        <Button variant="outline" size="sm" onClick={onSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
        
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
          <Share2 className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </nav>
  );
};

const Edit3 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
);
