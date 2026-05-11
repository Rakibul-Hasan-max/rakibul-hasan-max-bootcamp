"use client";

import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchQuery, setSortBy, setViewMode } from "@/store/project-slice";

export const ProjectFilters = () => {
  const dispatch = useDispatch();
  const { searchQuery, sortBy, viewMode } = useSelector((state: RootState) => state.project);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 py-4 px-1">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search projects..." 
          className="pl-10 bg-background/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto ml-auto">
        <div className="flex items-center gap-1 border rounded-md p-1 bg-background/50 backdrop-blur-sm">
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => dispatch(setViewMode("grid"))}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => dispatch(setViewMode("list"))}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Select 
          value={sortBy} 
          onValueChange={(value: any) => dispatch(setSortBy(value))}
        >
          <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updatedAt">Last Updated</SelectItem>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="name">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
