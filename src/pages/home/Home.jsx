import AllSongs from "./AllSongs";
import RecentPlayed from "./RecentPlayed";
import Recommended from "./Recommended";
import HomeArtist from "./HomeArtist";
import { AppDispatchContext } from "../../App";
import { useContext } from "react";

function Home() {
  const homeReducer = useContext(AppDispatchContext)
  const toggle = homeReducer.state.themeToggle;

  return (
    <div className={`max-w-full relative ${toggle ? "bg-dark_black" : "bg-white"} max-lap:h-screen`}>
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
