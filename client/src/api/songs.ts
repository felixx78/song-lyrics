import { Song } from "../lib/definitons";

export const fetchLanguages = async () => {
  const response = await fetch(`/api/songs/languages`);

  const data = await response.json();

  return data as Record<string, string>;
};

export const fetchSongs = async (q: string, page: number) => {
  const response = await fetch(`/api/songs/search?q=${q}&page=${page}`);
  const data = await response.json();

  return data as {
    type: string;
    result: Song;
  }[];
};

export const fetchSong = async ({ queryKey }: any) => {
  const [_, id] = queryKey;

  const response = await fetch(`/api/songs/${id}`);

  const data = await response.json();

  return data as Song;
};

export const fetchLyrics = async ({ queryKey }: any) => {
  const [_, url] = queryKey;
  if (url === "") return;

  const language = localStorage.getItem("selectedLanguage") || "en";

  const response = await fetch(
    `/api/songs/lyrics?url=${url}&language=${language}`,
  );

  const data = await response.json();

  return data as {
    lyrics: string;
    translatedLyrics: string;
  };
};
