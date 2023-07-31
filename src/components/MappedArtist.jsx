import React from "react";
import { MdOutlineClose } from "react-icons/md";
import RecommendedIsLoading from "./RecommendedIsLoading"
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { useContext } from "react";
import { AppDispatchContext } from "../App";

const MappedArtist = ({filteredArtist, count, setId, setCount, loading, album }) => {
  const mappedArtistReducer = useContext(AppDispatchContext)
  const toggle = mappedArtistReducer.state.themeToggle

  return (
    <>
      {filteredArtist.map((artist, index) => (
        <div key={index}>
          <div className={` text-base cursor-pointer flex justify-start items-center gap-[4%] ${toggle? "text-white" : "text-dark_black" } text-center max-tablet:text-base max-phone:text-sm `}>
            <img
              onClick={() => {
                setId(artist.id);
                setCount(index);
              }}
              src={artist.image}
              className=" rounded-[100%] w-[5rem] h-[4rem] max-phone:w-[4.5rem] max-phone:h-[3.5rem] max-tablet:mb-1"
            />
            <div className=" flex justify-start items-center gap-[4%] w-full">
              <p>{artist.name}</p>
              <MdOutlineClose
                onClick={() => setCount(-1)}
                className={`${
                  count === index ? "block" : "hidden"
                } right-[2%] top-0 text-bright_orange text-lg cursor-pointer`}
              />
            </div>
          </div>
          <div>
            {loading ? (
              <div
                className={`${
                  count === index ? "flex" : "hidden"
                } justify-center items-center gap-[3%] mb-[4%]`}
              >
                {" "}
                <RecommendedIsLoading />{" "}
              </div>
            ) : (
              <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                mousewheel
                centeredSlides
                centeredSlidesBounds
                modules={[Mousewheel]}
                className={`${
                  count === index ? "block" : "hidden"
                } mySwiper mb-[4%]`}
              >
                {album.map((artist, index) => (
                  <SwiperSlide
                    key={index}
                    className=" cursor-pointer w-[15%] text-base max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-sm max-phone:w-[28%]"
                  >
                    <img
                      src={artist.image}
                      className=" rounded-xl w-full mb-[3%] h-auto max-tablet:mb-1"
                    />
                    <p className=" text-sm font-semibold text-left mb-[3%] max-tablet:text-xsm ">
                      {artist.name}
                    </p>
                    <p className={` text-xsm font-medium ${toggle? "text-grey" : "text-light_black" } text-left max-tablet:text-xxsm`}>
                      {artist.releaseDate}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default MappedArtist;
