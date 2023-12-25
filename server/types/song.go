package types

/* export type Song = {
  id: number;
  title: string;
  url: string;
  primary_artist: {
    id: number;
    name: string;
  };
  featured_artists: {
    id: number;
    name:
  }[];
  release_date_for_display: string;
  header_image_thumbnail_url: string;
  album?: {
    id: number;
    name: string;
    cover_art_url: string;
  };
};

*/

type PrimaryArtist struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type FeaturedArtist struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Album struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	CoverArtURL  string `json:"cover_art_url"`
  URL          string `json:"url"`
}

type Song struct {
	ID                      int             `json:"id"`
	Title                   string          `json:"title"`
	URL                     string          `json:"url"`
	PrimaryArtist           PrimaryArtist   `json:"primary_artist"`
	FeaturedArtists         []FeaturedArtist `json:"featured_artists"`
	ReleaseDateForDisplay   string          `json:"release_date_for_display"`
	SongArtThumbnailURL string          `json:"song_art_image_thumbnail_url"`
	Album                   *Album          `json:"album,omitempty"`
}
