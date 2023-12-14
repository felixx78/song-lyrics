import { Navigate, useParams } from "react-router-dom";
import { fetchArtist } from "../api/artists";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SongCard, { SongCardSkeleton } from "../components/SongCard";
import Skeleton from "react-loading-skeleton";
import useInfinityArtistSongs from "../hooks/useInfinityArtistSongs";
import { useCallback, useRef } from "react";

function ArtistPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" />;
  }

  const { data: artist, isLoading } = useQuery({
    queryKey: ["artist", id],
    queryFn: fetchArtist,
  });
  const {
    data: songs,
    isLoading: isSongsLoading,
    hasNextPage,
    nextPage,
  } = useInfinityArtistSongs(id);

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
    [hasNextPage, isLoading]
  );

  const ArtistInfo = () => {
    console.log(artist)
    if (artist) {
      return (
        <>
          <img
            src={artist.image_url}
            alt=""
            className="mb-2 w-[288px] rounded-full"
          />

          <Link
            to={artist.url}
            target="_blank"
            className="text-center text-2xl hover:underline"
          >
            {artist.name}
          </Link>
        </>
      );
    }
  };

  const ArtistInfoSkeleton = () => {
    return (
      <>
        <Skeleton
          height={288}
          width={288}
          className="mb-2 rounded-full md:col-span-2"
          circle
        />
        <Skeleton height={30} width={200} />
      </>
    );
  };

  return (
    <div className="grid w-full grid-cols-6 justify-between gap-4 px-8 py-8">
      <div className="col-span-6 flex flex-shrink-0 flex-col items-center text-center md:col-span-2">
        {isLoading ? <ArtistInfoSkeleton /> : <ArtistInfo />}
      </div>

      <div className="col-span-6 mx-auto grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1 lg:grid-cols-2 xl2:grid-cols-3">
        {!!songs.length &&
          songs.map((song, index) => {
            return (
              <div
                key={song.id}
                ref={index === songs.length - 1 ? lastSongCard : null}
              >
                <SongCard song={song} />
              </div>
            );
          })}

        {isSongsLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <SongCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
export default ArtistPage;
