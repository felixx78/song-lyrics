import { useQuery } from "@tanstack/react-query";
import { fetchAlbum } from "../api/album";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function AlbumPage() {
  const { artistName, title } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["album", artistName, title],
    queryFn: fetchAlbum,
  });

  if (isError)
    return <div className="pt-4 text-center text-2xl">Album Not Found</div>;

  if (isLoading) {
    return (
      <div className="container pb-8 pt-6">
        <div className="mx-auto max-w-[600px]">
          {/* image */}
          <div className="mx-auto mb-4 w-[300px]">
            <Skeleton height={300} width={300} />
          </div>

          {/* title */}
          <div className="mb-4 text-center">
            <Skeleton height={30} width={250} />
          </div>

          {/* songs */}
          <div>
            {Array.from({ length: 8 }, (_, i) => i).map((_, i) => (
              <Skeleton key={i} height={45} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="container pb-8 pt-6">
        <div className="mx-auto max-w-[600px]">
          <img
            src={data.cover_art_url}
            width={300}
            height={300}
            className="mx-auto mb-4"
            alt="album cover art"
          />
          <h1 className="mb-4 text-center text-2xl">
            {data.title}
            <Link to={`/artist/${data.artist_id}`}> by {data.artist}</Link>
          </h1>
          <div className="divide-y-2 divide-indigo-400 text-lg">
            {data.songs.map((song, i) => (
              <Link
                className="block bg-indigo-600 p-2 hover:bg-indigo-400"
                to={`/song/${song.id}`}
                key={song.id}
              >
                <span className="mr-2 inline-block">{i + 1}.</span> {song.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default AlbumPage;
