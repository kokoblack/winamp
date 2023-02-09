import AllSongs from "./AllSongs";
import NowPlaying from "./NowPlaying";
import RecentPlayed from "./RecentPlayed";
import Recommended from "./Recommended";
import SideNav from "./SideNav";

function Home() {
  return (
    <div className="w-full bg-light_black">
      <section className="flex max-[719px]:block">
        <section className="basis-1/6 max-[719px]:hidden" >
          <SideNav />
        </section>

        <section className="basis-5/6 w-full">
          <AllSongs />
          <RecentPlayed />
          <Recommended />
        </section>
      </section>

      <section className="">
        <NowPlaying />
      </section>
    </div>
  );
}

export default Home;
