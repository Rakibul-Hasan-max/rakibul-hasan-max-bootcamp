"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setElements } from "../editorSlice";

interface EditorProviderProps {
  initialData: any;
  children: React.ReactNode;
}

export const EditorProvider = ({ initialData, children }: EditorProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      dispatch(setElements(initialData));
    }
  }, [initialData, dispatch]);

  return <>{children}</>;
};
