export type Aligment = "left" | "center" | "right";
export type FontSize = "small" | "medium" | "large";
export type ShowFirst = "original" | "translate";
export type Mode = "side" | "line";

type Settings = {
  language: string;
  alignment: Aligment;
  showFirst: ShowFirst;
  fontSize: FontSize;
  mode: Mode;

  setLanguage: (language: string) => void;
  setAlignment: (alignment: Aligment) => void;
  setShowFirst: (showOriginalFirst: ShowFirst) => void;
  setFontSize: (fontSize: FontSize) => void;
  setMode: (mode: Mode) => void;
};

export default Settings;
