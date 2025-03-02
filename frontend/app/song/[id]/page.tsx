export const dynamic = "force-dynamic";

import Lyrics from "@/app/components/Lyrics";
import Settings from "@/app/components/Settings";
import type Song from "@/app/types/Song";
import { notFound } from "next/navigation";
import apiClient from "@/app/helpers/apiClient";
import Image from "next/image";
import RecentViewed from "@/app/components/RecentViewed";

const fetchSong = async (id: string) => {
  const response = await apiClient.get(`/api/songs/${id}`);
  return response.data as Song;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  try {
    const data = await fetchSong(id);

    return (
      <div className="py-6">
        <div className="max-w-[330px] px-4 mb-8 mx-auto">
          <div className="mb-6">
            <Image
              width={298}
              height={298}
              src={data.song_art_image_url}
              alt=""
            />
          </div>
          <h1 className="text-2xl sm:text-3xl mb-3 text-center">
            {data.title}
          </h1>
          <p className="text-center text-gary-300 mb-4">
            {[data.primary_artist, ...data.featured_artists]
              .map((i) => i.name)
              .join(", ")}
          </p>
          <div className="text-gray-300 space-y-1">
            <p>Release: {data.release_date_for_display}</p>
            {data.album && <p>Album: {data.album.name}</p>}
          </div>
        </div>

        <RecentViewed song={data} />

        <Settings />

        <Lyrics url={data.url} />
      </div>
    );
  } catch (_) {
    notFound();
  }
}
