import { Song } from "../lib/definitons";

export const fetchLanguages = async () => {
  const response = await fetch("/api/songs/languages");

  const data = await response.json();

  return data as Record<string, string>;
};

export const fetchSongs = async (q: string, page: number) => {
  const response = await fetch(
    `/api/songs/search?q=${q}&page=${page}`,
  );
  const data = await response.json();

  return data as {
    type: string;
    result: Song;
  }[];
};

export const fetchSong = async ({ queryKey }: any) => {
  const [_, id] = queryKey;
  const language = localStorage.getItem("selectedLanguage") || "en";

  const response = await fetch(
    `/api/songs/${id}?language=${language}`,
  );

  const data = await response.json();

  return data as {
    song: Song;
    lyrics: string;
    translatedLyrics: string;
    originalLanguage: string;
  };
};
