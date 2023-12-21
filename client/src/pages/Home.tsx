import SongSearch from "../components/SongSearch";

function Home() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center px-6">
      <h1 className="mb-2 text-4xl">Search</h1>
      <SongSearch py="2" />
    </div>
  );
}
export default Home;
