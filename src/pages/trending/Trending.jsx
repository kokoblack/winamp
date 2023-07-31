import React, { useEffect, useContext, useState } from "react";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import axios from "axios";
import TrendingPlaylist from "../../components/TrendingPlaylist";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import { MdQueueMusic } from "react-icons/md";
import RecommendedIsLoading from "../../components/RecommendedIsLoading";

const Trending = () => {
  const trendingReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);
  const toggle = trendingReducer.state.themeToggle;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMenu = () => {
    return trendingReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return trendingReducer.setSideNavMenu(false);
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.spotify.com/v1/browse/categories`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = [];
        res.data.categories.items.forEach((e) => {
          if (
            e.name === "Trending" ||
            e.name === "Dance/Electronic" ||
            e.name === "Party" ||
            e.name === "Mood" ||
            e.name === "Chill" ||
            e.name === "R&B" ||
            e.name === "Hip-Hop" ||
            e.name === "Pop" ||
            e.name === "Afro" ||
            e.name === "Top Lists"
          ) {
            data.push({ name: e.name, id: e.id });
          } else {
            null;
          }
        });
        trendingReducer.dispatch({
          type: "SET_TRENDING_DATA",
          payload: data,
        });
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className={` min-h-screen font-nunito not-italic text-xl p-[2%] ${toggle ? "bg-dark_black text-white" : "bg-white text-dark_black"}  max-[550px]:text-[5.2vw] max-lap:pt-[4%] max-lap:px-[2%]`}>
      <div className=" flex justify-start items-center gap-[3%] mt-[1.5%] mb-[3%]">
        <div
          ref={ref}
          className="hidden max-lap:block text-[2rem] max-[550px]:text-[7vw] "
        >
          <MdQueueMusic onClick={handleMenu} />
        </div>
        <h1 className=" font-black">Trending Now</h1>
      </div>
      {loading
        ? [1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
            <div key={e} className=' w-full mb-[3%]'>
              <div className=" flex justify-center items-center"> <RecommendedIsLoading /> </div>
            </div>
          ))
        : items.map((trend) => (
            <div key={trend.id} className="  cursor-pointer mb-[3%]">
              <h3 className=" mr-auto text-bright_orange text-lg font-bold max-[550px]:text-medium pb-[1%]">
                {trend.name}
              </h3>
              <TrendingPlaylist id={trend.id} token={token} />
            </div>
          ))}
      <div className={`${toggle ? " bg-dark_black" : " bg-white"} h-[3rem]`}></div>
    </div>
  );
};

export default React.memo(Trending);
