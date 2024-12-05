"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import { clsx } from "clsx";

type Props = {
  label: string;
  value: any;
  onChange: (v: any) => void;
  options: Array<{ label: React.ReactNode | string; value: any }>;
};

function Select({ label, value, onChange, options }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState(
    options.find((i) => i.value === value)!
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref]);

  const handleChange = (i: (typeof options)[0]) => {
    onChange(i);
    setSelected(i);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        ref={ref}
        className="relative min-w-[200px] block w-full"
      >
        <div className="bg-black border text-left placeholder-gray-400 border-gray-600 text-gray-200 pl-3 pr-9 py-1.5 rounded-md w-full">
          {selected.value}
        </div>
        <div className="absolute -top-2.5 left-2">
          <div className="relative">
            <p className="relative text-sm z-[1] text-center px-1 text-gray-300">
              {label}
            </p>
            <div className="bg-black top-2.5 left-0 w-full h-1 absolute" />
          </div>
        </div>

        <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
          <ChevronDown />
        </div>
      </button>

      <div
        className={clsx(
          "bg-black border absolute w-full divide-y divide-gray-600 rounded-md border-gray-600 top-[120%]",
          !isOpen && "hidden"
        )}
      >
        {options.map((i, index) => (
          <button
            key={index}
            onClick={() => handleChange(i)}
            className={clsx(
              "px-2 block w-full text-left py-1.5",
              i.value === selected.value ? "bg-gray-900" : "hover:bg-gray-600"
            )}
          >
            {i.label}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Select;
