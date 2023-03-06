import React, { useRef, useState, useContext } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { AppDispatchContext } from "../App";
import { DisplayTracks, Controls } from "./import";

const AudioPlayer = () => {
  const progressBarRef = useRef();

  const audioReducer = useContext(AppDispatchContext);

  const [timeProgress, setTimeProgress] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);

  const nowPlayingTogggle = audioReducer.state.nowPlayingToggle;
  const trackList =
    audioReducer.state.toggleShuffle === true
      ? audioReducer.state.shuffleUrl
      : audioReducer.state.trackListUrl;
  const trackData =
    audioReducer.state.toggleShuffle === true
      ? audioReducer.state.shuffleData
      : audioReducer.state.trackData;

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
        <RiArrowDownSLine
          onClick={() => {
            audioReducer.dispatch({
              type: "TOGGLE_NOW_PLAYING",
              payload: false,
            });
          }}
          className={`${
            nowPlayingTogggle ? "block" : "hidden"
          } text-white text-xxl ml-[3%] cursor-pointer`}
        />
        <div
          className={
            !nowPlayingTogggle
              ? " flex justify-center items-center gap-2 "
              : " grid grid-cols-2  gap-x-8 place-content-center h-screen px-[5%] max-[1000px]:block"
          }
        >
          <div
            onClick={() => {
              audioReducer.dispatch({
                type: "TOGGLE_NOW_PLAYING",
                payload: true,
              });
            }}
            className={
              !nowPlayingTogggle &&
              "mr-auto w-[30%] max-[550px]:w-[60%] max-[300px]:w-[50%] cursor-pointer"
            }
          >
            <DisplayTracks
              {...{
                setDuration,
                progressBarRef,
                handleNext,
                repeat
              }}
            />
          </div>
          <div
            className={
              !nowPlayingTogggle &&
              " ml-auto w-[70%] max-[550px]:w-[40%] max-[300px]:w-[50%]"
            }
          >
            <Controls
              {...{
                progressBarRef,
                duration,
                setTimeProgress,
                timeProgress,
                handleNext,
                handlePrev,
                setRepeat
              }}
              replay={repeat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AudioPlayer);
