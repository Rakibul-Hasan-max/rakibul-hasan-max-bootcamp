"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { 
  MoreHorizontal, 
  ExternalLink, 
  Copy, 
  Trash2, 
  Edit3,
  Globe,
  FileText
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { deleteProject, duplicateProject } from "../actions/project-actions";

interface ProjectCardProps {
  project: any;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const onDuplicate = async () => {
    const res = await duplicateProject(project.id);
    if (res.error) toast.error(res.error);
    if (res.success) toast.success(res.success);
  };

  const onDelete = async () => {
    const res = await deleteProject(project.id);
    if (res.error) toast.error(res.error);
    if (res.success) toast.success(res.success);
  };

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-background/50 backdrop-blur-sm">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
            <FileText className="h-12 w-12 text-primary/20" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/editor/${project.id}`}>
              <Edit3 className="h-4 w-4 mr-2" />
              Open Editor
            </Link>
          </Button>
          <Button variant="secondary" size="icon" className="h-9 w-9" asChild>
             <Link href={`/p/${project.slug}`} target="_blank">
               <ExternalLink className="h-4 w-4" />
             </Link>
          </Button>
        </div>

        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/editor/${project.id}`}>
                  <Edit3 className="h-4 w-4 mr-2" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute top-2 left-2">
          <Badge variant={project.published ? "default" : "secondary"} className="backdrop-blur-md bg-opacity-80">
            {project.published ? (
              <><Globe className="h-3 w-3 mr-1" /> Published</>
            ) : (
              "Draft"
            )}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {project.description || "No description provided"}
        </p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/20 flex justify-between items-center text-[10px] text-muted-foreground">
        <span>
          Edited {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
        </span>
        <span className="flex items-center">
          <FileText className="h-3 w-3 mr-1" /> {project._count?.pages || 1} pages
        </span>
      </CardFooter>
    </Card>
  );
};
