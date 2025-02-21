"use client";

import languages from "../helpers/languages";
import useMediaQuery from "../hooks/use-media-query";
import useSettingsStore from "../stores/useSettingsStore";
import Accordion from "./Accordion";
import Autocomplete from "./Autocomplete";
import Select from "./Select";
import { motion } from "framer-motion";

const aligmentOptions = [
  { label: <p className="text-left">left</p>, value: "left" },
  { label: <p className="text-center">center</p>, value: "center" },
  { label: <p className="text-right">right</p>, value: "right" },
];

const fontSizeOptions = [
  { label: <p className="text-sm">small</p>, value: "small" },
  { label: <p className="text-base">medium</p>, value: "medium" },
  { label: <p className="text-lg">large</p>, value: "large" },
];

const showFirstOptionsForLineMode = [
  {
    label: (
      <div>
        <p>original</p>
        <p className="text-sm">translate</p>
      </div>
    ),
    value: "original",
  },
  {
    label: (
      <div>
        <p>translate</p>
        <p className="text-sm">original</p>
      </div>
    ),
    value: "translate",
  },
];

const showFirstOptionsForSideMode = [
  {
    label: (
      <div className="flex">
        <p className="w-1/2 border-r border-gray-500">original</p>
        <p className="pl-2">translate</p>
      </div>
    ),
    value: "original",
  },
  {
    label: (
      <div className="flex">
        <p className="w-1/2 border-r border-gray-500">translate</p>
        <p className="pl-2">original</p>
      </div>
    ),
    value: "translate",
  },
];

const modeOptions = [
  {
    label: (
      <div>
        <p>line</p>
        <p className="text-sm text-gray-300">line</p>
      </div>
    ),
    value: "line",
  },
  {
    label: (
      <div className="flex">
        <p className="w-1/2 border-r border-gray-500">line</p>
        <p className="pl-2">line</p>
      </div>
    ),
    value: "side",
  },
];

function Settings() {
  const {
    language,
    alignment,
    fontSize,
    showFirst,
    mode,
    setLanguage,
    setAlignment,
    setFontSize,
    setShowFirst,
    setMode,
  } = useSettingsStore();

  const isSmScreen = useMediaQuery("(max-width: 640px)");

  return (
    <Accordion labelPosition="right" maxW="1300px" label="settings">
      <div className="px-8 pt-2 relative flex flex-wrap justify-center gap-4">
        <Autocomplete
          key="language"
          className="sm:max-w-[220px]"
          label="language"
          defalutValue={languages[language as keyof typeof languages]}
          onChange={setLanguage}
          options={Object.entries(languages).map(([code, name]) => ({
            label: name,
            value: code,
          }))}
        />
        <motion.div
          key="alignment-select"
          initial={mode === "line" ? "show" : "hide"}
          animate={mode === "line" ? "show" : "hide"}
          variants={{
            show: {
              width: isSmScreen ? "100%" : 200,
              opacity: 1,
              visibility: "visible",
              marginRight: 0,
            },
            hide: {
              width: 0,
              opacity: 0,
              visibility: "hidden",
              marginRight: -16,
            },
          }}
          transition={{ duration: 0.3 }}
        >
          <Select
            value={alignment}
            onChange={setAlignment}
            label="aligment"
            options={aligmentOptions}
          />
        </motion.div>
        <Select
          key="mode"
          className="hidden sm:block sm:w-auto"
          value={mode}
          onChange={setMode}
          label="mode"
          options={modeOptions}
        />
        <Select
          key="font-size"
          className="w-full sm:w-auto"
          value={fontSize}
          onChange={setFontSize}
          label="font size"
          options={fontSizeOptions}
        />
        <Select
          key="first"
          className="w-full sm:w-auto"
          value={showFirst}
          onChange={setShowFirst}
          label="first"
          options={
            mode === "line"
              ? showFirstOptionsForLineMode
              : showFirstOptionsForSideMode
          }
        />
      </div>
    </Accordion>
  );
}
export default Settings;
