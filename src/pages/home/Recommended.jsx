import cover from '../../assets/the_weekend.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import {  Mousewheel } from "swiper";
import "swiper/css";

function Recommended() {
  return (
    <div className=' font-nunito not-italic text-white'>
      <h3 className=" mr-auto text-lg font-bold max-[550px]:text-base pb-[1%]">
        Recommended for you
      </h3>

      <Swiper
        slidesPerView="auto"
        spaceBetween={25}
        mousewheel
        centeredSlides
        centeredSlidesBounds
        modules={[Mousewheel]}
        className="mySwiper h-[80%]"
      >
        {[1, 2, 3, 3, 2, 2, 1, 3, 2, 1].map(() => (
          <SwiperSlide className=" w-[15%] max-lap:w-[20%]  max-tablet:w-[25%] max-phone:w-[28%]">
            <img src={cover} className=" rounded-lg w-[10rem] h-auto mb-[3%]" />
            <p className=' text-medium max-lap:text-base max-tablet:text-xsm'>Title</p>
            <p className=' text-base max-lap:text-sm max-tablet:text-xxsm'>Name</p>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>irirnrirn</SwiperSlide> */}
      </Swiper>
    </div>
  );
}

export default Recommended;
