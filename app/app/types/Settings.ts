export type Aligment = "left" | "center" | "right";
export type FontSize = "small" | "medium" | "large";

type Settings = {
  alignment: Aligment;
  showOriginalFirst: boolean;
  fontSize: FontSize;
  setAlignment: (alignment: Aligment) => void;
  setShowOriginalFirst: (showOriginalFirst: boolean) => void;
  setFontSize: (fontSize: FontSize) => void;
};

export default Settings;
