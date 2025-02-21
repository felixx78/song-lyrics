"use client";

import { useEffect } from "react";
import Song from "../types/Song";

function RecentViewed({ song }: { song: Song }) {
  useEffect(() => {
    if (!song) return;
    const recentViewed: Song[] = JSON.parse(
      localStorage.getItem("recent-viewed") || "[]"
    );
    localStorage.setItem(
      "recent-viewed",
      JSON.stringify(
        [song, ...recentViewed.filter((i) => i.id !== song.id)].slice(0, 10)
      )
    );
  }, [song]);

  return null;
}
export default RecentViewed;
