import { useContext } from "react";
import { BiLeftArrowAlt, BiPlay } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppDispatchContext } from "../../App";
import RecentlyPlayedSongs from "../../components/RecentlyPlayedSongs";

const AllRecentlyPlayed = () => {
  const allRecentlyPlayedReducer = useContext(AppDispatchContext);
  const toggle = allRecentlyPlayedReducer.state.themeToggle

  const style = {
    background: toggle ? "linear-gradient(#EC625F 5%, #111111)" : "linear-gradient(#EC625F 5%, #fff)",
  }

  const navigate = useNavigate();

  return (
    <div className={` relative`}>
      <section
      style={style}
        className=" font-nunito not-italic relative px-[2%] pb-[6%] max-tablet:pb-[10%] text-white"
      >
        <button
          onClick={() => navigate(-1)}
          className=" hidden pt-[1%] mb-[5%] max-lap:block "
        >
          <BiLeftArrowAlt className=" text-xxl max-[550px]:text-[1.7rem] " />
        </button>
        <div className=" px-[1.5%]">
          <h3 className={` ${toggle ? " text-white" : " text-dark_black"} text-lg font-semibold max-tablet:text-medium mb-[1.5%] pt-[3%] max-lap:pt-[5%]`}>
            Recently Played
          </h3>
          <p className={` ${toggle ? " text-white" : " text-dark_black"}  text-base font-medium max-tablet:text-sm`}>
            {`${allRecentlyPlayedReducer.state.recentlyPlayed.length} Songs`}
          </p>
        </div>
        <button
          onClick={() => {
            allRecentlyPlayedReducer.dispatch({
              type: "SET_SHUFFLE_URL",
              payload: allRecentlyPlayedReducer.state.recentlyPlayedSuffle.map(
                (e) => e.url
              ),
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_SHUFFLE_DATA",
              payload: allRecentlyPlayedReducer.state.recentlyPlayedSuffle,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_TRACK_LIST_URL",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed.map(
                (e) => e.url
              ),
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_TRACK_DATA",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_PLAYER_STATE",
              payload: !allRecentlyPlayedReducer.state.updatePlayerSate,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_IS_PLAYING",
              payload: true,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "GET_AUDIO_PLAYER_ARTIST",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed[0].artist,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "GET_AUDIO_PLAYER_TITLE",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed[0].name,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "GET_AUDIO_PLAYER_AUDIO",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed[0].url,
            });
            allRecentlyPlayedReducer.dispatch({
              type: "GET_AUDIO_PLAYER_IMAGE",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed[0].image,
            });
          }}
          className=" absolute bottom-0 right-[2%] p-2 max-tablet:p-1 bg-bright_orange rounded-[100%]"
        >
          <BiPlay className=" text-[1.5rem] text-dark_black" />
        </button>
      </section>

      <section className={`${toggle ? " bg-dark_black" : " bg-white"}`}>
        <RecentlyPlayedSongs
          action={allRecentlyPlayedReducer}
          shuffleSong={allRecentlyPlayedReducer.state.recentlyPlayedSuffle}
          song={allRecentlyPlayedReducer.state.recentlyPlayed}
          start={0}
          end={allRecentlyPlayedReducer.state.recentlyPlayed.length}
        />
      </section>

      <section className=" h-[4.5rem]"></section>
    </div>
  );
};

export default AllRecentlyPlayed;
