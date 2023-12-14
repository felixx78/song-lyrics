import { Request, Response, Router } from "express";

const artistRouter = Router()
  .get("/songs/:id", async (req: Request, res: Response) => {
    const page = req.query?.page || 1;

    if (!req.params.id)
      return res.status(400).json({ error: "No artist id provided" });

    const geniusData = await fetch(
      `https://api.genius.com/artists/${req.params.id}/songs?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_APIKEY}`,
        },
      }
    ).then((data) => data.json());

    if (geniusData.meta.status === 200)
      return res.json(geniusData.response.songs);
    else return res.status(400).json({ error: geniusData.meta.message });
  })

  .get("/:id", async (req: Request, res: Response) => {
    const geniusData = await fetch(
      `https://api.genius.com/artists/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GENIUS_APIKEY}`,
        },
      }
    ).then((data) => data.json());

    if (geniusData.meta.status === 200)
      return res.json(geniusData.response.artist);
    else return res.status(400).json({ error: geniusData.meta.message });
  });
export default artistRouter;
