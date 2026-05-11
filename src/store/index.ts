import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "@/features/editor/editorSlice";
import projectReducer from "./project-slice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
