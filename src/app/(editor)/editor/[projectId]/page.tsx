import { EditorSidebar } from "@/features/editor/components/sidebar/editor-sidebar";
import { EditorNavbar } from "@/features/editor/components/toolbar/editor-navbar";
import { Canvas } from "@/features/editor/components/canvas/canvas";
import { StylePanel } from "@/features/editor/components/sidebar/style-panel";
import { getPageContent } from "@/features/editor/actions/editor-actions";
import { EditorProvider } from "@/features/editor/providers/editor-provider";

export default async function EditorPage({ params }: { params: { projectId: string } }) {
  const initialData = await getPageContent(params.projectId);

  return (
    <EditorProvider initialData={initialData}>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
        <EditorNavbar />
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar />
          <main className="flex-1 relative bg-muted/30 overflow-auto">
            <Canvas />
          </main>
          <StylePanel />
        </div>
      </div>
    </EditorProvider>
  );
}
