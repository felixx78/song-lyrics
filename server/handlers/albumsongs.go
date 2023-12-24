package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
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

	title := doc.Find("h1").Text()
	formatedArtistName := doc.Find("h2").Find("a").Text()

	fmt.Println(formatedArtistName)

	var songs []AlbumSong

  doc.Find(".chart_row").Each(func(i int, s *goquery.Selection) {
		h3 := s.Find("h3")
		name := strings.Split(strings.TrimSpace(h3.Text()), "\n")[0]

		resp, err = http.Get("http://" + r.Host + "/api/songs/search?q=" + strings.ReplaceAll(name, " ", "%2B" + "-") + artistName)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

 	 	defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)

    var searchApiResponse []Hit

    json.Unmarshal(body, &searchApiResponse)

		if len(searchApiResponse) != 0 {
			songs = append(songs, AlbumSong{
				Name: name,
				Id: searchApiResponse[0].Result.ID,
			})
		}
  })

	response := AlbumSongsResponse{
		Title: title,
		Artist: formatedArtistName,
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


