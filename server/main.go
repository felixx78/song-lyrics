package main

import (
	"fmt"
	"net/http"
	"songslyrics/handlers"
	"github.com/gorilla/mux"
)

func main(){
  r := mux.NewRouter()
  
  r.HandleFunc("/api/songs/languages", handlers.Languages)
  r.HandleFunc("/api/songs/search", handlers.Search)
  r.HandleFunc("/api/songs/{id}", handlers.LyricsById)

  r.HandleFunc("/api/artists/songs/{id}", handlers.ArtistSongs)
  r.HandleFunc("/api/artists/{id}", handlers.ArtistById)

  headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"https://songslyrics.vercel.app","http://localhost:5173"}
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	// Wrap your router with the CORS middleware
	corsRouter := handlers.CORS(headersOk, originsOk, methodsOk)(r)
  
  http.Handle("/", r)
  err := http.ListenAndServe(":3000", nil);
  if(err != nil){
    fmt.Println(err)
    return
  }
}
