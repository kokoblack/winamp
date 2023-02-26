import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";

function Recommended() {
  const recommendationReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  useEffect(() => {
    axios
      .get(
        "https://api.spotify.com/v1/recommendations?seed_artists=687cZJR45JO7jhk1LHIbgq,0Y3agQaa6g2r0YmHPOO9rh,3wcj11K77LjEY1PkEazffa&seed_genres=r-n-b,hip-hop",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const trackData = res.data.tracks.map((e) => {
          return {
            id: e.id,
            name: e.name,
            url: e.preview_url,
            artist: e.artists[0].name,
            image: e.album.images[0].url,
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

        recommendationReducer.dispatch({
          type: "RECOMMENDATION_DATA",
          payload: uniqueData,
        });
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className=" font-nunito not-italic text-white cursor-pointer">
      <h3 className=" mr-auto text-lg font-bold max-[550px]:text-base pb-[1%]">
        Recommended for you
      </h3>

      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        mousewheel
        centeredSlides
        centeredSlidesBounds
        modules={[Mousewheel]}
        className="mySwiper"
      >
        {recommendationReducer.state.recommendation.slice(0, 10).map((e) => (
          <SwiperSlide
            onClick={() => {
              recommendationReducer.dispatch({
                type: "SET_TRACK_LIST_URL",
                payload: recommendationReducer.state.recommendation.map(
                  (e) => e.url
                ),
              });
              recommendationReducer.dispatch({
                type: "SET_TRACK_DATA",
                payload: recommendationReducer.state.recommendation,
              });
              recommendationReducer.dispatch({
                type: "SET_PLAYER_STATE",
                payload: !recommendationReducer.state.updatePlayerSate,
              });
              recommendationReducer.dispatch({
                type: "SET_IS_PLAYING",
                payload: true,
              });
              recommendationReducer.dispatch({
                type: "GET_AUDIO_PLAYER_ARTIST",
                payload: e.artist,
              });
              recommendationReducer.dispatch({
                type: "GET_AUDIO_PLAYER_TITLE",
                payload: e.name,
              });
              recommendationReducer.dispatch({
                type: "GET_AUDIO_PLAYER_AUDIO",
                payload: e.url,
              });
              recommendationReducer.dispatch({
                type: "GET_AUDIO_PLAYER_IMAGE",
                payload: e.image,
              });
            }}
            key={e.id}
            className=" w-[15%] max-lap:w-[20%]  max-tablet:w-[25%] max-phone:w-[28%]"
          >
            <img
              src={e.image}
              className=" rounded-lg w-[8rem] h-auto mb-[3%]"
            />
            <p className=" text-sm max-tablet:text-xsm">{e.name}</p>
            <p className=" text-xsm text-grey max-tablet:text-xxsm">
              {e.artist}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default React.memo(Recommended);
