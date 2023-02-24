import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { Link } from "react-router-dom";

function RecentPlayed() {
  const recentlyPlayedReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  useEffect(() => {
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
        removeDuplicate.forEach((e) => {
          if (e.url === null) {
            null;
          } else {
            uniqueData.push(e);
          }
        });

        recentlyPlayedReducer.dispatch({
          type: "RECENTLY_PLAYED_DATA",
          payload: uniqueData,
        });
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <div className=" font-nunito not-italic bg-light_black py-[.5rem] w-[60%] h-[12rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto max-lap:mb-[2%]">
        <section className=" flex justify-center items-center text-white px-[5%] py-[1%]">
          <h3 className=" mr-auto text-lg font-bold max-[550px]:text-base">
            Recently played
          </h3>
          <Link
            to="/recently"
            className=" ml-auto text-medium font-medium max-[550px]:text-xsm"
          >
            See all
          </Link>
        </section>

        <section className=" bg-light_black">
          {recentlyPlayedReducer.state.recentlyPlayed.slice(0, 2).map((e) => (
            <div
              onClick={() => {
                recentlyPlayedReducer.dispatch({
                  type: "SET_TRACK_LIST_URL",
                  payload: recentlyPlayedReducer.state.recentlyPlayed.map(
                    (e) => e.url
                  ),
                });
                recentlyPlayedReducer.dispatch({
                  type: "SET_TRACK_DATA",
                  payload: recentlyPlayedReducer.state.recentlyPlayed,
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
              className=" flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66]"
            >
              <img
                src={e.image}
                alt="song_cover"
                className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2rem] max-tablet:h-[2rem]"
              />
              <div className=" w-full">
                <h3 className="font-nunito not-italic text-base font-semibold max-tablet:text-sm">
                  {e.name}
                </h3>
                <p className="font-nunito not-italic text-sm font-medium max-tablet:text-xxsm">
                  {e.artist}
                </p>
              </div>
              <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-base">
                <AiOutlineHeart />
                <AiOutlinePlus />
              </div>
            </div>
          ))}
        </section>

        <section>
          {recentlyPlayedReducer.state.recentlyPlayed.slice(3, 6).map((e) => (
            <div
              onClick={() => {
                recentlyPlayedReducer.dispatch({
                  type: "SET_TRACK_LIST_URL",
                  payload: recentlyPlayedReducer.state.recentlyPlayed.map(
                    (e) => e.url
                  ),
                });
                recentlyPlayedReducer.dispatch({
                  type: "SET_TRACK_DATA",
                  payload: recentlyPlayedReducer.state.recentlyPlayed,
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
              className=" hidden justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66] max-lap:flex"
            >
              <img
                src={e.image}
                alt="song_cover"
                className=" rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2rem] max-tablet:h-[2rem]"
              />
              <div className=" w-full">
                <h3 className="font-nunito not-italic text-base font-semibold max-tablet:text-sm">
                  {e.name}
                </h3>
                <p className="font-nunito not-italic text-sm font-medium max-tablet:text-xxsm">
                  {e.artist}
                </p>
              </div>
              <div className=" flex justify-center items-center ml-auto text-lg gap-[40%] max-pad:text-base">
                <AiOutlineHeart />
                <AiOutlinePlus />
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default RecentPlayed;
