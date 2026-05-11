export type ElementType = 
  | "SECTION" 
  | "CONTAINER" 
  | "TEXT" 
  | "BUTTON" 
  | "IMAGE" 
  | "NAVBAR" 
  | "FOOTER" 
  | "CARD";

export interface EditorElement {
  id: string;
  type: ElementType;
  name: string;
  styles: Record<string, string>;
  props: Record<string, any>;
  children: EditorElement[];
}

export type DeviceMode = "DESKTOP" | "TABLET" | "MOBILE";

export interface EditorState {
  elements: EditorElement[];
  selectedElementId: string | null;
  deviceMode: DeviceMode;
  previewMode: boolean;
  history: {
    past: EditorElement[][];
    present: EditorElement[];
    future: EditorElement[][];
  };
}
