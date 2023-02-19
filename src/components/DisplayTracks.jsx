import { React, useContext } from "react";
import { AppDispatchContext, AudioRefContext } from "../App";
import purpose from "../assets/Just_The_Way_You_Are.mp3";
import profile from "../assets/the_weekend.jpg";

const DisplayTracks = ({ setDuration, progressBarRef }) => {
  const displayTrackReducer = useContext(AppDispatchContext);
  const audioRef = useContext(AudioRefContext)

  const onLoadedMetadata = () => {
    const sec = audioRef.current.duration;
    setDuration(sec);
    progressBarRef.current.max = sec;
  };

  return (
    <>
      {!displayTrackReducer.state.nowPlayingToggle && (
        <div className=" flex justify-start gap-x-2 items-center text-white">
          <img src={displayTrackReducer.state.audioPlayerImage} className="w-[3rem] h-[3rem] max-[560px]:w-[2.5rem] max-[560px]:h-[2.5rem]" />
          <audio
            src={displayTrackReducer.state.audioPlayerAudio}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div>
            <p className=" text-base">{displayTrackReducer.state.audioPlayerTitle}</p>
            <p className=" text-xsm">{displayTrackReducer.state.audioPlayerArtist}</p>
          </div>
        </div>
      )} 
      { displayTrackReducer.state.nowPlayingToggle && (
        <div className=" relative flex justify-center items-center text-center h-screen max-[1000px]:h-[50vh]">
          <img
            src={displayTrackReducer.state.audioPlayerImage}
            className="w-[25rem] h-auto rounded-3xl max-[1000px]:blur max-[1000px]:w-[70%]"
          />
          <audio
            src={displayTrackReducer.state.audioPlayerAudio}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <div className=" absolute text-white hidden max-[1000px]:block">
            <p className=" text-[5vw]">{displayTrackReducer.state.audioPlayerTitle}</p>
            <p className=" text-[3vw]">{displayTrackReducer.state.audioPlayerArtist}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayTracks;
