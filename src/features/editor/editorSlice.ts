import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  elements: any[];
  selectedElementId: string | null;
  history: any[];
  currentIndex: number;
}

const initialState: EditorState = {
  elements: [],
  selectedElementId: null,
  history: [],
  currentIndex: -1,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<any[]>) => {
      state.elements = action.payload;
    },
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },
    // More actions will be added when implementing the drag-and-drop logic
  },
});

export const { setElements, selectElement } = editorSlice.actions;
export default editorSlice.reducer;
