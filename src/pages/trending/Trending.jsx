import React, { useEffect, useContext, useState } from "react";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import axios from "axios";
import TrendingPlaylist from "../../components/TrendingPlaylist";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import { MdQueueMusic } from "react-icons/md";

const Trending = () => {
  const trendingReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  const [items, setItems] = useState([]);

  const handleMenu = () => {
    return trendingReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return trendingReducer.setSideNavMenu(false);;
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
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
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className="font-nunito not-italic text-white text-xl p-[2%] max-[550px]:text-medium max-lap:pt-[4%] max-lap:px-[2%]">
      <div className=" flex justify-start items-center gap-[3%] mt-[1.5%] mb-[3%]">
        <div
          ref={ref}
          className="hidden max-lap:block text-[2rem] max-tablet:text-lg "
        >
          <MdQueueMusic onClick={handleMenu} />
        </div>
        <h1 className=" text-white font-black">
          Trending Now
        </h1>
      </div>
      {items.map((trend) => (
        <div key={trend.id} className="  cursor-pointer mb-[3%]">
          <h3 className=" mr-auto text-bright_orange text-lg font-bold max-[550px]:text-base pb-[1%]">
            {trend.name}
          </h3>
          <TrendingPlaylist id={trend.id} token={token} />
        </div>
      ))}
      <div className=" h-[4.5rem]"></div>
    </div>
  );
};

export default React.memo(Trending);
