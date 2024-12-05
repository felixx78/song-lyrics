import { create } from "zustand";
import Settings, { Aligment, FontSize, ShowFirst } from "../types/Settings";
import getLocalstorageItem from "../helpers/getLocalstorageItem";

const useSettingsStore = create<Settings>((set) => ({
  alignment: getLocalstorageItem<Aligment>("aligment", "left"),
  showFirst: getLocalstorageItem<ShowFirst>("showFirst", "translate"),
  fontSize: getLocalstorageItem<FontSize>("fontSize", "medium"),

  setAlignment: (alignment: Aligment) => {
    set({ alignment });
    localStorage.setItem("alignment", alignment);
  },

  setShowFirst: (showFirst: ShowFirst) => {
    set({ showFirst });
    localStorage.setItem("showFirst", showFirst);
  },

  setFontSize: (fontSize: FontSize) => {
    set({ fontSize });
    localStorage.setItem("fontSize", fontSize);
  },
}));

export default useSettingsStore;
