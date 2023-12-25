import { getApiUrl } from "../lib/getApiUrl";

const apiUrl = getApiUrl();

export const fetchAlbum = async ({ queryKey }: any) => {
  const [_, artistName, title] = queryKey;

  const response = await fetch(`${apiUrl}/api/album/${artistName}/${title}`);

  const data = await response.json();

  return data as {
    title: string;
    artist: string;
    artist_id: number;
    cover_art_url: string;
    url: string;
    songs: {
      name: string;
      id: number;
    }[];
  };
};
