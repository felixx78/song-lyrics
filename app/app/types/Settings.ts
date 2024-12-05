export type Aligment = "left" | "center" | "right";
export type FontSize = "small" | "medium" | "large";
export type ShowFirst = "original" | "translate";

type Settings = {
  alignment: Aligment;
  showFirst: ShowFirst;
  fontSize: FontSize;
  setAlignment: (alignment: Aligment) => void;
  setShowFirst: (showOriginalFirst: ShowFirst) => void;
  setFontSize: (fontSize: FontSize) => void;
};

export default Settings;
