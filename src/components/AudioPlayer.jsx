import { React, useRef, useState } from "react";
import { DisplayTracks, Controls, ProgressBar } from "./import";

const AudioPlayer = () => {
  const audioRef = useRef();
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div>
      <DisplayTracks {...{ audioRef, setDuration, progressBarRef }} />
      <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress }} />
      <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
    </div>
  );
};

export default AudioPlayer;
