import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import { MdQueueMusic } from "react-icons/md";
import { Link } from "react-router-dom";
import PlaylistIsLoading from "../../components/PlaylistIsLoading";

const Playlists = () => {
  const playlistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);
  const toggle = playlistReducer.state.themeToggle;

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMenu = () => {
    return playlistReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return playlistReducer.setSideNavMenu(false);
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.items.map((e) => {
          return {
            description: e.description,
            name: e.name,
            id: e.id,
            image: e.images[0].url,
          };
        });
        setPlaylist(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className={`font-nunito not-italic ${toggle ? "bg-dark_black text-white" : "bg-white text-dark_black"}  text-xl p-[2%] max-[550px]:text-[5.2vw] max-lap:pt-[4%] max-lap:px-[4%]`}>
      <div className=" flex justify-start items-center gap-[3%] mt-[1.5%] mb-[3%]">
        <div
          ref={ref}
          className="hidden max-lap:block text-[2rem] max-[550px]:text-[7vw] "
        >
          <MdQueueMusic onClick={handleMenu} />
        </div>
        <h1 className=" font-black">Playlist</h1>
      </div>
      <div className={`${toggle ? " bg-dark_black" : " bg-white"} flex justify-start flex-wrap items-center gap-x-[2.5%] gap-y-[30%] mt-[5%]`}>
        {loading ? (
          <PlaylistIsLoading />
        ) : (
          playlist.map((e) => (
            <Link
              onClick={() => {
                playlistReducer.dispatch({
                  type: "GET_IMAGE_SRC",
                  payload: e.image,
                });
                playlistReducer.dispatch({
                  type: "GET_ID",
                  payload: e.id,
                });
                playlistReducer.dispatch({
                  type: "GET_DESCRIPTION",
                  payload: e.description,
                });
              }}
              to="/songs"
              key={e.id}
              className=" w-[23%] max-lap:w-[31.5%] max-tablet:w-[48.5%] mb-[3%]"
            >
              <img
                src={e.image}
                className=" rounded-lg w-[100%] h-auto mb-[3%]"
              />
              <p className=" text-medium max-tablet:text-sm">{e.name}</p>
            </Link>
          ))
        )}
      </div>
      <div className={`${toggle ? " bg-dark_black" : " bg-white"} h-[6rem] max-lap:h-[20rem] max-tablet:h-[20rem]`}></div>
    </div>
  );
};

export default Playlists;
