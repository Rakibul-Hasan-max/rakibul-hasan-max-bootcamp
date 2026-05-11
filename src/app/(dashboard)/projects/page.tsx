import { Suspense } from "react";
import { getProjects } from "@/features/projects/actions/project-actions";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { ProjectList } from "@/features/projects/components/project-list";
import { ProjectFilters } from "@/features/projects/components/project-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return (
    <div className="flex flex-col gap-y-8 max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit">My Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your websites and start building new ones.
          </p>
        </div>
        <CreateProjectModal />
      </div>

      <ProjectFilters />

      <Suspense fallback={<ProjectGridSkeleton />}>
        <ProjectList initialProjects={initialProjects} />
      </Suspense>
    </div>
  );
}

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-0 overflow-hidden shadow-sm h-[280px]">
          <Skeleton className="aspect-video w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
