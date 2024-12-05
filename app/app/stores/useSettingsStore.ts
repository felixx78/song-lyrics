import { create } from "zustand";
import Settings, { Aligment, FontSize } from "../types/Settings";

const useSettingsStore = create<Settings>((set) => ({
  alignment: (localStorage.getItem("aligment") || "left") as Aligment,
  showOriginalFirst: JSON.parse(
    localStorage.getItem("showOriginalFirst") || "true"
  ),
  fontSize: (localStorage.getItem("fontSize") || "medium") as FontSize,

  setAlignment: (alignment: Aligment) => {
    set({ alignment });
    localStorage.setItem("alignment", alignment);
  },

  setShowOriginalFirst: (showOriginalFirst: boolean) => {
    set({ showOriginalFirst });
    localStorage.setItem("showOriginalFirst", showOriginalFirst.toString());
  },

  setFontSize: (fontSize: FontSize) => {
    set({ fontSize });
    localStorage.setItem("fontSize", fontSize);
  },
}));

export default useSettingsStore;
