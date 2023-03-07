import React, { useContext } from "react";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { AppDispatchContext } from "../App";

const RecentlyPlayedSongs = ({ action, shuffleSong, song, start, end }) => {
  const recentlyPlayedSongReducer = useContext(AppDispatchContext)
  const toggle = recentlyPlayedSongReducer.state.themeToggle;

  return (
    <>
      {action.state.recentlyPlayed.slice(start, end).map((e, i) => (
        <div
          onClick={() => {
            action.dispatch({
              type: "SET_SHUFFLE_URL",
              payload: shuffleSong.map((e) => e.url),
            });
            action.dispatch({
              type: "SET_SHUFFLE_DATA",
              payload: shuffleSong,
            });
            action.dispatch({
              type: "SET_TRACK_LIST_URL",
              payload: song.map((e) => e.url),
            });
            action.dispatch({
              type: "SET_TRACK_DATA",
              payload: song,
            });
            action.dispatch({
              type: "SET_PLAYER_STATE",
              payload: !action.state.updatePlayerSate,
            });
            action.dispatch({
              type: "SET_IS_PLAYING",
              payload: true,
            });
            action.dispatch({
              type: "GET_AUDIO_PLAYER_ARTIST",
              payload: e.artist,
            });
            action.dispatch({
              type: "GET_AUDIO_PLAYER_TITLE",
              payload: e.name,
            });
            action.dispatch({
              type: "GET_AUDIO_PLAYER_AUDIO",
              payload: e.url,
            });
            action.dispatch({
              type: "GET_AUDIO_PLAYER_IMAGE",
              payload: e.image,
            });
          }}
          key={e.url}
          className={` flex cursor-pointer justify-center items-center gap-[3%] px-[5%] py-[1%] ${toggle ? " text-white" : " text-dark_black"} w-full hover:bg-[#EC625F66] `}
        >
          <img
            src={e.image}
            alt="song_cover"
            className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
          />
          <div className=" w-[50%]">
            <h3 className="font-nunito not-italic text-base font-semibold truncate ">
              {e.name}
            </h3>
            <p className="font-nunito not-italic text-sm font-medium ">
              {e.artist}
            </p>
          </div>
          <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-medium">
            <AiOutlineHeart />
            <AiOutlinePlus />
          </div>
        </div>
      ))}
    </>
  );
};

export default RecentlyPlayedSongs;
