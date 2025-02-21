import Header from "./Header";
import ReactQueryProvider from "./ReactQueryProvider";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Header />
      <main>{children}</main>
    </ReactQueryProvider>
  );
}
export default AppLayout;
