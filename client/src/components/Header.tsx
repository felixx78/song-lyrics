import { Link, useLocation } from "react-router-dom";
import SongSearch from "./SongSearch";

function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #835EF9, #6C7FF6 49%, #53A1F3)",
      }}
      className="flex items-center justify-between px-8 py-4 text-xl font-bold"
    >
      <Link to="/">Songs Lyrics</Link>

      {location.pathname !== "/" && (
        <div className="hidden sm:block">
          <SongSearch />
        </div>
      )}
    </header>
  );
}
export default Header;
