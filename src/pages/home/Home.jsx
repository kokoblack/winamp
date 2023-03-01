import AllSongs from "./AllSongs";
import RecentPlayed from "./RecentPlayed";
import Recommended from "./Recommended";
import HomeArtist from "./HomeArtist";

function Home() {
  return (
    <div className="max-w-full relative bg-dark_black">
        <section className="w-full">
          <AllSongs />
          <div className=" flex justify-center items-center gap-4 p-[2%] max-[1000px]:block">
            <RecentPlayed />
            <HomeArtist />
          </div>
          <div className=" px-[2%] ">
            <Recommended />
            <div className=" h-[5rem]"></div>
          </div>
        </section>
    </div>
  );
}

export default Home;
