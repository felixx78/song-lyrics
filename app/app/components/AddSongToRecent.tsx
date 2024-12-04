"use client";

import { useEffect } from "react";
import Song from "../types/Song";

function AddSongToRecent({ data }: { data: Song }) {
  useEffect(() => {
    const storedRecentViewed = localStorage.getItem("recent-viewed");
    const recentViewed: Song[] = storedRecentViewed
      ? JSON.parse(storedRecentViewed)
      : [];

    localStorage.setItem(
      "recent-viewed",
      JSON.stringify([data, ...recentViewed.filter((i) => i.id === data.id)])
    );
  }, [data.id]);
  return null;
}
export default AddSongToRecent;
