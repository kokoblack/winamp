import React from "react";
import { tracks } from "./data";

const DisplayTracks = ({ audioRef, setDuration, progressBarRef }) => {
  const onLoadedMetadata = () => {
    const sec = audioRef.current.duration;
    setDuration(sec);
    progressBarRef.current.max = sec;
  };

  return (
    <div className="w-[20%]">
      {tracks.map((track) => (
        <div key={track.author} className="text-left">
          <img src={track.thumbnail} className="w-16 h-auto" />
          <audio
            src={track.src}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <p>{track.title}</p>
          <p>{track.author}</p>
        </div>
      ))}
      hey there
    </div>
  );
};

export default DisplayTracks;
