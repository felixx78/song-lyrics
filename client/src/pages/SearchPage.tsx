import { useLocation } from "react-router-dom";
import SongCard, { SongCardSkeleton } from "../components/SongCard";
import useInfinitySongs from "../hooks/useInfinitySongs";
import { useCallback, useRef } from "react";

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const { data, isLoading, hasNextPage, nextPage } = useInfinitySongs(query);

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastSongCard = useCallback(
    (node: any) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) nextPage();
      });

      if (node) intObserver.current.observe(node);
    },
    [hasNextPage, isLoading],
  );

  return (
    <div className="container pb-8 pt-4">
      <h1 className="mb-4 text-2xl sm:text-4xl">
        {data.length === 0 && !isLoading && "No"} Results for "{query.trim()}"
      </h1>

      <div className="mx-auto grid max-w-[1300px] grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!data.length &&
          data.map((i, index) => {
            if (i.type === "song") {
              return (
                <div
                  key={i.result.id}
                  ref={index === data.length - 1 ? lastSongCard : null}
                >
                  <SongCard song={i.result} />
                </div>
              );
            }

            return null;
          })}

        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <SongCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
export default SearchPage;
