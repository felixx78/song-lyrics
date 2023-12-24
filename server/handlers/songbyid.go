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

type GeniusResponse struct {
  Meta struct {
    Status int `json:"status"`
  } `json:"meta"`
  Response struct { 
    Song types.Song `json:"song"`
  } `json:"response"`
}

func SongById(w http.ResponseWriter, r *http.Request){
  vars := mux.Vars(r)
  songId := vars["id"]

  apiKey, _ := utils.GetGeniusApiKey()

  // getting song object from genius api

  apiurl := "https://api.genius.com/songs/" + songId + "?access_token=" + apiKey

  resp, err := http.Get(apiurl)
  if err != nil {
    fmt.Println(err)
    return
  }

  if resp.StatusCode != http.StatusOK {
    http.Error(w, "Not Found", http.StatusNotFound)
    return
  }

  defer resp.Body.Close()

  var song GeniusResponse

  bytesBody, _ := io.ReadAll(resp.Body)

  if err := json.Unmarshal(bytesBody, &song); err != nil {
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
  
	responseJson, _ := json.Marshal(song.Response.Song)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  if _ ,err = w.Write(responseJson); err != nil{
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }

}