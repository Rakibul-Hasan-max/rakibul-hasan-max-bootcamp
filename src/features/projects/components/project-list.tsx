"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProjectCard } from "./project-card";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  initialProjects: any[];
}

export const ProjectList = ({ initialProjects }: ProjectListProps) => {
  const { searchQuery, sortBy, viewMode, filterStatus } = useSelector(
    (state: RootState) => state.project
  );

  const filteredProjects = useMemo(() => {
    let result = [...initialProjects];

    // Search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "ALL") {
      result = result.filter((p) => p.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "updatedAt") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

    return result;
  }, [initialProjects, searchQuery, sortBy, filterStatus]);

  if (filteredProjects.length === 0) {
    return (
      <EmptyState 
        title={searchQuery ? "No results found" : "No projects yet"} 
        description={searchQuery ? `We couldn't find any projects matching "${searchQuery}"` : "Get started by creating your first website project."}
        showCreate={!searchQuery}
      />
    );
  }

  return (
    <div className={cn(
      "mt-6",
      viewMode === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "flex flex-col gap-4"
    )}>
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
