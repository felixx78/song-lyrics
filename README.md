# Song lyrics

Song lyrics is website for translating lyrics from Genius

## Demo

[Song Lyrics](https://song-lyrics.org)

## Tech Stack

**Client:** React, TailwindCSS, React Query, React Router, React Loading Skeleton, Typescript

**Server:** Go, Genius API

## Run Locally

Clone the project

```bash
  git clone https://github.com/felixx78/Songlyrics
```

Go to the project directory

```bash
  cd Songlyrics
```

Install dependencies and run client

```bash
  cd ./client
```

```bash
  npm install
```

```bash
  npm run dev
```

Install dependencies for server

```bash
  cd ./server
```

Create .env file

Go to [Genius API](https://genius.com/api-clients) create api key and add

```bash
  GENIUS_APIKEY=your_api_key
```

Run server

```bash
  go run main.go
```
