import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setValue(e.matches);
    const result = window.matchMedia(query);
    result.addEventListener("change", handleChange);
    setValue(result.matches);
    return () => result.removeEventListener("change", handleChange);
  }, [query]);

  return value;
}

export default useMediaQuery;
