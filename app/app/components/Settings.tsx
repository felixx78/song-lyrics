import useSettingsStore from "../stores/useSettingsStore";
import Select from "./Select";

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

const modeOptions = [
  {
    label: (
      <div>
        <p>translate</p>
        <p className="text-sm">original</p>
      </div>
    ),
    value: "original",
  },
  {
    label: (
      <div>
        <p>original</p>
        <p className="text-sm">translate</p>
      </div>
    ),
    value: "translate",
  },
];

function Settings() {
  const {
    alignment,
    fontSize,
    showFirst,
    setAlignment,
    setFontSize,
    setShowFirst,
  } = useSettingsStore();

  return (
    <div className="px-8 mb-4 flex justify-center gap-4">
      <Select
        value={alignment}
        onChange={setAlignment}
        label="aligment"
        options={aligmentOptions}
      />
      <Select
        value={fontSize}
        onChange={setFontSize}
        label="font size"
        options={fontSizeOptions}
      />
      <Select
        value={showFirst}
        onChange={setShowFirst}
        label="first"
        options={modeOptions}
      />
    </div>
  );
}
export default Settings;
