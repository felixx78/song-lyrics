import { Router } from "express";
import songsRouter from "./songsRouter";
import artistRouter from "./artistRouter";

const apiRouter = Router()
  .use("/songs", songsRouter)
  .use("/artists", artistRouter);

export default apiRouter;
