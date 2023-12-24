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

type ArtistByIdApiResponse struct {
  Response struct {
    Artist types.Artist `json:"artist"`
  } `json:"response"`
}
func ArtistById(w http.ResponseWriter, r *http.Request) { 
  vars := mux.Vars(r)
  artistId := vars["id"]

  apiKey, _ := utils.GetGeniusApiKey()
  url := "https://api.genius.com/artists/" + artistId + "?access_token=" + apiKey

  resp, err := http.Get(url)
  if err != nil {
    fmt.Println(err)
    return
  }

  if resp.StatusCode != http.StatusOK {
    http.Error(w, "Not Found", http.StatusNotFound)
    return
  }

  defer resp.Body.Close()
    
  body, _ := io.ReadAll(resp.Body)

  var apiResponse ArtistByIdApiResponse 
  
  json.Unmarshal(body, &apiResponse)

  responseJSON, _ := json.Marshal(apiResponse.Response.Artist)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  if _ ,err = w.Write(responseJSON); err != nil{
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
}
