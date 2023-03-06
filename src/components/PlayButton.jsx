import React from "react";
import { BiPlay } from "react-icons/bi";

function PlayButton({ action, shuffleSong, song }) {
  return (
    <button
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
          payload: action.state.songsTracks[0].artist,
        });
        action.dispatch({
          type: "GET_AUDIO_PLAYER_TITLE",
          payload: action.state.songsTracks[0].name,
        });
        action.dispatch({
          type: "GET_AUDIO_PLAYER_AUDIO",
          payload: action.state.songsTracks[0].url,
        });
        action.dispatch({
          type: "GET_AUDIO_PLAYER_IMAGE",
          payload: action.state.songsTracks[0].image,
        });
      }}
      className=" z-10 absolute bottom-[-1.7vh] right-[2%] min-[1000px]:bottom-[-2.5vh] p-2 bg-bright_orange rounded-[100%]"
    >
      <BiPlay className=" text-[1.5rem] text-dark_black" />
    </button>
  );
}

export default PlayButton;
