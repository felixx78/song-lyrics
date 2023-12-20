import { useEffect, useRef, useState } from "react";

const SelectDisplayMode = ({
  onChange,
}: {
  onChange: (displayMode: string) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const refButton = useRef<HTMLButtonElement>(null);

  const handleOnClick = (e: MouseEvent) => {
    if (refButton.current && !refButton.current.contains(e.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOnClick);

    return () => window.removeEventListener("click", handleOnClick);
  }, []);

  const changeDisplayMode = (mode: string) => {
    onChange(mode);
    localStorage.setItem("displayMode", mode);
  };

  return (
    <div className="relative">
      <button
        ref={refButton}
        onClick={() => setIsOpened(!isOpened)}
        className="rounded-md bg-indigo-500 px-8 py-1 active:bg-indigo-600"
      >
        Display
      </button>
      {isOpened && (
        <div className="absolute z-20 left-0 top-[105%] w-full divide-y-2 divide-indigo-400 rounded bg-indigo-500">
          <button
            onClick={() => changeDisplayMode("1")}
            className="w-full pb-2 pt-3"
          >
            <div className="px-2">
              <span className="mb-1 block h-1 bg-gray-400"></span>
              <span className="block h-1 bg-gray-400"></span>
            </div>
          </button>

          <button
            onClick={() => changeDisplayMode("2")}
            className="w-full pb-2 pt-3"
          >
            <div className="flex justify-between gap-2 px-2">
              <span className="mb-1 block h-1 w-1/2 bg-gray-400"></span>
              <span className="block h-1 w-1/2 bg-gray-400"></span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectDisplayMode;
