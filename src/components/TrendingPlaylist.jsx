import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { AppDispatchContext } from "../App";
import { Link } from "react-router-dom";

const TrendingPlaylist = ({ id, token }) => {
  const trendingPlaylistReducer = useContext(AppDispatchContext);

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/browse/categories/${id}/playlists `, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.playlists.items.map((e) => {
          return {
            description: e.description,
            name: e.name,
            id: e.id,
            image: e.images[0].url,
          };
        });
        setPlaylist(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className=" font-nunito not-italic text-white cursor-pointer">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        mousewheel
        centeredSlides
        centeredSlidesBounds
        modules={[Mousewheel]}
        className="mySwiper"
      >
        {playlist.length > 10
          ? playlist.slice(0, 10).map((e) => (
              <SwiperSlide
                key={e.id}
                className=" w-[15%] max-lap:w-[25%]  max-tablet:w-[40%] max-phone:w-[45%]"
              >
                <Link
                  onClick={() => {
                    trendingPlaylistReducer.dispatch({
                      type: "GET_IMAGE_SRC",
                      payload: e.image,
                    });
                    trendingPlaylistReducer.dispatch({
                      type: "GET_ID",
                      payload: e.id,
                    });
                    trendingPlaylistReducer.dispatch({
                      type: "GET_DESCRIPTION",
                      payload: e.description,
                    });
                  }}
                  to="/songs"
                >
                  <img
                    src={e.image}
                    className=" rounded-lg w-[100%] h-auto mb-[3%]"
                  />
                  <p className=" text-medium max-tablet:text-sm">{e.name}</p>
                </Link>
              </SwiperSlide>
            ))
          : playlist.map((e) => (
              <SwiperSlide
                key={e.name}
                className=" w-[15%] max-lap:w-[20%]  max-tablet:w-[40%] max-phone:w-[45%]"
              >
                <Link
                  onClick={() => {
                    trendingPlaylistReducer.dispatch({
                      type: "GET_IMAGE_SRC",
                      payload: e.image,
                    });
                    trendingPlaylistReducer.dispatch({
                      type: "GET_ID",
                      payload: e.id,
                    });
                    trendingPlaylistReducer.dispatch({
                      type: "GET_DESCRIPTION",
                      payload: e.description,
                    });
                  }}
                  to="/songs"
                >
                  <img
                    src={e.image}
                    className=" rounded-lg w-[100%] h-auto mb-[3%]"
                  />
                  <p className=" text-medium max-tablet:text-sm">{e.name}</p>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default React.memo(TrendingPlaylist);
