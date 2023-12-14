import Skeleton from "react-loading-skeleton";

const Lyrics = ({
  lyrics,
  translatedLyrics,
  displayMode,
  align,
  isReversed,
}: {
  lyrics: string;
  translatedLyrics: string;
  displayMode: string;
  align: string;
  isReversed: boolean;
}) => {
  const lyricsSplit = lyrics.split("\n");
  const translatedLyricsSplit = translatedLyrics.split("\n");

  const alignClass =
    align === "Left"
      ? "mx-0"
      : align === "Center"
        ? "text-center mx-auto"
        : "ml-auto mr-0 text-right";

  return (
    <div>
      <div
        className={`${alignClass} ${
          displayMode === "1" ? "max-w-[600px]" : "w-full"
        }`}
      >
        {displayMode === "1"
          ? lyricsSplit.map((line, index) => {
              return (
                <div key={line + index} className="mb-2">
                  <div className="text-lg">
                    {isReversed ? line : translatedLyricsSplit[index]}
                  </div>
                  <div className="text-base text-gray-400">
                    {isReversed ? translatedLyricsSplit[index] : line}
                  </div>
                </div>
              );
            })
          : lyricsSplit.map((line, index) => {
              return (
                <div
                  key={line + index}
                  className="flex justify-between gap-4 divide-x-2 divide-indigo-400"
                >
                  <div className="w-1/2 pb-2 text-lg">
                    {isReversed ? line : translatedLyricsSplit[index]}
                  </div>
                  <div className="w-1/2 pb-2 pl-6 text-lg">
                    {isReversed ? translatedLyricsSplit[index] : line}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Lyrics;

export const LyricsSkeleton = ({
  displayMode,
  align,
}: {
  displayMode: string;
  align: string;
}) => {
  const alignClass =
    align === "Left" ? "mx-0" : align === "Center" ? "mx-auto" : "ml-auto mr-0";
  const flexAlignClass =
    align === "Left"
      ? "justify-start"
      : align === "Center"
        ? "justify-center"
        : "justify-end";
  return (
    <div
      className={`${alignClass} ${
        displayMode === "1" ? "max-w-[500px]" : "w-full"
      }`}
    >
      {displayMode === "1" ? (
        <div>
          {Array.from({ length: 20 }, (_, i) => i).map((i) => (
            <div key={i} className="mb-1">
              <Skeleton className="mb-1" height={20} />
              <Skeleton height={14} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {Array.from({ length: 20 }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="flex justify-between gap-4 divide-x-2 divide-indigo-400"
            >
              <div className={`flex w-1/2 pb-2 ${flexAlignClass}`}>
                <div className="w-full">
                  <Skeleton width="100%" height={20} />
                </div>
              </div>

              <div className={`flex w-1/2 pb-2 pl-6 ${flexAlignClass}`}>
                <div className="w-full">
                  <Skeleton width="100%" height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
