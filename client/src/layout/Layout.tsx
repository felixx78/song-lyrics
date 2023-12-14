import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div className="min-h-screen bg-[#35335C] font-semibold text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
