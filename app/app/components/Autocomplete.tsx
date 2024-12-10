"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import ChevronDown from "../icons/ChevronDown";
import { createPortal } from "react-dom";

type Props<T> = {
  defalutValue?: string;
  onChange: (v: T) => void;
  onInputChange?: (v: string) => void;
  options: Array<{ label: string; value: T }>;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  disableFiltering?: boolean;
  inputValue?: string;
  isLoading?: boolean;
  className?: string;
};

function Autocomplete<T>({
  options,
  defalutValue,
  onChange,
  onInputChange,
  icon,
  placeholder,
  label,
  disableFiltering,
  inputValue,
  isLoading,
  className,
}: Props<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState(defalutValue || "");
  const [value, setValue] = useState(defalutValue || "");

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showFiltered, setShowFiltered] = useState(false);

  const filteredOptions = useMemo(() => {
    return disableFiltering
      ? options
      : options.filter((i) =>
          i.label.toLowerCase().startsWith(value.toLocaleLowerCase())
        );
  }, [value, options, disableFiltering]);

  const dataToDisplay = showFiltered ? filteredOptions : options;

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
      setValue(selected);
      setShowFiltered(false);
      setHighlightedIndex(null);
    };

    const handleScroll = () => {
      setIsOpen(false);
      inputRef.current?.blur();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [ref, selected]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowFiltered(true);
    setValue(e.target.value);
    onInputChange && onInputChange(e.target.value);
    setHighlightedIndex(null);
  };

  const handleButtonClick = (v: { label: string; value: T }) => {
    setSelected(v.label);
    setValue(v.label);
    onChange(v.value);
    setHighlightedIndex(null);
    setShowFiltered(false);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!dataToDisplay) return;

    switch (e.code) {
      case "Enter":
        if (highlightedIndex === null) return;
        handleButtonClick(dataToDisplay[highlightedIndex]);
        inputRef.current?.blur();
        break;
      case "ArrowDown":
        if (
          highlightedIndex === null ||
          highlightedIndex + 1 === dataToDisplay.length
        ) {
          setHighlightedIndex(0);
        } else setHighlightedIndex(highlightedIndex + 1);
        break;
      case "ArrowUp":
        if (highlightedIndex === null || highlightedIndex - 1 === -1) {
          setHighlightedIndex(dataToDisplay.length - 1);
        } else setHighlightedIndex(highlightedIndex - 1);
        break;
    }
  };

  const inputRect =
    inputRef.current && inputRef.current.getBoundingClientRect();

  return (
    <div ref={ref} className={clsx("relative w-full", className)}>
      <div className="relative">
        <input
          value={inputValue ?? value}
          onChange={handleChange}
          ref={inputRef}
          className="bg-black border placeholder-gray-400 border-gray-600 text-gray-200 pl-3 pr-9 py-1.5 rounded-md w-full"
          spellCheck={false}
          placeholder={placeholder}
          type="text"
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
          {icon ? icon : <ChevronDown />}
        </div>
        {label && (
          <div className="absolute -top-2.5 left-2">
            <div className="relative">
              <p className="relative text-sm z-[1] text-center px-1 text-gray-300">
                {label}
              </p>
              <div className="bg-black top-2.5 left-0 w-full h-1 absolute" />
            </div>
          </div>
        )}
      </div>
      {createPortal(
        inputRect && (
          <div
            style={{
              left: inputRect.left,
              top: inputRect.top + inputRect.height + 5,
              width: inputRect.width,
            }}
            className={clsx(
              "bg-black fixed transition-opacity thin-scroll max-h-[375px] overflow-y-auto border w-full divide-y divide-gray-600 rounded-md border-gray-600",
              !(isOpen && (dataToDisplay.length || isLoading)) &&
                "opacity-0 invisible"
            )}
          >
            {!isLoading &&
              dataToDisplay.map((i, index) => (
                <button
                  onClick={() => handleButtonClick(i)}
                  className={clsx(
                    "px-2 py-1.5 block w-full hover:bg-gray-600 truncate text-left",
                    highlightedIndex === index && "bg-gray-600"
                  )}
                  key={i.label + "-" + index}
                >
                  {i.label}
                </button>
              ))}
            {isLoading && (
              <p className="py-1.5 px-2 text-gray-400 select-none">
                Loading...
              </p>
            )}
          </div>
        ),
        document.body
      )}
    </div>
  );
}
export default Autocomplete;
