import { useEffect, useState } from "react";
import { Song } from "../lib/definitons";
import { fetchSongs } from "../api/songs";

type Data = {
  type: string;
  result: Song;
}[];

function useInfinitySongs(query: string) {
  const [data, setData] = useState<Data>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((prev) => prev + 1);

  const fetchNext = async () => {
    const newData = await fetchSongs(query.replace(/ /g, "+"), page);
    if (!newData.length) setHasNextPage(false);
    else {
      if (page === 1) setData(newData);
      else setData((prev) => [...prev, ...newData]);
    }
  };

  useEffect(() => {
    if (hasNextPage) {
      setIsLoading(true);
      fetchNext();
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    setHasNextPage(true);
    setData([]);

    setIsLoading(true);
    fetchNext();
    setTimeout(() => setIsLoading(false), 1000);
  }, [query]);

  return { data, hasNextPage, isLoading, nextPage };
}
export default useInfinitySongs;
