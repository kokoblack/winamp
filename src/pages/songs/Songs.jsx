import { React, useEffect, useContext, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import NowPlaying from "../home/NowPlaying";
import {
  AppDispatchContext,
  AudioRefContext,
  RefreshTokenContext,
} from "../../App";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const Songs = () => {
  const token = useContext(RefreshTokenContext);
  const songPlayingReducer = useContext(AppDispatchContext);
  const audioRef = useContext(AudioRefContext);

  const id = songPlayingReducer.state.songPlayingId;
  const total = songPlayingReducer.state.songPlayingTrackTotal;

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        songPlayingReducer.dispatch({
          type: "SONG_TRACKS_DATA",
          payload: res.data.items,
        });

        console.log(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [token, id, total]);

  return (
    <div className="w-full bg-light_black h-screen relative">
      <section
        style={{
          backgroundImage: `url(${songPlayingReducer.state.songplayingimageSrc})`,
        }}
        className=" relative w-full bg-cover bg-center bg-[blue] h-[50vh]"
      >
        <p className=" w-1/2 absolute bottom-[10%] left-[1%] font-nunito not-italic text-lg font-black text-white max-laptop:text-base max-[850px]:text-sm max-[479px]:text-xsm">
          {" "}
          {songPlayingReducer.state.songPlayingdescription}
        </p>
        <button className=" absolute bottom-[-1.7vh] right-[2%] min-[1000px]:bottom-[-2.5vh] ">
          <BsPlayCircle className=" text-xxl max-[550px]:text-[1.7rem] text-bright_orange" />
        </button>
      </section>

      <section className=" bg-light_black">
        {songPlayingReducer.state.songsTracks.slice(0, 15).map((songs) => (
          <div
            onClick={() => {
              songPlayingReducer.dispatch({
                type: "SET_IS_PLAYING",
                payload: true,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_ARTIST",
                payload: songs.track.artists[0].name,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_TITLE",
                payload: songs.track.name,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_AUDIO",
                payload: songs.track.external_urls.spotify,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_IMAGE",
                payload: songs.track.album.images[2].url,
              });
            }}
            key={songs.track.id}
            className=" flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66]"
          >
            <img
              src={songs.track.album.images[0].url}
              alt="song_cover"
              className=" rounded-lg w-[4rem] h-[4rem] max-[850px]:w-[3rem] max-[850px]:h-[3rem] max-[550px]:w-[2.1rem] max-[550px]:h-[2.1rem]"
            />
            <div className=" w-full">
              <h3 className="font-nunito not-italic text-lg font-semibold max-[850px]:text-medium max-[550px]:text-sm">
                {songs.track.name}
              </h3>
              <p className="font-nunito not-italic text-base font-medium max-[850px]:text-sm max-[550px]:text-xxsm">
                {songs.track.artists[0].name}
              </p>
            </div>
            <AiOutlinePlus className=" ml-auto text-lg" />
            <audio ref={audioRef} src={songs.track.external_urls.spotify} controls/>
          </div>
        ))}
      </section>

      <NowPlaying />
    </div>
  );
};

export default Songs;
