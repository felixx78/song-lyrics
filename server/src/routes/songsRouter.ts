import { Request, Response, Router } from "express";
//@ts-ignore
import { getLyrics } from "genius-lyrics-api";
import { getLanguageByCode, getLanguages } from "../lib/languages";
import { HttpProxyAgent } from "http-proxy-agent";
import { translate } from "@vitalets/google-translate-api";

const songRouter = Router()
  .get("/search", async (req: Request, res: Response) => {
    const page = req.query.page || 1;
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "No query provided" });
    }

    const geniusData = await fetch(
      `https://api.genius.com/search?page=${page}&q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_APIKEY}`,
        },
      }
    ).then((data) => data.json());

    if (geniusData.meta.status === 200)
      return res.json(geniusData.response.hits);
    else return res.status(400).json({ error: geniusData.meta.message });
  })
  .get("/languages", (req: Request, res: Response) => {
    return res.json(getLanguages());
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const language = req.query.language?.toString() || "en";

      if (!id) {
        return res.status(400).json({ message: "No id provided" });
      }

      const geniusData = await fetch(`https://api.genius.com/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_APIKEY}`,
        },
      }).then((data) => data.json());

      const lyrics = await getLyrics({
        apiKey: process.env.GENIUS_APIKEY,
        title: geniusData.response.song.title,
        artist: geniusData.response.song.artist_names,
        id: geniusData.response.song.id,
        optimizeQuery: true,
      });

      const agent = new HttpProxyAgent("http://212.107.31.118:80");
      const { text: translatedLyrics, raw } = await translate(lyrics, {
        to: language,
        fetchOptions: { agent },
      });

      return res.json({
        song: geniusData.response.song,
        lyrics,
        //  translatedLyrics: lyrics,
        translatedLyrics,
        originalLanguage: getLanguageByCode(raw.src),
        //originalLanguage: getLanguageByCode("en"),
      });
    } catch (err) {
      console.log(err);
    }
  });
export default songRouter;
