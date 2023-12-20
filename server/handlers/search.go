package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"songslyrics/types"
	"songslyrics/utils"
	"strings"
)

type Hit struct {
  Type string `json:"type"`
  Result types.Song `json:"result"`
}

type SearchApiResponse struct {
  Response struct {
    Hits []Hit `json:"hits"`
  }`json:"response"`
}

func Search(w http.ResponseWriter, r *http.Request) { 
  queryParams := r.URL.Query()

  page := queryParams.Get("page")
  if page == "" {
    page = "1"
  }

  query := queryParams.Get("q")

  if query == "" {
    w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, `{"message": "No query provided"}`)
		return
  }
  
  query = strings.ReplaceAll(query, " ", "%2B")

  apiKey, _ := utils.GetGeniusApiKey()
  apiUrl := "https://api.genius.com/search?page=" + page + "&q=" + query + "&access_token=" + apiKey

  resp, err := http.Get(apiUrl)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer resp.Body.Close()
    
  body, _ := io.ReadAll(resp.Body)

  var apiResponse SearchApiResponse
  
  json.Unmarshal(body, &apiResponse)

  responseJSON, _ := json.Marshal(apiResponse.Response.Hits)

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  if _ ,err = w.Write(responseJSON); err != nil{
    http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    return
  }
}
