import { Link } from "react-router-dom";
import { Song } from "../lib/definitons";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

function SongCard({ song }: { song: Song }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-[300px]">
      <Link
        to={`/song/${song.id}`}
        className="mb-2 block h-[300px] overflow-hidden rounded-md border border-[#7b69f8]"
      >
        <img
          onLoad={() => setIsImageLoaded(true)}
          width={isImageLoaded ? 300 : 0}
          src={song.song_art_image_url}
          alt=""
        />
        {!isImageLoaded && <Skeleton width={300} height={300} />}
      </Link>

      <div className="truncate text-xl font-bold">{song.title}</div>

      <div className="mb-1 truncate text-lg text-gray-300">
        <Link
          to={`/artist/${song.primary_artist.id}`}
          className="p-1 pl-0 hover:underline"
        >
          {song.primary_artist.name}
        </Link>
        {!!song.featured_artists.length && (
          <>
            <span>&nbsp;ft.</span>
            {song.featured_artists.map((artist, index) => (
              <Link
                key={artist.id}
                className="p-1 hover:underline"
                to={`/artist/${artist.id}`}
              >
                {artist.name +
                  (song.featured_artists.length - 1 === index ? "" : ",")}
              </Link>
            ))}
          </>
        )}
      </div>

      <div className="text-right text-gray-400">
        {song.release_date_for_display}
      </div>
    </div>
  );
}
export default SongCard;

export const SongCardSkeleton = () => {
  return (
    <div className="w-[300px]">
      <Skeleton
        className="mb-1 border border-[#7b69f8]"
        width={300}
        height={300}
      />

      <Skeleton className="mb-1" width={100} height={20} />
      <Skeleton width={120} height={20} />

      <div className="flex justify-end">
        <Skeleton width={120} height={20} />
      </div>
    </div>
  );
};
