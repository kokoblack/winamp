import AllSongs from "./AllSongs";
import NowPlaying from "./NowPlaying";
import RecentPlayed from "./RecentPlayed";
import Recommended from "./Recommended";
import SideNav from "./SideNav";
import HomeArtist from "./HomeArtist";

function Home() {
  return (
    <div className="max-w-full relative bg-dark_black">
      <section className="flex max-[719px]:block">
        <section className="basis-1/6 max-[719px]:hidden">
          <SideNav />
        </section>

        <section className="basis-5/6 w-full">
          <AllSongs />
          <div className=" flex justify-center items-center gap-2 p-[1%] max-[1000px]:block max-[1000px]:p-[2%]">
            <RecentPlayed />
            <HomeArtist />
          </div>
          <div>
            <Recommended />
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
