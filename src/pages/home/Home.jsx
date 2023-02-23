import AllSongs from "./AllSongs";
import NowPlaying from "./NowPlaying";
import RecentPlayed from "./RecentPlayed";
import Recommended from "./Recommended";
import SideNav from "./SideNav";
import HomeArtist from "./HomeArtist";

function Home() {
  return (
    <div className="max-w-full relative bg-dark_black">
      <section className="flex max-lap:block">
        <section className="basis-[13%] max-lap:hidden">
          <SideNav/>
        </section>

        <section className="basis-[87%] w-full">
          <AllSongs />
          <div className=" flex justify-center items-center gap-4 p-[2%] max-[1000px]:block">
            <RecentPlayed />
            <HomeArtist />
          </div>
          <div className=" px-[2%] ">
            <Recommended />
            <div className=" h-[4.5rem]"></div>
          </div>
        </section>
      </section>

      <section className="">
        <NowPlaying />
      </section>
    </div>
  );
}

export default Home;
