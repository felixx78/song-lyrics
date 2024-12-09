import clsx from "clsx";
import useSettingsStore from "../stores/useSettingsStore";

type Props = Partial<{
  orignal: string;
  translated: string;
}>;

const fontStyles = {
  small: [16, 13],
  medium: [18, 15],
  large: [20, 17],
};

const skeletonHeights = {
  small: [19.2, 15.6],
  medium: [21.6, 18],
  large: [24, 20.4],
};

const skeletonAlignStyles = {
  left: "",
  center: "mx-auto",
  right: "ml-auto mr-0",
};

function Lyrics({ orignal, translated }: Props) {
  const { alignment, fontSize, showFirst, mode } = useSettingsStore();

  if (!orignal || !translated) {
    return (
      <div className="px-4 max-w-[1300px] mx-auto space-y-3">
        {Array.from({ length: 15 }, (_, i) => i).map((i) => (
          <div
            className={clsx("w-1/2", skeletonAlignStyles[alignment])}
            key={i}
          >
            <div
              style={{ height: skeletonHeights[fontSize][0] }}
              className="w-full animate-pulse mb-2 bg-gray-700"
            />
            <div
              style={{ height: skeletonHeights[fontSize][1] }}
              className="w-full animate-pulse bg-gray-800"
            />
          </div>
        ))}
      </div>
    );
  }

  const originalSplit = orignal.split("\n");
  const translatedSplit = translated.split("\n");

  const first = showFirst === "translate" ? translatedSplit : originalSplit;
  const second = showFirst === "translate" ? originalSplit : translatedSplit;

  return (
    <div
      style={{ textAlign: alignment }}
      className={clsx(
        "px-4 max-w-[1300px] mx-auto",
        mode === "line" && "space-y-3"
      )}
    >
      {first.map((str, index) => (
        <div
          className={clsx(mode === "side" && "flex hover:bg-gray-800")}
          key={index}
        >
          <p
            style={{ fontSize: fontStyles[fontSize][0] }}
            className={clsx(
              mode === "line"
                ? "mb-1"
                : "w-1/2 border-r-2 pl-1 py-1 border-gray-500"
            )}
          >
            {str}
          </p>
          <p
            style={{ fontSize: fontStyles[fontSize][mode === "line" ? 1 : 0] }}
            className={clsx(mode === "line" ? "text-gray-300" : "py-1 pl-6")}
          >
            {second[index]}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Lyrics;
