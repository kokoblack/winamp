import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  IoShuffleSharp,
  IoRepeat,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from "react-icons/io5";
import { RiVolumeUpFill, RiVolumeDownFill } from "react-icons/ri";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { AppDispatchContext, AudioRefContext } from "../App";
import "./progressbar.css";

function Controls({
  progressBarRef,
  duration,
  setTimeProgress,
  timeProgress,
  handleNext,
  handlePrev,
  replay,
  setRepeat,
}) {
  const audioRef = useContext(AudioRefContext);
  const controlReducer = useContext(AppDispatchContext);

  const [volume, setVolume] = useState(60);
  const playAnimationRef = useRef();

  const nowPlayingTogggle = controlReducer.state.nowPlayingToggle;
  const isPlaying = controlReducer.state.isPlaying;
  const toggleShuffle = controlReducer.state.toggleShuffle;
  const updatePlayerSate = controlReducer.state.updatePlayerSate;
  const toggle = controlReducer.state.themeToggle;

  const handleChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const togglePlayPause = () => {
    controlReducer.dispatch({ type: "SET_IS_PLAYING", payload: !isPlaying });
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, updatePlayerSate, repeat]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <>
      <div
        className={
          `${!nowPlayingTogggle
            ? " flex justify-center items-center gap-[15%]"
            : " flex justify-center items-center flex-col h-screen gap-y-12 text-center max-[1000px]:h-[50vh]"} ${toggle ? " text-white" : " text-dark_black"}`
        }
      >
        <div
          className={`${
            nowPlayingTogggle ? "block" : "hidden"
          } max-[1000px]:hidden`}
        >
          <p className=" text-xl my-8">
            {controlReducer.state.audioPlayerTitle}
          </p>
          <p className=" text-xxl">{controlReducer.state.audioPlayerArtist}</p>
        </div>

        <div
          className={
            `${!nowPlayingTogggle
              ? " flex justify-center items-center gap-[8%] mr-auto max-[750px]:mr-0 max-[550px]:gap-[15%]"
              : " flex justify-center items-center gap-x-[12%]"}`
          }
        >
          <button
            onClick={() => {
              setRepeat((prev) => !prev);
            }}
            className={
             `${ !nowPlayingTogggle
                ? `${
                    replay ? "text-bright_orange" : toggle ? " text-white" : " text-dark_black"
                  } text-lg max-[550px]:hidden`
                : `${
                    replay ? "text-bright_orange" : toggle ? " text-white" : " text-dark_black"
                  } text-xl max-[560px]:text-lg`}`
            }
          >
            <IoRepeat />
          </button>
          <button
            onClick={handlePrev}
            className={
              `${!nowPlayingTogggle
                ? ` text-[2rem] max-[550px]:text-xl`
                : ` text-[3rem] max-[560px]:text-[1.8rem]`}`
            }
          >
            <IoPlaySkipBackSharp />
          </button>
          <button
            onClick={togglePlayPause}
            className={
              `${!nowPlayingTogggle ? " text-bright_orange text-xxl max-tablet:text-[2.5rem]" : " text-bright_orange text-[4rem] max-tablet:text-[3rem]"}`
            }
          >
            {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </button>
          <button
            onClick={handleNext}
            className={
             `${ !nowPlayingTogggle
                ? "text-[2rem] max-[550px]:text-xl"
                : "text-[3rem] max-[560px]:text-[1.8rem]"}`
            }
          >
            <IoPlaySkipForwardSharp />
          </button>
          <button
            onClick={() => {
              controlReducer.dispatch({
                type: "SET_TOGGLE_SHUFFLE",
                payload: !toggleShuffle,
              });
            }}
            className={
              `${!nowPlayingTogggle
                ? `${
                    toggleShuffle ? "text-bright_orange" : toggle ? " text-white" : " text-dark_black"
                  } text-lg max-[550px]:hidden`
                : `${
                    toggleShuffle ? "text-bright_orange" : toggle ? " text-white" : " text-dark_black"
                  } text-xl max-[560px]:text-lg`}`
            }
          >
            <IoShuffleSharp />
          </button>
        </div>

        <div
          className={
            `${!nowPlayingTogggle
              ? "progress flex justify-center items-center gap-2 w-[40%] max-[550px]:hidden"
              : "progress flex justify-center items-center gap-2 text-medium w-full max-[560px]:text-sm"}`
          }
        >
          <span
            className={
              `${!nowPlayingTogggle ? "time current text-sm" : "time current "}`
            }
          >
            {formatTime(timeProgress)}
          </span>
          <input
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleChange}
          />
          <span className={`${!nowPlayingTogggle ? "time text-sm" : "time"}`}>
            {formatTime(duration)}
          </span>
        </div>

        <div
          className={
            `${!nowPlayingTogggle
              ? "volume flex justify-center ml-auto items-center gap-2 w-[15%] max-lap:hidden"
              : " hidden"}`
          }
        >
          <button className=" text-sm">
            <RiVolumeDownFill />
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              background: `linear-gradient(to right, #EC625F ${volume}%, #525252 ${volume}%)`,
            }}
          />
          <button className=" text-sm">
            <RiVolumeUpFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(Controls);
