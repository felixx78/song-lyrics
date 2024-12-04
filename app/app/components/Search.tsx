"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import MangifyingGlass from "../icons/MangifyingGlass";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Song from "../types/Song";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Props = {
  size: "md" | "lg";
};

function Search({ size }: Props) {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  const [text, setText] = useState("");
  const [value, setValue] = useDebounce(text, 50);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [recentViewed, setRecentViewed] = useState<Song[]>([]);

  useEffect(() => {
    const storedRecentViewed = localStorage.getItem("recent-viewed");
    if (storedRecentViewed) setRecentViewed(JSON.parse(storedRecentViewed));
  }, []);

  const { data } = useQuery({
    queryKey: ["search", value],
    queryFn: () =>
      axios.get(`/api/search?q=${value}`).then((r) => r.data as Song[]),
    enabled: !!value,
  });

  const dataToDisplay = value === "" ? recentViewed : data;

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
      setHighlightedIndex(null);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setHighlightedIndex(null);
  };

  const handleLinkClick = (e?: MouseEvent<HTMLAnchorElement>) => {
    setTimeout(() => {
      setText("");
      setValue("");
      setHighlightedIndex(null);
      setIsOpen(false);
    }, 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!dataToDisplay) return;

    if (e.code === "Enter" && highlightedIndex !== null) {
      router.push(`/song/${dataToDisplay[highlightedIndex].id}`);
      handleLinkClick();
    } else if (e.code === "ArrowDown") {
      if (
        highlightedIndex === null ||
        highlightedIndex + 1 === dataToDisplay.length
      ) {
        setHighlightedIndex(0);
      } else setHighlightedIndex(highlightedIndex + 1);
    } else if (e.code === "ArrowUp") {
      if (highlightedIndex === null || highlightedIndex - 1 === -1) {
        setHighlightedIndex(dataToDisplay.length - 1);
      } else setHighlightedIndex(highlightedIndex - 1);
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "relative",
        size === "lg" ? "mx-auto max-w-[500px]" : "max-w-[350px]"
      )}
    >
      <div className="relative">
        <input
          value={text}
          onChange={handleChange}
          className="bg-black border placeholder-gray-400 border-gray-600 text-gray-200 pl-3 pr-9 py-1.5 rounded-md w-full"
          spellCheck={false}
          placeholder="search"
          type="text"
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
        />
        <MangifyingGlass className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
      </div>

      {isOpen && !!dataToDisplay?.length && (
        <div className="bg-black border absolute w-full divide-y divide-gray-600 rounded-md border-gray-600 top-[120%]">
          {dataToDisplay.map((i, index) => (
            <Link
              href={`/song/${i.id}`}
              onClick={handleLinkClick}
              className={clsx(
                "px-2 py-1.5 block w-full hover:bg-gray-600 truncate text-left",
                highlightedIndex === index && "bg-gray-600"
              )}
              key={i.id}
            >
              {i.title} - {i.artist_names}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
