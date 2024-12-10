"use client";

import Lyrics from "@/app/components/Lyrics";
import Settings from "@/app/components/Settings";
import Loading from "@/app/loading";
import useSettingsStore from "@/app/stores/useSettingsStore";
import type Song from "@/app/types/Song";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const fetchSong = async (id: string) => {
  const response = await axios.get(`/api/song/${id}`);
  return response.data as Song;
};

const fetchLyrics = async (url: string, lang?: string) => {
  const response = await axios.get("/api/lyrics", { params: { url, lang } });
  return response.data as { lyrics: string; translated: string; from: string };
};

function Song() {
  const { id } = useParams();
  const { language } = useSettingsStore();

  const [isArtLoaded, setIsArtLoaded] = useState(false);

  const { data } = useQuery({
    queryKey: ["song", id],
    queryFn: () => fetchSong(String(id)),
  });

  const { data: lyricsData } = useQuery({
    queryKey: ["song", data, language],
    queryFn: () => fetchLyrics(data!.url, language),
    enabled: !!data,
  });

  useEffect(() => {
    if (!data) return;
    const recentViewed: Song[] = JSON.parse(
      localStorage.getItem("recent-viewed") || "[]"
    );
    localStorage.setItem(
      "recent-viewed",
      JSON.stringify(
        [data, ...recentViewed.filter((i) => i.id !== data.id)].slice(0, 10)
      )
    );
  }, [data]);

  if (!data) return <Loading />;

  return (
    <div className="py-6">
      <div className="max-w-[330px] px-4 mb-8 mx-auto">
        <div className="mb-6">
          {!isArtLoaded && (
            <div className="bg-gray-400 w-[298px] animate-pulse h-[298px]" />
          )}

          <div className={clsx(!isArtLoaded && "opacity-0 absolute invisible")}>
            <Image
              width={298}
              height={298}
              src={data.song_art_image_url}
              alt=""
              onLoadingComplete={() => setIsArtLoaded(true)}
            />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl mb-3 text-center">{data.title}</h1>
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

      <Settings />

      <Lyrics
        orignal={lyricsData?.lyrics}
        translated={lyricsData?.translated}
      />
    </div>
  );
}

export default Song;
