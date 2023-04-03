import React, { useContext } from "react";
import { AppDispatchContext, AudioRefContext } from "../App";
import whiteImg from "../assets/white.png"
import blackImg from "../assets/dark.png"

function DisplayTracks({ setDuration, progressBarRef, repeat, handleNext }) {
  const displayTrackReducer = useContext(AppDispatchContext);
  const audioRef = useContext(AudioRefContext);

  const nowPlayingTogggle = displayTrackReducer.state.nowPlayingToggle;

  const title = displayTrackReducer.state.audioPlayerTitle;

  const src = displayTrackReducer.state.audioPlayerAudio;

  const image = displayTrackReducer.state.audioPlayerImage;

  const artist = displayTrackReducer.state.audioPlayerArtist;

  const toggle = displayTrackReducer.state.themeToggle;

  const image1 = toggle ? blackImg : whiteImg

  const onLoadedMetadata = () => {
    const sec = audioRef.current.duration;
    setDuration(sec);
    progressBarRef.current.max = sec;
  };

  const replay = () => {
    audioRef.current.currentTime = 0;

    displayTrackReducer.dispatch({
      type: "SET_PLAYER_STATE",
      payload: !displayTrackReducer.state.updatePlayerSate,
    });
  };

  return (
    <>
      <div
        className={
          `${!nowPlayingTogggle
            ? "max-w-[1440px] flex justify-start gap-x-2 items-center text-white"
            : "max-w-[1440px] relative flex justify-center items-center text-center h-screen max-[1000px]:h-[50vh]"} ${toggle ? "text-white" : " text-dark_black"}`
        }
      >
        <img
          src={image === "" ? image1 : image}
          className={
            `${!nowPlayingTogggle
              ? "w-[3rem] h-[3rem] max-[560px]:w-[2.5rem] max-[560px]:h-[2.5rem]"
              : "w-[25rem] h-auto rounded-3xl max-[1000px]:blur-sm max-[1000px]:w-[70%]"}`
          }
        />
        <audio
          src={src}
          ref={audioRef}
          onEnded={repeat ? replay : handleNext }
          onLoadedMetadata={onLoadedMetadata}
        />
        <div
          className={
            `${!nowPlayingTogggle
              ? "block w-[50%] overflow-hidden"
              : " absolute text-white hidden max-[1000px]:block"} ${toggle ? " text-white" : " text-dark_black"}`
          }
        >
          <p className={`${!nowPlayingTogggle ? " text-sm truncate" : " text-[4vw]"}`}>
            {title}
          </p>
          <p className={`${!nowPlayingTogggle ? " text-xsm" : " text-[3vw]"}`}>
            {artist}
          </p>
        </div>
      </div>
    </>
  );
}

export default React.memo(DisplayTracks);
