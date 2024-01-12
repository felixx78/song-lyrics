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
        className="rounded-md border-2 border-indigo-500 px-8 py-1"
      >
        Align
      </button>
      <div
        className={`${
          isOpened ? "top-[110%]" : "invisible top-3/4 opacity-0"
        } absolute left-0 z-20 w-full divide-y-2 divide-indigo-500 rounded border-2 border-indigo-500 bg-[#35335C] transition-all`}
      >
        {["Left", "Center", "Right"].map((i) => (
          <button
            onClick={() => changeAlign(i)}
            className="flex w-full items-center justify-between px-2 py-2 hover:bg-indigo-700 "
            key={i}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectAlign;
