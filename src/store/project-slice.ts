import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  searchQuery: string;
  sortBy: "updatedAt" | "name" | "createdAt";
  viewMode: "grid" | "list";
  filterStatus: "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

const initialState: ProjectState = {
  searchQuery: "",
  sortBy: "updatedAt",
  viewMode: "grid",
  filterStatus: "ALL",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ProjectState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ProjectState["viewMode"]>) => {
      state.viewMode = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<ProjectState["filterStatus"]>) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { setSearchQuery, setSortBy, setViewMode, setFilterStatus } = projectSlice.actions;
export default projectSlice.reducer;
