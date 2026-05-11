import { EditorSidebar } from "@/features/editor/components/sidebar/editor-sidebar";
import { EditorNavbar } from "@/features/editor/components/toolbar/editor-navbar";
import { Canvas } from "@/features/editor/components/canvas/canvas";
import { StylePanel } from "@/features/editor/components/sidebar/style-panel";
import { getPageContent } from "@/features/editor/actions/editor-actions";
import { EditorProvider } from "@/features/editor/providers/editor-provider";
import { EditorShell } from "@/features/editor/components/editor-shell";

export default async function EditorPage({ params }: { params: { projectId: string } }) {
  const initialData = await getPageContent(params.projectId);

  return (
    <EditorProvider initialData={initialData}>
      <EditorShell>
        <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-primary/30">
          <EditorNavbar />
          <div className="flex flex-1 overflow-hidden">
            <EditorSidebar />
            <main className="flex-1 relative bg-[#111111] overflow-auto scrollbar-hide">
              {/* Grid Background */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
              <Canvas />
            </main>
            <StylePanel />
          </div>
        </div>
      </EditorShell>
    </EditorProvider>
  );
}
