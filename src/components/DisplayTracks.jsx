import React, { useContext, useRef, useMemo } from "react";
import { AppDispatchContext, AudioRefContext } from "../App";
import purpose from "../assets/Just_The_Way_You_Are.mp3";
import profile from "../assets/the_weekend.jpg";

function DisplayTracks({ setDuration, progressBarRef, handleNext }) {
  const displayTrackReducer = useContext(AppDispatchContext);
  const audioRef = useContext(AudioRefContext);

  const nowPlayingTogggle = displayTrackReducer.state.nowPlayingToggle;

  const title = useMemo(() => {
    return displayTrackReducer.state.audioPlayerTitle;
  }, [displayTrackReducer.state.audioPlayerTitle]);

  const src = displayTrackReducer.state.audioPlayerAudio;

  const image = useMemo(() => {
    return displayTrackReducer.state.audioPlayerImage;
  }, [displayTrackReducer.state.audioPlayerImage]);

  const artist = useMemo(() => {
    return displayTrackReducer.state.audioPlayerArtist;
  }, [displayTrackReducer.state.audioPlayerArtist]);

  const onLoadedMetadata = () => {
    const sec = audioRef.current.duration;
    setDuration(sec);
    progressBarRef.current.max = sec;
  };

  return (
    <>
      <div className={!nowPlayingTogggle? " flex justify-start gap-x-2 items-center text-white" : " relative flex justify-center items-center text-center h-screen max-[1000px]:h-[50vh]" }>
        <img
          src={image}
          className={!nowPlayingTogggle ? "w-[3rem] h-[3rem] max-[560px]:w-[2.5rem] max-[560px]:h-[2.5rem]" : "w-[25rem] h-auto rounded-3xl max-[1000px]:blur-sm max-[1000px]:w-[70%]"}
        />
        <audio
          src={src}
          ref={audioRef}
          onEnded={handleNext}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className={!nowPlayingTogggle ? "block" : " absolute text-white hidden max-[1000px]:block"}>
          <p className={!nowPlayingTogggle ? " text-sm" : " text-[4vw]"} >{title}</p>
          <p className={!nowPlayingTogggle ? " text-xsm" : " text-[3vw]"}>{artist}</p>
        </div>
      </div>

      {/* {!displayTrackReducer.state.nowPlayingToggle && (
        <div className=" flex justify-start gap-x-2 items-center text-white">
          <img
            src={image}
            className="w-[3rem] h-[3rem] max-[560px]:w-[2.5rem] max-[560px]:h-[2.5rem]"
          />
          <audio
            src={src}
            ref={audioRef}
            onEnded={handleNext}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div>
            <p className=" text-base">{title}</p>
            <p className=" text-xsm">{artist}</p>
          </div>
        </div>
      )}
      {displayTrackReducer.state.nowPlayingToggle && (
        <div className=" relative flex justify-center items-center text-center h-screen max-[1000px]:h-[50vh]">
          <img
            src={image}
            className="w-[25rem] h-auto rounded-3xl max-[1000px]:blur max-[1000px]:w-[70%]"
          />
          <audio
            src={src}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={handleNext}
          />
          <div className=" absolute text-white hidden max-[1000px]:block">
            <p className=" text-[5vw]">{title}</p>
            <p className=" text-[3vw]">{artist}</p>
          </div>
        </div>
      )} */}
    </>
  );
}

export default React.memo(DisplayTracks);
