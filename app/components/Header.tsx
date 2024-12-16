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
        className={clsx(
          "font-medium flex gap-1.5 items-center text-xl px-1",
          lora.className
        )}
      >
        <Icon />
        song lyrics
      </Link>
      {location !== "/" && (
        <div className="hidden sm:block">
          <Search size="md" />
        </div>
      )}
    </header>
  );
}

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="#FFFFFF"
    viewBox="0 0 256 256"
  >
    <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V240a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path>
  </svg>
);

export default Header;
