import React, { useRef, useState, useContext } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AppDispatchContext } from "../App";
import { DisplayTracks, Controls } from "./import";

const AudioPlayer = () => {
  const progressBarRef = useRef();

  const audioReducer = useContext(AppDispatchContext);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const nowPlayingTogggle = audioReducer.state.nowPlayingToggle;
  const trackList = audioReducer.state.trackList;
  const trackData = audioReducer.state.trackData;

  const handleNext = () => {
    audioReducer.dispatch({
      type: "SET_PLAYER_STATE",
      payload: !audioReducer.state.updatePlayerSate,
    });

    let find = trackList.indexOf(audioReducer.state.audioPlayerAudio);
    const check = find === -1 ? (find = 0) : find;

    if (find === trackList.length - 1) {
      find = 0;
    } else {
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_AUDIO",
        payload: trackList[check + 1],
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_ARTIST",
        payload: trackData[check + 1].artist,
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_TITLE",
        payload: trackData[check + 1].name,
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_IMAGE",
        payload: trackData[check + 1].image,
      });
    }
  };

  const handlePrev = () => {
    audioReducer.dispatch({
      type: "SET_PLAYER_STATE",
      payload: !audioReducer.state.updatePlayerSate,
    });
    let find = trackList.indexOf(audioReducer.state.audioPlayerAudio);
    const check = find === -1 ? (find = 0) : find;
    console.log(find);
    console.log(check);

    if (find === 0) {
      find = 0;
    } else {
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_AUDIO",
        payload: trackList[check - 1],
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_ARTIST",
        payload: trackData[check - 1].artist,
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_TITLE",
        payload: trackData[check - 1].name,
      });
      audioReducer.dispatch({
        type: "GET_AUDIO_PLAYER_IMAGE",
        payload: trackData[check - 1].image,
      });
    }
  };

  return (
    <>
      <div
        className={
          !nowPlayingTogggle
            ? " bg-light_black px-[2%] py-[1%] w-screen max-w-[1440px] max-[550px]:py-[2%]"
            : " h-screen bg-light_black w-screen bottom-0 py-[1%]"
        }
      >
        <MdKeyboardArrowDown
              onClick={() => {
                audioReducer.dispatch({
                  type: "TOGGLE_NOW_PLAYING",
                  payload: false,
                });
                audioReducer.dispatch({
                  type: "SET_PLAYER_STATE",
                  payload: !audioReducer.state.updatePlayerSate,
                });
              }}
              className={`${nowPlayingTogggle ? "block" : "hidden"} text-white text-xxl ml-[3%] cursor-pointer`}
            />
        <div className={!nowPlayingTogggle ?  " flex justify-center items-center gap-2 " : " grid grid-cols-2  gap-x-8 place-content-center h-screen px-[5%] max-[1000px]:block"}>
          <div
            onClick={() => {
              audioReducer.dispatch({
                type: "TOGGLE_NOW_PLAYING",
                payload: true,
              });
            }}
            className={
              !nowPlayingTogggle &&
              "mr-auto basis-[30%] max-[550px]:basis-[60%] cursor-pointer"
            }
          >
            <DisplayTracks
              {...{
                setDuration,
                progressBarRef,
                handleNext,
              }}
            />
          </div>
          <div className={!nowPlayingTogggle && " ml-auto basis-[70%] max-[550px]:basis-[40%]"}>
            <Controls
              {...{
                progressBarRef,
                duration,
                setTimeProgress,
                timeProgress,
                handleNext,
                handlePrev,
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className=" flex justify-center items-center gap-2 bg-light_black px-[2%] py-[1%] w-screen max-w-[1440px] max-[550px]:py-[2%]">
        
        <div
          onClick={() => {
            audioReducer.dispatch({
              type: "TOGGLE_NOW_PLAYING",
              payload: true,
            });
          }}
          className=" mr-auto basis-[30%] max-[550px]:basis-[60%]"
        >
          <DisplayTracks
            {...{
              setDuration,
              progressBarRef,
              handleNext
            }}
          />
        </div>
        <div className=" ml-auto basis-[70%] max-[550px]:basis-[40%]">
          <Controls
            {...{
              progressBarRef,
              duration,
              setTimeProgress,
              timeProgress,
              handleNext,
              handlePrev,
            }}
          />
        </div>
      </div>

      <div>
        {audioReducer.state.nowPlayingToggle && (
          <div className=" absolute h-screen bg-light_black w-full bottom-0 py-[1%]">
            <MdKeyboardArrowDown
              onClick={() => {
                audioReducer.dispatch({
                  type: "TOGGLE_NOW_PLAYING",
                  payload: false,
                });
                audioReducer.dispatch({
                  type: "SET_PLAYER_STATE",
                  payload: !audioReducer.state.updatePlayerSate,
                });
              }}
              className=" text-white text-xxl ml-[3%]"
            />
            <div className=" grid grid-cols-2  gap-x-8 place-content-center h-screen px-[5%] max-[1000px]:block">
              <div className="">
                <DisplayTracks
                  {...{ setDuration, progressBarRef, handleNext }}
                />
              </div>
              <div className="">
                <Controls
                  {...{
                    progressBarRef,
                    duration,
                    setTimeProgress,
                    timeProgress,
                    handleNext,
                    handlePrev,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default React.memo(AudioPlayer);
