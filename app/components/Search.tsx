"use client";

import { useEffect, useState } from "react";
import MangifyingGlass from "../icons/MangifyingGlass";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Song from "../types/Song";
import { useRouter } from "next/navigation";
import Autocomplete from "./Autocomplete";

type Props = {
  size: "md" | "lg";
};

const getLabel = (v: Song) => {
  let result = `${v.title} - ${v.primary_artist.name}`;
  if (v.featured_artists.length) {
    result += ", " + v.featured_artists.map((i) => i.name).join(", ");
  }
  return result;
};

const handleSearch = async (q: string) => {
  const response = await axios.get(`/api/search?q=${q}`);
  return response.data as Song[];
};

function Search({ size }: Props) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["song-search", inputValue],
    queryFn: () => handleSearch(inputValue),
    enabled: inputValue.length !== 0,
  });

  const [recentViewed, setRecentViewed] = useState<Song[]>([]);

  useEffect(() => {
    const storedRecentViewed = localStorage.getItem("recent-viewed");
    if (storedRecentViewed) setRecentViewed(JSON.parse(storedRecentViewed));
  }, []);

  const handleChange = (v: Song) => {
    router.push(`/song/${v.id}`);
    setInputValue("");
  };

  const formatedData = (data?.length === 0 ? recentViewed : data || []).map(
    (i) => ({ label: getLabel(i), value: i })
  );

  return (
    <Autocomplete
      options={formatedData}
      onChange={(v) => handleChange(v)}
      inputValue={inputValue}
      onInputChange={setInputValue}
      placeholder="Search"
      icon={<MangifyingGlass />}
      disableFiltering
      isLoading={isLoading}
      className={size === "lg" ? "mx-auto max-w-[500px]" : "max-w-[350px]"}
      useAbsolute={size === "lg"}
    />
  );
}

export default Search;
