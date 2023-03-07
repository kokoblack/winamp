import { useContext, useEffect, useState } from "react";
import axios from "axios";
import RecentlyPlayedIsLoading from "../../components/RecentlyPlayedIsLoading";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { Link } from "react-router-dom";
import RecentlyPlayedSongs from "../../components/RecentlyPlayedSongs";

function RecentPlayed() {
  const recentlyPlayedReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  const [song, setSong] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shuffleSong, setShuffleSong] = useState([]);

  const toggle = recentlyPlayedReducer.state.themeToggle;

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
      <div className={` font-nunito not-italic overflow-hidden ${toggle ? "bg-light_black" : "bg-[#F7F7F7]"} py-[.5rem] w-[60%] h-[12rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto max-lap:mb-[2%]`}>
        <section className={` flex justify-center items-center ${toggle ? " text-white" : " text-dark_black"} px-[5%] py-[1%] mb-[2%]`}>
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
            <section>
              <RecentlyPlayedSongs
                action={recentlyPlayedReducer}
                shuffleSong={shuffleSong}
                song={song}
                start={0}
                end={2}
              />
            </section>

            <section className=" hidden max-pad:block">
              <RecentlyPlayedSongs
                action={recentlyPlayedReducer}
                shuffleSong={shuffleSong}
                song={song}
                start={2}
                end={5}
              />
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default RecentPlayed;
