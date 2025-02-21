"use client";

import { useEffect, useState } from "react";
import MangifyingGlass from "../icons/MangifyingGlass";
import { useQuery } from "@tanstack/react-query";
import Song from "../types/Song";
import Autocomplete from "./Autocomplete";
import apiClient from "../helpers/apiClient";
import { clsx } from "clsx";

type Props = {
  size: "md" | "lg";
  center?: boolean;
};

const getLabel = (v: Song) => {
  let result = `${v.title} - ${v.primary_artist.name}`;
  if (v.featured_artists.length) {
    result += ", " + v.featured_artists.map((i) => i.name).join(", ");
  }
  return result;
};

const handleSearch = async (q: string) => {
  const response = await apiClient(`/api/search?q=${q}`);
  return response.data as Song[];
};

function Search({ size, center }: Props) {
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
    open(`/song/${v.id}`, "_self");
    setInputValue("");
  };

  const formatedData = (!data?.length ? recentViewed : data || []).map((i) => ({
    label: getLabel(i),
    value: i,
  }));

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
      className={clsx(
        size === "lg" ? "max-w-[500px]" : "max-w-[350px]",
        center && "mx-auto"
      )}
    />
  );
}

export default Search;
