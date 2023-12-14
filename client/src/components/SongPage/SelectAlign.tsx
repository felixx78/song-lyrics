import { useEffect, useRef, useState } from "react";

const SelectAlign = ({ onChange }: { onChange: (align: string) => void }) => {
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

  const changeAlign = (align: string) => {
    onChange(align);
    localStorage.setItem("align", align);
  };

  return (
    <div className="relative">
      <button
        ref={refButton}
        onClick={() => setIsOpened(!isOpened)}
        className="rounded-md bg-indigo-500 px-8 py-1"
      >
        Align
      </button>
      {isOpened && (
        <div className="absolute z-20 left-0 top-[105%] w-full divide-y-2 divide-indigo-400 rounded bg-indigo-500">
          {["Left", "Center", "Right"].map((i) => (
            <button
              onClick={() => changeAlign(i)}
              className="flex w-full items-center justify-between  px-1 py-2 "
              key={i}
            >
              {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectAlign;
