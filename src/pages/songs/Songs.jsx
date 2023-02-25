import { React, useEffect, useContext } from "react";
import { BiLeftArrowAlt, BiPlay } from "react-icons/bi";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Songs = () => {
  const token = useContext(RefreshTokenContext);
  const songPlayingReducer = useContext(AppDispatchContext);

  const navigate = useNavigate();

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
        const removeNull = [];
        res.data.items.forEach((e) => {
          if (e.track === null) {
            null;
          } else {
            removeNull.push(e);
          }
        });
        
        const trackData = removeNull.map((e) => {
          return {
            id: e.track.id,
            name: e.track.name,
            url: e.track.preview_url,
            artist: e.track.artists[0].name,
            image: e.track.album.images[0].url,
          };
        });
        console.log(trackData)
        const jsonObject = trackData.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const removeDuplicate = Array.from(uniqueSet).map(JSON.parse);

        const uniqueData = [];
        removeDuplicate.forEach((e) => {
          if (e.url === null) {
            null;
          } else {
            uniqueData.push(e);
          }
        });

        songPlayingReducer.dispatch({
          type: "SONG_TRACKS_DATA",
          payload: uniqueData,
        });
      })
      .catch((err) => console.log(err));
  }, [token, id, total]);

  return (
    <div className="w-full bg-dark_black relative">
      <section
        style={{
          backgroundImage: `url(${songPlayingReducer.state.songplayingimageSrc})`,
        }}
        className=" relative w-full bg-cover bg-center bg-[blue] h-[50vh] p-[2%]"
      >
        <button onClick={() => navigate(-1)} className='text-xxl mb-[5%] hidden max-lap:block max-[550px]:text-[1.7rem]'>
          <BiLeftArrowAlt/>
        </button>
        <p className=" w-1/2 absolute bottom-[10%] left-[2%] font-nunito not-italic text-lg font-black text-white max-laptop:text-base max-[850px]:text-sm max-[479px]:text-xsm">
          {" "}
          {songPlayingReducer.state.songPlayingdescription}
        </p>
        <button className=" absolute bottom-[-1.7vh] right-[2%] min-[1000px]:bottom-[-2.5vh] p-2 bg-bright_orange rounded-[100%]">
          <BiPlay className=" text-[1.5rem] text-dark_black" />
        </button>
      </section>

      <section className=" bg-dark_black">
        {songPlayingReducer.state.songsTracks.map((songs) => (
          <div
            onClick={() => {
              songPlayingReducer.dispatch({
                type: "SET_TRACK_LIST_URL",
                payload: songPlayingReducer.state.recommendation.map(
                  (e) => e.url
                ),
              });
              songPlayingReducer.dispatch({
                type: "SET_TRACK_DATA",
                payload: songPlayingReducer.state.songsTracks,
              });
              songPlayingReducer.dispatch({
                type: "SET_PLAYER_STATE",
                payload: !songPlayingReducer.state.updatePlayerSate,
              });
              songPlayingReducer.dispatch({
                type: "SET_IS_PLAYING",
                payload: true,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_ARTIST",
                payload: songs.artist,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_TITLE",
                payload: songs.name,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_AUDIO",
                payload: songs.url,
              });
              songPlayingReducer.dispatch({
                type: "GET_AUDIO_PLAYER_IMAGE",
                payload: songs.image,
              });
            }}
            key={songs.id}
            className=" cursor-pointer flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66]"
          >
            <img
              src={songs.image}
              alt="song_cover"
              className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2rem] max-tablet:h-[2rem]"
            />
            <div className=" w-full">
              <h3 className="font-nunito not-italic text-base font-semibold max-tablet:text-xsm">
                {songs.name}
              </h3>
              <p className="font-nunito not-italic text-sm font-medium max-tablet:text-xxsm">
                {songs.artist}
              </p>
            </div>
            <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-base">
              <AiOutlineHeart />
              <AiOutlinePlus />
            </div>
          </div>
        ))}
        <div className=" h-[4.5rem] bg-light_black"></div>
      </section>
    </div>
  );
};

export default Songs;
