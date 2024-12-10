import response from "@/app/helpers/response";
import Song from "@/app/types/Song";
import { NextRequest } from "next/server";
import geniusClient from "../../geniusClient";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const data = (await geniusClient.get(`/songs/${id}`)) as {
    song: Song;
  };
  return response(data.song);
}
