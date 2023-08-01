import { useEffect, useContext, useState } from "react";
import axios from "axios";
import GetArtistData from "../../components/GetArtistData";
import HomeArtistIsLoading from "../../components/HomeArtistIsLoading";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import { BsArrowRightCircle } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { Link } from "react-router-dom";

const HomeArtist = () => {
  const homeArtistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);
  const toggle = homeArtistReducer.state.themeToggle;

  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    setLoading(true);

    GetArtistData(token, setLoading, setArtist);
  }, [token]);

  return (
    <div
      className={` font-nunito not-italic ${
        toggle ? "bg-light_black text-white" : "bg-[#F7F7F7] text-dark_black"
      } py-[.5rem] px-[2%] w-[40%] h-[12rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto`}
    >
      <section className=" flex justify-center items-center py-[1%] px-[3%]">
        <h3 className=" mr-auto text-lg font-bold max-[550px]:text-medium ">
          Artist
        </h3>
        <div className=" ml-auto text-lg font-medium max-[550px]:text-medium">
          <Link
            onClick={() =>
              homeArtistReducer.dispatch({
                type: "SET_SIDE_NAV_LINK",
                payload: 3,
              })
            }
            to="/artists"
          >
            <BsArrowRightCircle />
          </Link>
        </div>
      </section>

      {loading ? (
        <HomeArtistIsLoading />
      ) : (
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          mousewheel
          centeredSlides
          centeredSlidesBounds
          modules={[Mousewheel]}
          className="mySwiper h-[80%]"
        >
          {artist.slice(0, 10).map((artist) => (
            <SwiperSlide
              key={artist.id}
              className=" cursor-pointer w-[30%] text-base flex justify-center items-center flex-col text-center max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-base max-[300px]:w-[40%]"
            >
              <img
                src={artist.image}
                className=" rounded-[100%] w-[5rem] h-[5rem] mb-2"
              />
              <p>{artist.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HomeArtist;
