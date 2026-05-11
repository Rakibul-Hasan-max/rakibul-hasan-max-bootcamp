import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorElement, DeviceMode, EditorState } from "./types";
import { v4 as uuidv4 } from "uuid";

const initialState: EditorState = {
  elements: [
    {
      id: "__root",
      type: "SECTION",
      name: "Body",
      styles: {
        backgroundColor: "white",
        minHeight: "100vh",
      },
      props: {},
      children: [],
    },
  ],
  selectedElementId: null,
  deviceMode: "DESKTOP",
  previewMode: false,
  history: {
    past: [],
    present: [],
    future: [],
  },
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<{ parentId: string; element: EditorElement }>) => {
      const { parentId, element } = action.payload;
      
      const addElementToParent = (elements: EditorElement[]): boolean => {
        for (const el of elements) {
          if (el.id === parentId) {
            el.children.push(element);
            return true;
          }
          if (el.children && addElementToParent(el.children)) {
            return true;
          }
        }
        return false;
      };

      // Save to history before mutation
      state.history.past.push(JSON.parse(JSON.stringify(state.elements)));
      state.history.future = [];

      addElementToParent(state.elements);
    },

    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<EditorElement> }>) => {
      const { id, updates } = action.payload;

      const updateInList = (elements: EditorElement[]): boolean => {
        for (const el of elements) {
          if (el.id === id) {
            Object.assign(el, updates);
            return true;
          }
          if (el.children && updateInList(el.children)) {
            return true;
          }
        }
        return false;
      };

      state.history.past.push(JSON.parse(JSON.stringify(state.elements)));
      updateInList(state.elements);
    },

    deleteElement: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (id === "__root") return;

      const removeFromList = (elements: EditorElement[]): boolean => {
        const index = elements.findIndex((el) => el.id === id);
        if (index !== -1) {
          elements.splice(index, 1);
          return true;
        }
        for (const el of elements) {
          if (el.children && removeFromList(el.children)) {
            return true;
          }
        }
        return false;
      };

      state.history.past.push(JSON.parse(JSON.stringify(state.elements)));
      removeFromList(state.elements);
      if (state.selectedElementId === id) state.selectedElementId = null;
    },

    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },

    setDeviceMode: (state, action: PayloadAction<DeviceMode>) => {
      state.deviceMode = action.payload;
    },

    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.previewMode = action.payload;
    },

    setElements: (state, action: PayloadAction<EditorElement[]>) => {
      state.elements = action.payload;
      state.history.past = [];
      state.history.future = [];
    },
    undo: (state) => {
      const previous = state.history.past.pop();
      if (previous) {
        state.history.future.push(JSON.parse(JSON.stringify(state.elements)));
        state.elements = previous;
      }
    },

    redo: (state) => {
      const next = state.history.future.pop();
      if (next) {
        state.history.past.push(JSON.parse(JSON.stringify(state.elements)));
        state.elements = next;
      }
    },
  },
});

export const { 
  addElement, 
  updateElement, 
  deleteElement, 
  selectElement, 
  setDeviceMode, 
  setPreviewMode,
  setElements,
  undo,
  redo
} = editorSlice.actions;

export default editorSlice.reducer;
