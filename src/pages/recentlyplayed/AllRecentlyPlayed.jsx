import { useContext } from "react";
import { BiLeftArrowAlt, BiPlay } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppDispatchContext } from "../../App";

const AllRecentlyPlayed = () => {
  const allRecentlyPlayedReducer = useContext(AppDispatchContext);

  const navigate = useNavigate();

  return (
    <div className=" bg-dark_black relative">
      <section
        style={{
          background: "linear-gradient(#EC625F 5%, #111111)",
        }}
        className=" font-nunito not-italic relative px-[2%] pb-[6%] max-tablet:pb-[10%] text-white"
      >
        <button
          onClick={() => navigate(-1)}
          className=" hidden pt-[1%] mb-[5%] max-lap:block "
        >
          <BiLeftArrowAlt className=" text-xxl max-[550px]:text-[1.7rem] " />
        </button>
        <div className=" px-[1.5%]">
          <h3 className=" text-lg font-semibold max-tablet:text-medium mb-[1.5%] pt-[3%] max-lap:pt-[5%]">
            Recently Played
          </h3>
          <p className=" text-base font-medium max-tablet:text-sm">
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
              payload: allRecentlyPlayedReducer.state.recentlyPlayedSuffle.map(
                (e) => e
              ),
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_TRACK_LIST_URL",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed.map(
                (e) => e.url
              ),
            });
            allRecentlyPlayedReducer.dispatch({
              type: "SET_TRACK_DATA",
              payload: allRecentlyPlayedReducer.state.recentlyPlayed.map(
                (e) => e
              ),
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

      <section className=" bg-dark_black">
        {allRecentlyPlayedReducer.state.recentlyPlayed.map((e) => (
          <div
            onClick={() => {
              allRecentlyPlayedReducer.dispatch({
                type: "SET_SHUFFLE_URL",
                payload:
                  allRecentlyPlayedReducer.state.recentlyPlayedSuffle.map(
                    (e) => e.url
                  ),
              });
              allRecentlyPlayedReducer.dispatch({
                type: "SET_SHUFFLE_DATA",
                payload:
                  allRecentlyPlayedReducer.state.recentlyPlayedSuffle.map(
                    (e) => e
                  ),
              });
              allRecentlyPlayedReducer.dispatch({
                type: "SET_TRACK_LIST_URL",
                payload: allRecentlyPlayedReducer.state.recentlyPlayed.map(
                  (e) => e.url
                ),
              });
              allRecentlyPlayedReducer.dispatch({
                type: "SET_TRACK_DATA",
                payload: allRecentlyPlayedReducer.state.recentlyPlayed.map(
                  (e) => e
                ),
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
                payload: e.artist,
              });
              allRecentlyPlayedReducer.dispatch({
                type: "GET_AUDIO_PLAYER_TITLE",
                payload: e.name,
              });
              allRecentlyPlayedReducer.dispatch({
                type: "GET_AUDIO_PLAYER_AUDIO",
                payload: e.url,
              });
              allRecentlyPlayedReducer.dispatch({
                type: "GET_AUDIO_PLAYER_IMAGE",
                payload: e.image,
              });
            }}
            key={e.url}
            className=" cursor-pointer flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66] max-tablet:py-[2%]"
          >
            <img
              src={e.image}
              alt="song_cover"
              className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
            />
            <div className=" w-1/2">
              <h3 className="font-nunito not-italic text-base font-semibold truncate">
                {e.name}
              </h3>
              <p className="font-nunito not-italic text-sm font-medium ">
                {e.artist}
              </p>
            </div>
            <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-base">
              <AiOutlineHeart />
              <AiOutlinePlus />
            </div>
          </div>
        ))}
      </section>

      <section className=" h-[4.5rem] bg-light_black"></section>
    </div>
  );
};

export default AllRecentlyPlayed;
