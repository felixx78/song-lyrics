import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

function Layout() {
  return (
    <div className="min-h-screen bg-[#35335C] font-semibold text-white">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
