import Search from "./components/Search";

export default function Home() {
  return (
    <div className="pt-28 px-4">
      <h1 className="text-center text-3xl mb-4 ">Search</h1>
      <Search size="lg" center />
    </div>
  );
}
