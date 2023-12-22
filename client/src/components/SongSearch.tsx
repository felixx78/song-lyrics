import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../api/songs";

function SongSearch({ py }: { py?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: hints } = useQuery({
    queryKey: ["hints", query],
    queryFn: () => (query !== "" ? fetchSongs(query, 1) : []),
  });
  const [selectedHint, setSelectedHint] = useState<number>(-1);

  const search = (str: string) => {
    setQuery("");
    if (str === "") return;

    return navigate(`/search?q=${str.trim().replace(/ /g, "+")}`);
  };

  const handleOnSearch = () => {
    search(query);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedHint === -1) search(query);
      else if (hints)
        search(
          hints[selectedHint].result.title +
            " by " +
            hints[selectedHint].result.primary_artist.name,
        );
    } else if (e.key === "ArrowDown") {
      if (hints && selectedHint === hints?.length - 1) return;
      setSelectedHint(selectedHint !== -1 ? selectedHint + 1 : 0);
    } else if (e.key === "ArrowUp") {
      if (hints && selectedHint === 0) return;
      setSelectedHint(selectedHint !== -1 ? selectedHint - 1 : -1);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-[600px] font-semibold">
      <input
        value={query}
        onChange={handleOnChange}
        className={`w-full rounded-xl py-${
          py || "1"
        } pl-4 pr-11 font-medium text-black focus:outline-none`}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Search for a song"
      />
      <button
        onClick={handleOnSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform px-1 text-[#35335C]"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {hints && (
        <div className="absolute left-0 top-full mt-[5px] max-h-[200px] w-full overflow-y-scroll bg-white text-black md:max-h-[300px] lg:max-h-none lg:overflow-hidden">
          {hints.map((song, i) => (
            <button
              className={`block w-full truncate py-1 pl-2 text-left hover:bg-gray-300 ${
                i === selectedHint && "bg-gray-300"
              }`}
              key={song.result.id}
              onClick={() => {
                search(
                  song.result.title + " by " + song.result.primary_artist.name,
                );
              }}
            >
              {song.result.title + " by " + song.result.primary_artist.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SongSearch;
