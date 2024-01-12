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
        className="rounded-md border-2 border-indigo-500 px-8 py-1"
      >
        Display
      </button>
      <div
        className={`${
          isOpened ? "top-[110%]" : "invisible top-3/4 opacity-0"
        } absolute left-0 z-20 w-full divide-y-2 divide-indigo-500 rounded border-2 border-indigo-500 bg-indigo-600 transition-all duration-300`}
      >
        <button
          onClick={() => changeDisplayMode("1")}
          className="w-full pb-3 pt-3 hover:bg-indigo-700"
        >
          <div className="px-2">
            <span className="mb-1 block h-1 bg-gray-400"></span>
            <span className="block h-1 bg-gray-400"></span>
          </div>
        </button>

        <button
          onClick={() => changeDisplayMode("2")}
          className="w-full pb-2 pt-4 hover:bg-indigo-700"
        >
          <div className="flex justify-between gap-2 px-2">
            <span className="mb-1 block h-1 w-1/2 bg-gray-400"></span>
            <span className="block h-1 w-1/2 bg-gray-400"></span>
          </div>
        </button>

        <button
          onClick={() => changeDisplayMode("3")}
          className="w-full px-2 pb-3 pt-4 hover:bg-indigo-700"
        >
          <span className="block h-1 bg-gray-400"></span>
        </button>
      </div>
    </div>
  );
};

export default SelectDisplayMode;
