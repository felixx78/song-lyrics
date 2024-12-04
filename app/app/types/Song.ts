import Artist from "./Artist";

type Song = {
  id: number;
  title: string;
  artist_names: string;
  primary_artist: Artist;
  featured_artists: Artist[];
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  album: string;
};

export default Song;
