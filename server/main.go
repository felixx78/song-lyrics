package main

import (
	"fmt"
	"net/http"
	"songslyrics/handlers"

	gorrilaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main(){
  r := mux.NewRouter()

  r = r.PathPrefix("/api").Subrouter()
  
  r.HandleFunc("/songs/languages", handlers.Languages)
  r.HandleFunc("/songs/search", handlers.Search)
  r.HandleFunc("/songs/lyrics", handlers.LyricsByUrl)
  r.HandleFunc("/songs/{id}", handlers.SongById)

  r.HandleFunc("/album/{artist_name}/{album_name}", handlers.AlbumSongs)

  r.HandleFunc("/artists/songs/{id}", handlers.ArtistSongs)
  r.HandleFunc("/artists/{id}", handlers.ArtistById)

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
