"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-background rounded-xl border border-dashed border-destructive/30">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold font-outfit mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        {error.message.includes("database") || error.message.includes("prisma")
          ? "We couldn't connect to the database. Please ensure your database server is running and try again."
          : "An unexpected error occurred while loading your projects."}
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh Page
        </Button>
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
