import { 
  Plus, 
  MousePointer2, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Layout as LayoutIcon,
  Search,
  Settings2,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditorPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex h-full w-full">
      {/* Left Sidebar - Components */}
      <aside className="w-64 border-r border-[#333] bg-[#181818] flex flex-col">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-[#333] rounded-none h-12">
            <TabsTrigger value="add" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              <Plus className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="layers" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              <LayoutIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="config" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
              <Settings2 className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="m-0 p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input 
                placeholder="Search components..." 
                className="w-full bg-[#252525] border border-[#333] rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Basic</h4>
                <div className="grid grid-cols-2 gap-2">
                  <ComponentButton icon={MousePointer2} label="Section" />
                  <ComponentButton icon={Square} label="Container" />
                  <ComponentButton icon={Type} label="Heading" />
                  <ComponentButton icon={Type} label="Text" />
                  <ComponentButton icon={ButtonIcon} label="Button" />
                  <ComponentButton icon={ImageIcon} label="Image" />
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Advanced</h4>
                <div className="grid grid-cols-2 gap-2">
                  <ComponentButton icon={Database} label="Form" />
                  <ComponentButton icon={LayoutIcon} label="Grid" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </aside>

      {/* Canvas Area */}
      <main className="flex-1 bg-[#121212] overflow-auto flex items-center justify-center p-8">
        <div className="w-full max-w-5xl aspect-video bg-white rounded-sm shadow-2xl overflow-hidden relative group">
          {/* Editor Grid/Guides could go here */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none">
            <div className="text-center">
              <LayoutIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Drag components here to start building</p>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Properties */}
      <aside className="w-72 border-l border-[#333] bg-[#181818] p-4 overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Properties</h3>
        <div className="flex items-center justify-center h-40 border border-dashed border-[#333] rounded-lg">
          <p className="text-[10px] text-gray-500 text-center px-4">
            Select an element on the canvas to edit its properties
          </p>
        </div>
      </aside>
    </div>
  );
}

function ComponentButton({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-md bg-[#252525] border border-[#333] hover:border-blue-500 transition-colors group">
      <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
      <span className="text-[10px] text-gray-400 group-hover:text-white">{label}</span>
    </button>
  );
}

function ButtonIcon() {
  return <div className="h-5 w-5 border-2 border-gray-400 rounded-sm group-hover:border-blue-500 flex items-center justify-center text-[8px] font-bold">BTN</div>;
}
