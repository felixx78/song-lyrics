import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(
  cors({ origin: ["https://songslyrics.vercel.app", "http://localhost:5173"] })
);

app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
