import { Artist, Song } from "../lib/definitons";
import { getApiUrl } from "../lib/getApiUrl";

const apiUrl = getApiUrl();

export const fetchArtist = async ({ queryKey }: any) => {
  const [_, id] = queryKey;

  const response = await fetch(`${apiUrl}/api/artists/${id}`);

  const data = await response.json();

  return data as Artist;
};

export const fetchArtistSongs = async (id: number | string, page: number) => {
  const response = await fetch(
    `${apiUrl}/api/artists/songs/${id}?page=${page || 1}`
  );

  const data = await response.json();

  return data as Song[];
};
