import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500"],
});

function Header() {
  return (
    <header className="">
      <p className={lora.className}>song lyrics</p>
    </header>
  );
}
export default Header;
