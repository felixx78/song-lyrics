import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SongSearch({ py }: { py?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const search = () => {
    setQuery("");
    return navigate(`/search?q=${query.replace(/ /g, "+")}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="relative w-full max-w-[600px]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full rounded-xl py-${
          py || "1"
        } pl-4 pr-11 font-medium text-black focus:outline-none`}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Search for a song"
      />
      <button
        onClick={search}
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
    </div>
  );
}

export default SongSearch;
