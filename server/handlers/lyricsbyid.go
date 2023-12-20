package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"songslyrics/types"
	"songslyrics/utils"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/bregydoc/gtranslate"
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

type LyricsByIdResponse struct{
  Song types.Song `json:"song"`
  Lyrics string `json:"lyrics"`
  TranslatedLyrics string `json:"translatedLyrics"`
}

func LyricsById(w http.ResponseWriter, r *http.Request){
  queryParams := r.URL.Query()

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
  defer resp.Body.Close()

  var song GeniusResponse

  bytesBody, _ := io.ReadAll(resp.Body)

  if err := json.Unmarshal(bytesBody, &song); err != nil {
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }

  // getting lyrics

  resp, err = http.Get(song.Response.Song.URL)
  if err != nil {
    fmt.Println(err)
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
  defer resp.Body.Close()

  doc, _ := goquery.NewDocumentFromResponse(resp) 

  preloadedState := ""
  doc.Find("script").Each(func(i int, s *goquery.Selection) {
    if strings.Contains(s.Text(), "window.__PRELOADED_STATE__") {
      preloadedState = strings.TrimPrefix(s.Text(), "window.__PRELOADED_STATE__ = ")
    }
  })

  preloadedState = strings.ReplaceAll(preloadedState, `\\"`, `"`)

  re := regexp.MustCompile(`"html":"(.+?)",`)
  matches := re.FindStringSubmatch(strings.ReplaceAll(preloadedState, `\"`, `"`))

  re = regexp.MustCompile(`<\/?[^>]+>`)
  lyrics := re.ReplaceAllString(matches[1], "")

  lyrics = strings.ReplaceAll(lyrics, "\\\\n", "\n")

  // translating lyrics
  toLanguage := queryParams.Get("language")

  if toLanguage == ""{
    toLanguage = "en"
  }

  translatedLyrics, err := gtranslate.TranslateWithParams(lyrics, gtranslate.TranslationParams{From: "auto", To: toLanguage})
  if err != nil{
    fmt.Println(err)
  }

  response := LyricsByIdResponse{
    Song: song.Response.Song,
    Lyrics: lyrics,
    TranslatedLyrics: translatedLyrics,
  }

  responseJson, _ := json.Marshal(response)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  if _ ,err = w.Write(responseJson); err != nil{
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
}
