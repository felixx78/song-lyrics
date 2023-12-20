package utils

import (
  "github.com/joho/godotenv"
  "errors"
  "os"
)

func GetGeniusApiKey() (string, error){
  err := godotenv.Load(".env")
  if err != nil {
    return "", err
  }

  apiKey := os.Getenv("GENIUS_APIKEY")
  if apiKey == "" {
    return "", errors.New("GENIUS_APIKEY not found in .env")
  }

  return apiKey, nil
}
