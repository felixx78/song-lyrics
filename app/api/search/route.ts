import response from "@/app/helpers/response";
import geniusClient from "../geniusClient";
import Song from "@/app/types/Song";
import { NextRequest } from "next/server";

type Hit = {
  result: Song;
};

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const page = queryParams.get("page") ?? 0;
  const q = queryParams.get("q");

  const data = (await geniusClient.get("/search", {
    params: { page, q },
  })) as { hits: Hit[] };

  return response(data.hits.map((i) => i.result));
}
