package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"songslyrics/types"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/mux"
)

type AlbumSong struct{
	Name string `json:"name"`
	Id int `json:"id"`
}

type AlbumSongsResponse struct{
	Title string `json:"title"`
	Artist string `json:"artist"`
	ArtistId int `json:"artist_id"`
	Cover_Art_Url string `json:"cover_art_url"`
	Url string `json:"url"`
	Songs []AlbumSong `json:"songs"`
}


func AlbumSongs(w http.ResponseWriter, r *http.Request){
  vars := mux.Vars(r)
	artistName := vars["artist_name"]
	albumName := vars["album_name"]

	url := "https://genius.com/albums/" + artistName + "/" + albumName

  resp, err := http.Get(url)
  if err != nil {
    fmt.Println(err)
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }

  doc, _ := goquery.NewDocumentFromResponse(resp) 

	var songs []AlbumSong


  doc.Find(".chart_row").Each(func(i int, s *goquery.Selection) {
		h3 := s.Find("h3")
		name := strings.Split(strings.TrimSpace(h3.Text()), "\n")[0]

		resp, err = http.Get("http://" + r.Host + "/api/songs/search?q=" + strings.ReplaceAll(name, " ", "%2B") + "%2Bby%2B" + strings.ReplaceAll(artistName, "-", "%2B"))
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

 	 	defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)

    var searchApiResponse []Hit

    json.Unmarshal(body, &searchApiResponse)

		if len(searchApiResponse) == 1 {
			songs = append(songs, AlbumSong{
				Name: name,
				Id: searchApiResponse[0].Result.ID,
			})
		} else if len(searchApiResponse) > 1 {
			for _, hit := range searchApiResponse {
				if strings.HasPrefix(name, hit.Result.Title) {
					songs = append(songs, AlbumSong{
						Name: name,
						Id: hit.Result.ID,
					})
					break
				}
			}
		}
  })

	if len(songs) == 0 {
		http.Error(w, "Not Found", http.StatusNotFound)
		return
	}

	resp, err = http.Get("http://" + r.Host + "/api/songs/" + strconv.Itoa(songs[0].Id))
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

 	defer resp.Body.Close()
    
  body, _ := io.ReadAll(resp.Body)

  var song types.Song

  json.Unmarshal(body, &song)

	response := AlbumSongsResponse{
		Title: song.Album.Name,
		Artist: song.PrimaryArtist.Name,
		ArtistId: song.PrimaryArtist.ID,
		Cover_Art_Url: song.Album.CoverArtURL,
		Url: song.Album.URL,
		Songs: songs,
	}

	responseJson, _ := json.Marshal(response)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
	_, err = w.Write(responseJson)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}


