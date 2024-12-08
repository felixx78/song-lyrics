"use client";

import clsx from "clsx";
import { Lora } from "next/font/google";
import { usePathname } from "next/navigation";
import Search from "./Search";
import Link from "next/link";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500"],
});

function Header() {
  const location = usePathname();

  return (
    <header className="px-4 py-3 flex items-start justify-between">
      <Link
        href="/"
        className={clsx("font-medium text-xl px-1", lora.className)}
      >
        song lyrics
      </Link>
      {location !== "/" && <Search size="md" />}
    </header>
  );
}
export default Header;
