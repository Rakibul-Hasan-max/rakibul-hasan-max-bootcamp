"use client";

import { FolderPlus, Search } from "lucide-react";
import { CreateProjectModal } from "./create-project-modal";

interface EmptyStateProps {
  title: string;
  description: string;
  showCreate?: boolean;
}

export const EmptyState = ({ title, description, showCreate }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
        {showCreate ? (
          <FolderPlus className="h-10 w-10 text-primary/40" />
        ) : (
          <Search className="h-10 w-10 text-primary/40" />
        )}
      </div>
      <h3 className="text-xl font-bold font-outfit">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">
        {description}
      </p>
      {showCreate && (
        <div className="mt-8">
          <CreateProjectModal />
        </div>
      )}
    </div>
  );
};
