import axios from "axios";
import { React, useRef, useState, useContext } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AppDispatchContext } from "../App";
import { DisplayTracks, Controls } from "./import";

const AudioPlayer = () => {
  const progressBarRef = useRef();

  const audioReducer = useContext(AppDispatchContext);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <>
      <div className=" flex justify-center items-center gap-2 bg-light_black px-[2%] py-[1%] w-screen max-w-[1440px] max-[550px]:py-[2%]">
        <div
          onClick={() => {
            audioReducer.dispatch({
              type: "TOGGLE_NOW_PLAYING",
              payload: true,
            });
          }}
          className=" mr-auto basis-[30%] max-[550px]:basis-[60%]"
        >
          <DisplayTracks {...{ setDuration, progressBarRef }} />
        </div>
        <div className=" ml-auto basis-[70%] max-[550px]:basis-[40%]">
          <Controls
            {...{
              progressBarRef,
              duration,
              setTimeProgress,
              timeProgress,
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
              }}
              className=" text-white text-xxl ml-[3%]"
            />
            <div className=" grid grid-cols-2  gap-x-8 place-content-center h-screen px-[5%] max-[1000px]:block">
              <div className="">
                <DisplayTracks {...{ setDuration, progressBarRef }} />
              </div>
              <div className="">
                <Controls
                  {...{
                    progressBarRef,
                    duration,
                    setTimeProgress,
                    timeProgress,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
