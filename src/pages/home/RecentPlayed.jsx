import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import img from '../../assets/css.jpg'
import RecentlyPlayedIsLoading from "../../components/RecentlyPlayedIsLoading";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { Link } from "react-router-dom";

function RecentPlayed() {
  const recentlyPlayedReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shuffleSong, setShuffleSong] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const trackData = res.data.items.map((e) => {
          return {
            id: e.id,
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

        recentlyPlayedReducer.dispatch({
          type: "RECENTLY_PLAYED_DATA",
          payload: uniqueData,
        });

        recentlyPlayedReducer.dispatch({
          type: "RECENTLY_PLAYED_SHUFFLE",
          payload: shuffleData,
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className=" font-nunito not-italic overflow-hidden bg-light_black py-[.5rem] w-[60%] h-[12rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto max-lap:mb-[2%]">
        <section className=" flex justify-center items-center text-white px-[5%] py-[1%] mb-[2%]">
          <h3 className=" mr-auto text-lg font-bold max-[550px]:text-medium">
            Recently played
          </h3>
          <Link
            to="/recently"
            className=" ml-auto text-medium font-medium max-[550px]:text-base"
          >
            See all
          </Link>
        </section>

        {loading ? (
          <RecentlyPlayedIsLoading />
        ) : (
          <div>

            <section className=" ">
              {recentlyPlayedReducer.state.recentlyPlayed
                .slice(0, 2)
                .map((e) => (
                  <div
                    onClick={() => {
                      recentlyPlayedReducer.dispatch({
                        type: "SET_SHUFFLE_URL",
                        payload: shuffleSong.map((e) => e.url),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_SHUFFLE_DATA",
                        payload: shuffleSong.map((e) => e),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_TRACK_LIST_URL",
                        payload: song.map((e) => e.url),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_TRACK_DATA",
                        payload: song.map((e) => e),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_PLAYER_STATE",
                        payload: !recentlyPlayedReducer.state.updatePlayerSate,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_IS_PLAYING",
                        payload: true,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_ARTIST",
                        payload: e.artist,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_TITLE",
                        payload: e.name,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_AUDIO",
                        payload: e.url,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_IMAGE",
                        payload: e.image,
                      });
                    }}
                    key={e.url}
                    className=" flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66] cursor-pointer"
                  >
                    <img
                      src={e.image}
                      alt="song_cover"
                      className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
                    />
                    <div className=" w-1/2">
                      <h3 className="font-nunito not-italic text-base font-semibold truncate">
                        {e.name}
                      </h3>
                      <p className="font-nunito not-italic text-sm font-medium ">
                        {e.artist}
                      </p>
                    </div>
                    <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-medium">
                      <AiOutlineHeart />
                      <AiOutlinePlus />
                    </div>
                  </div>
                ))}
            </section>

            <section >
              {recentlyPlayedReducer.state.recentlyPlayed
                .slice(3, 6)
                .map((e) => (
                  <div
                    onClick={() => {
                      recentlyPlayedReducer.dispatch({
                        type: "SET_SHUFFLE_URL",
                        payload: shuffleSong.map((e) => e.url),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_SHUFFLE_DATA",
                        payload: shuffleSong,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_TRACK_LIST_URL",
                        payload: song.map((e) => e.url),
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_TRACK_DATA",
                        payload: song,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_PLAYER_STATE",
                        payload: !recentlyPlayedReducer.state.updatePlayerSate,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "SET_IS_PLAYING",
                        payload: true,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_ARTIST",
                        payload: e.artist,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_TITLE",
                        payload: e.name,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_AUDIO",
                        payload: e.url,
                      });
                      recentlyPlayedReducer.dispatch({
                        type: "GET_AUDIO_PLAYER_IMAGE",
                        payload: e.image,
                      });
                    }}
                    key={e.url}
                    className=" hidden cursor-pointer justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66] max-lap:flex"
                  >
                    <img
                      src={e.image}
                      alt="song_cover"
                      className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
                    />
                    <div className=" w-[50%]">
                      <h3 className="font-nunito not-italic text-base font-semibold truncate ">
                        {e.name}
                      </h3>
                      <p className="font-nunito not-italic text-sm font-medium ">
                        {e.artist}
                      </p>
                    </div>
                    <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-medium">
                      <AiOutlineHeart />
                      <AiOutlinePlus />
                    </div>
                  </div>
                ))}
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default RecentPlayed;
