package main

import (
	"fmt"
	"net/http"
	"songslyrics/handlers"
	"github.com/gorilla/mux"
  gorrilaHandlers "github.com/gorilla/handlers"
)

func main(){
  r := mux.NewRouter()
  
  r.HandleFunc("/api/songs/languages", handlers.Languages)
  r.HandleFunc("/api/songs/search", handlers.Search)
  r.HandleFunc("/api/songs/{id}", handlers.LyricsById)

  r.HandleFunc("/api/artists/songs/{id}", handlers.ArtistSongs)
  r.HandleFunc("/api/artists/{id}", handlers.ArtistById)

  headersOk := gorrilaHandlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
  originsOk := gorrilaHandlers.AllowedOrigins([]string{"https://songslyrics.vercel.app", "http://localhost:5173"})
	methodsOk := gorrilaHandlers.AllowedMethods([]string{"GET"})

	corsRouter := gorrilaHandlers.CORS(headersOk, originsOk, methodsOk)(r)
  
  http.Handle("/", corsRouter)
  err := http.ListenAndServe(":3000", nil);
  if(err != nil){
    fmt.Println(err)
    return
  }
}
