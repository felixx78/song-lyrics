import clsx from "clsx";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500"],
});

function Header() {
  return (
    <header className="px-4 py-3">
      <p className={clsx("font-medium text-xl", lora.className)}>song lyrics</p>
    </header>
  );
}
export default Header;
