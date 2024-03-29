import { React, useEffect, useContext, useState } from "react";
import { BiLeftArrowAlt, BiPlay } from "react-icons/bi";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SongsIsloading from "../../components/SongsIsloading";
import PlayButton from "../../components/PlayButton";

const Songs = () => {
  const token = useContext(RefreshTokenContext);
  const songPlayingReducer = useContext(AppDispatchContext);
  const toggle = songPlayingReducer.state.themeToggle;

  const navigate = useNavigate();

  const [song, setSong] = useState([]);
  const [shuffleSong, setShuffleSong] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = songPlayingReducer.state.songPlayingId;
  const total = songPlayingReducer.state.songPlayingTrackTotal;

  useEffect(() => {
    setLoading(true);

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
        const jsonObject = trackData.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const removeDuplicate = Array.from(uniqueSet).map(JSON.parse);

        const uniqueData = [];
        const shuffle = [];
        removeDuplicate.forEach((e) => {
          if (e.url === null) {
            null;
          } else {
            uniqueData.push(e);
            shuffle.push(e);
          }
        });

        const shuffleData = shuffle.sort(() => Math.random() - 0.5);

        setShuffleSong(shuffleData);
        setSong(uniqueData);
        songPlayingReducer.dispatch({
          type: "SONG_TRACKS_DATA",
          payload: uniqueData,
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token, id, total]);

  return (
    <div className={`w-full ${toggle ? "bg-dark_black" : "bg-white"} relative`}>
      <section
        style={{
          backgroundImage: `url(${songPlayingReducer.state.songplayingimageSrc})`,
        }}
        className=" relative w-full bg-cover bg-center h-[30vh] p-[2%]"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-xxl mb-[5%] hidden max-lap:block max-[550px]:text-[1.7rem]"
        >
          <BiLeftArrowAlt />
        </button>
        <p className={` w-1/2 absolute bottom-[10%] left-[2%] font-nunito not-italic text-lg font-black ${toggle ? "text-white" : " text-dark_black"} max-laptop:text-base max-tablet:text-[.8rem]`}>
          {" "}
          {songPlayingReducer.state.songPlayingdescription}
        </p>
        <PlayButton
          action={songPlayingReducer}
          shuffleSong={shuffleSong}
          song={song}
        />
      </section>

      {loading ? (
        <SongsIsloading />
      ) : (
        <section className={` ${toggle ? "bg-dark_black" : "bg-white"} `}>
          {songPlayingReducer.state.songsTracks.map((songs) => (
            <div
              onClick={() => {
                songPlayingReducer.dispatch({
                  type: "SET_SHUFFLE_URL",
                  payload: shuffleSong.map((e) => e.url),
                });
                songPlayingReducer.dispatch({
                  type: "SET_SHUFFLE_DATA",
                  payload: shuffleSong.map((e) => e),
                });
                songPlayingReducer.dispatch({
                  type: "SET_TRACK_LIST_URL",
                  payload: song.map((e) => e.url),
                });
                songPlayingReducer.dispatch({
                  type: "SET_TRACK_DATA",
                  payload: song.map((e) => e),
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
              className={` cursor-pointer flex justify-center items-center gap-[3%] px-[5%] py-[1%] ${toggle ? "text-white" : " text-dark_black"}  w-full hover:bg-[#EC625F66] max-tablet:py-[2%]`}
            >
              <img
                src={songs.image}
                alt="song_cover"
                className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
              />
              <div className=" w-1/2">
                <h3 className="font-nunito not-italic text-base font-semibold truncate">
                  {songs.name}
                </h3>
                <p className="font-nunito not-italic text-sm font-medium ">
                  {songs.artist}
                </p>
              </div>
              <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-base">
                <AiOutlineHeart />
                <AiOutlinePlus />
              </div>
            </div>
          ))}
          <div className={`${toggle ? " bg-dark_black" : " bg-white"} h-[4.5rem]`}></div>
        </section>
      )}
    </div>
  );
};

export default Songs;
