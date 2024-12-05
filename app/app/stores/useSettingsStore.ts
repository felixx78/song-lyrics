import { create } from "zustand";
import Settings, { Aligment, FontSize } from "../types/Settings";
import getLocalstorageItem from "../helpers/getLocalstorageItem";

const useSettingsStore = create<Settings>((set) => ({
  alignment: getLocalstorageItem<Aligment>("aligment", "left"),
  showOriginalFirst: getLocalstorageItem("showOriginalFirst", true),
  fontSize: getLocalstorageItem<FontSize>("fontSize", "medium"),

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
