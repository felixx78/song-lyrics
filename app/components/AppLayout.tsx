"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import ReactQueryProvider from "./ReactQueryProvider";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactQueryProvider>
      <Header />
      <main>{children}</main>
    </ReactQueryProvider>
  );
}
export default AppLayout;
