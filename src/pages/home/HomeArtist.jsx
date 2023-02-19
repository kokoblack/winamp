import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper";
import artist from "../../assets/profile1.jpg";

import "swiper/css";
// import "swiper/css/free-mode";

const HomeArtist = () => {
  return (
    <div className=" font-nunito not-italic bg-light_black py-[.5rem] px-[2%] w-[40%] h-[14rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto">
      <section className=" flex justify-center items-center text-white py-[1%] px-[3%] mb-2">
        <h3 className=" mr-auto text-lg font-bold max-[550px]:text-base ">
          Artist
        </h3>
        <div className=" ml-auto text-lg font-medium text-bright_orange max-[550px]:text-medium">
          <BsArrowRightCircle />
        </div>
      </section>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        mousewheel
        centeredSlides
        centeredSlidesBounds
        modules={[Mousewheel]}
        className="mySwiper h-[80%]"
      >
        {[1, 2, 3, 3, 2, 2, 1, 3, 2, 1].map(() => (
          <SwiperSlide className=" w-[30%] text-medium flex justify-center items-center flex-col text-white  max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-sm max-phone:w-[28%]">
            <img src={artist} className=" rounded-[100%] w-[5.5rem] h-[5.5rem] max-tablet:w-[4rem] max-tablet:h-[4rem] max-tablet:mb-1" />
            <p>name</p>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>irirnrirn</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default HomeArtist;
