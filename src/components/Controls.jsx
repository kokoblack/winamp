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
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";
import { RiVolumeUpFill, RiVolumeDownFill } from "react-icons/ri";
import { AppDispatchContext, AudioRefContext } from "../App";
import "./progressbar.css";

function Controls({
  progressBarRef,
  duration,
  setTimeProgress,
  timeProgress,
  handleNext,
  handlePrev,
}) {
  const audioRef = useContext(AudioRefContext);
  const controlReducer = useContext(AppDispatchContext);

  const [volume, setVolume] = useState(60);
  const playAnimationRef = useRef();

  const nowPlayingTogggle = controlReducer.state.nowPlayingToggle;
  const isPlaying = controlReducer.state.isPlaying;
  const updatePlayerSate = controlReducer.state.updatePlayerSate;

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
          !nowPlayingTogggle
            ? " flex justify-center items-center gap-[15%] text-white"
            : " flex justify-center items-center flex-col h-screen gap-y-12 text-white text-center max-[1000px]:h-[50vh]"
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
            !nowPlayingTogggle
              ? " flex justify-center items-center gap-[8%] mr-auto max-[750px]:mr-0 max-[550px]:gap-[15%]"
              : " flex justify-center items-center gap-x-8"
          }
        >
          <button
            className={
              !nowPlayingTogggle
                ? "text-lg max-[550px]:hidden"
                : "text-xl max-[560px]:text-medium"
            }
          >
            <IoRepeat />
          </button>
          <button
            onClick={handlePrev}
            className={
              !nowPlayingTogggle
                ? "text-[2rem] max-[550px]:text-xl"
                : "text-[3rem] max-[560px]:text-[1.8rem]"
            }
          >
            <IoPlaySkipBackSharp />
          </button>
          <div
            style={{
              background:
                "linear-gradient(242.35deg, rgba(236, 98, 95, 0.95) 14.44%, rgba(236, 98, 95, 0.35) 89.71%)",
            }}
            className={
              !nowPlayingTogggle
                ? " rounded-[100%] px-2 pt-1.5 pb-0 text-lg max-[550px]:text-medium max-[550px]:px-1.5 max-[550px]:pt-1"
                : " rounded-[100%] px-3 pt-1.5 pb-0 text-[2rem] max-[560px]:text-medium max-[560px]:px-1.5 max-[560px]:pt-1"
            }
          >
            <button
              onClick={togglePlayPause}
              className={
                !nowPlayingTogggle ? " text-dark_black" : " text-dark_black"
              }
            >
              {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
            </button>
          </div>
          <button
            onClick={handleNext}
            className={
              !nowPlayingTogggle
                ? "text-[2rem] max-[550px]:text-xl"
                : "text-[3rem] max-[560px]:text-[1.8rem]"
            }
          >
            <IoPlaySkipForwardSharp />
          </button>
          <button
            className={
              !nowPlayingTogggle
                ? "text-lg max-[550px]:hidden"
                : "text-xl max-[560px]:text-medium"
            }
          >
            <IoShuffleSharp />
          </button>
        </div>

        <div
          className={
            !nowPlayingTogggle
              ? "progress flex justify-center items-center gap-2 w-[40%] max-[550px]:hidden"
              : "progress flex justify-center items-center gap-2 text-medium w-full max-[560px]:text-sm"
          }
        >
          <span
            className={
              !nowPlayingTogggle ? "time current text-sm" : "time current "
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
          <span className={!nowPlayingTogggle ? "time text-sm" : "time"}>
            {formatTime(duration)}
          </span>
        </div>

        <div
          className={
            !nowPlayingTogggle
              ? "volume flex justify-center ml-auto items-center gap-2 w-[15%] max-[750px]:hidden"
              : " hidden"
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

      {/* {!controlReducer.state.nowPlayingToggle && (
        <div className=" flex justify-center items-center gap-[15%] text-white">
          <div className=" flex justify-center items-center gap-[8%] mr-auto max-[750px]:mr-0 max-[550px]:gap-[15%]">
            <button className="text-lg max-[550px]:hidden">
              <IoRepeat />
            </button>
            <button
              onClick={handlePrev}
              className="text-[2rem] max-[550px]:text-xl"
            >
              <IoPlaySkipBackSharp />
            </button>
            <div
              style={{
                background:
                  "linear-gradient(242.35deg, rgba(236, 98, 95, 0.95) 14.44%, rgba(236, 98, 95, 0.35) 89.71%)",
              }}
              className=" rounded-[100%] px-2 pt-1.5 pb-0 text-lg max-[550px]:text-medium max-[550px]:px-1.5 max-[550px]:pt-1"
            >
              <button onClick={togglePlayPause} className=" text-dark_black">
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
              </button>
            </div>
            <button
              onClick={handleNext}
              className="text-[2rem] max-[550px]:text-xl"
            >
              <IoPlaySkipForwardSharp />
            </button>
            <button className="text-lg max-[550px]:hidden">
              <IoShuffleSharp />
            </button>
          </div>

          <div className="progress flex justify-center items-center gap-2 w-[40%] max-[550px]:hidden">
            <span className="time current text-sm">
              {formatTime(timeProgress)}
            </span>
            <input
              type="range"
              ref={progressBarRef}
              defaultValue="0"
              onChange={handleChange}
            />
            <span className="time text-sm">{formatTime(duration)}</span>
          </div>

          <div className="volume flex justify-center ml-auto items-center gap-2 w-[15%] max-[750px]:hidden">
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
      )}

      {controlReducer.state.nowPlayingToggle && (
        <div className=" flex justify-center items-center flex-col h-screen gap-y-12 text-white text-center max-[1000px]:h-[50vh]">
          <div className=" max-[1000px]:hidden">
            <p className=" text-xxl">
              {controlReducer.state.audioPlayerArtist}
            </p>
            <p className=" text-xl my-8">
              {controlReducer.state.audioPlayerTitle}
            </p>
          </div>

          <div className=" flex justify-center items-center gap-x-8">
            <button className="text-xl max-[560px]:text-medium">
              <IoRepeat />
            </button>
            <button
              onClick={handlePrev}
              className="text-[3rem] max-[560px]:text-[1.8rem]"
            >
              <IoPlaySkipBackSharp />
            </button>
            <div
              style={{
                background:
                  "linear-gradient(242.35deg, rgba(236, 98, 95, 0.95) 14.44%, rgba(236, 98, 95, 0.35) 89.71%)",
              }}
              className=" rounded-[100%] px-3 pt-1.5 pb-0 text-[2rem] max-[560px]:text-medium max-[560px]:px-1.5 max-[560px]:pt-1"
            >
              <button onClick={togglePlayPause} className=" text-dark_black">
                {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
              </button>
            </div>
            <button className="text-[3rem] max-[560px]:text-[1.8rem]">
              <IoPlaySkipForwardSharp onClick={handleNext} />
            </button>
            <button className="text-xl max-[560px]:text-medium">
              <IoShuffleSharp />
            </button>
          </div>

          <div className="progress flex justify-center items-center gap-2 text-medium w-full max-[560px]:text-sm">
            <span className="time current ">{formatTime(timeProgress)}</span>
            <input
              type="range"
              ref={progressBarRef}
              defaultValue="0"
              onChange={handleChange}
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>
      )} */}
    </>
  );
}

export default React.memo(Controls);
