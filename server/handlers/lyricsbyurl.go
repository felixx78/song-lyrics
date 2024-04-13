package handlers

import (
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"regexp"
	"strings"

	cloudflarebp "github.com/DaRealFreak/cloudflare-bp-go"
	"github.com/PuerkitoBio/goquery"
	"github.com/bregydoc/gtranslate"
)

type LyricsByUrlResponse struct{
  Lyrics string `json:"lyrics"`
  TranslatedLyrics string `json:"translatedLyrics"`
}

func LyricsByUrl(w http.ResponseWriter, r *http.Request){
  queryParams := r.URL.Query()

  toLanguage := queryParams.Get("language")
  url := queryParams.Get("url")

  // getting lyrics
  client := &http.Client{}
  client.Transport = cloudflarebp.AddCloudFlareByPass(client.Transport)

  resp, err := client.Get(url)
  if err != nil {
    fmt.Println(err)
    http.Error(w, "Error fetching url", http.StatusBadRequest)
    return
  }
  defer resp.Body.Close()

  doc, err := goquery.NewDocumentFromReader(resp.Body) 
  if err != nil {
    fmt.Println(err)
    http.Error(w, "Failed reading html from url", http.StatusBadRequest)
    return
  }

  var preloadedState string
  doc.Find("script").Each(func(i int, s *goquery.Selection) {
    if strings.Contains(s.Text(), "window.__PRELOADED_STATE__") {
      preloadedState = strings.TrimPrefix(s.Text(), "window.__PRELOADED_STATE__ = ")
    }
  })

  preloadedState = strings.ReplaceAll(preloadedState, `\"`, `"`)

  re := regexp.MustCompile(`"html":"(.+?)",`)
  matches := re.FindStringSubmatch(preloadedState)

  re = regexp.MustCompile(`<\/?[^>]+>`)
  lyrics := re.ReplaceAllString(matches[1], "")

  lyrics = html.UnescapeString(lyrics)

  lyrics = strings.ReplaceAll(lyrics, "\\\\n", "\n")

  lyrics = strings.ReplaceAll(lyrics, `\\"`, `"`)
  lyrics = strings.ReplaceAll(lyrics, `\'`, "`")

  // translating lyrics

  if toLanguage == ""{
    toLanguage = "en"
  }

  translatedLyrics, err := gtranslate.TranslateWithParams(lyrics, gtranslate.TranslationParams{From: "auto", To: toLanguage})
  if err != nil{
    fmt.Println(err)
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }

  response := LyricsByUrlResponse{
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
