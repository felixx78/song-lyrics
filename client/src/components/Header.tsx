import { Link, useLocation } from "react-router-dom";
import SongSearch from "./SongSearch";

function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #835EF9, #6C7FF6 49%, #53A1F3)",
      }}
      className="flex items-center justify-between px-8 py-4"
    >
      <Link to="/" className="text-xl font-bold">
        Song Lyrics
      </Link>

      {location.pathname !== "/" && (
        <div className="hidden text-lg sm:block">
          <SongSearch />
        </div>
      )}
    </header>
  );
}
export default Header;
