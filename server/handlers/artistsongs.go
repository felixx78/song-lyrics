package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"songslyrics/types"
	"songslyrics/utils"

	"github.com/gorilla/mux"
)

type ArtistSongsApiResponse struct {
  Response struct {
    Songs []types.Song `json:"songs"`
  } `json:"response"`
}

func ArtistSongs(w http.ResponseWriter, r *http.Request) { 
  queryParams := r.URL.Query()
  
  vars := mux.Vars(r)
  artistId := vars["id"]

  page := queryParams.Get("page")
  if page == "" {
    page = "1"
  }

  apiKey, _ := utils.GetGeniusApiKey()
  url := "https://api.genius.com/artists/" + artistId + "/songs?page=" + page + "&access_token=" + apiKey

  resp, err := http.Get(url)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer resp.Body.Close()
    
  body, _ := io.ReadAll(resp.Body)

  var apiResponse ArtistSongsApiResponse 
  
  json.Unmarshal(body, &apiResponse)

  responseJSON, _ := json.Marshal(apiResponse.Response.Songs)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  if _ ,err = w.Write(responseJSON); err != nil{
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
}
