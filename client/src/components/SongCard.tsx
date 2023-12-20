import { Link } from "react-router-dom";
import { Song } from "../lib/definitons";
import Skeleton from "react-loading-skeleton";

function SongCard({ song }: { song: Song }) {
  return (
    <Link to={`/song/${song.id}`} className="nav-link block w-[300px]">
      <div className="h-[300px] bg-[#7b69f8] overflow-hidden rounded-md mb-2">
      <img
        width={300}
        loading="lazy"
        src={song.header_image_thumbnail_url}
        alt=""
      />
      </div>

      <div className="text-xl font-bold truncate">{song.title}</div>

      <div className="mb-1 text-lg text-gray-300 truncate">
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
    </Link>
  );
}
export default SongCard;

export const SongCardSkeleton = () => {
  return (
    <div className="w-[300px]">
      <Skeleton className="mb-1" width={300} height={300} />

      <Skeleton className="mb-1" width={100} height={20} />
      <Skeleton width={120} height={20} />

      <div className="flex justify-end">
        <Skeleton width={120} height={20} />
      </div>
    </div>
  );
};
