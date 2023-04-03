import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsPlayFill } from "react-icons/bs";
import { AppDispatchContext } from "../../App";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import RecommendedIsLoading from "../../components/RecommendedIsLoading";

function RecentPlayed() {
  const recentlyPlayedReducer = useContext(AppDispatchContext);
  const toggle = recentlyPlayedReducer.state.themeToggle;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=10&key=AIzaSyDg1A1tBfPOIL7OHMRFkw7KY3o0H68cDF8&maxResults=50",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const vid = res.data.items.map((e) => {
          return {
            id: e.id,
            image: e.snippet.thumbnails.medium.url,
            name: e.snippet.localized.title,
            artist: e.snippet.channelTitle,
          };
        });
        setVideos(vid);
        console.log(vid);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  }, []);

  return (
    <>
      <div
        className={` h-[12rem] font-nunito not-italic overflow-hidden ${
          toggle ? "bg-light_black text-white" : "bg-[#F7F7F7] text-dark_black"
        } py-[.5rem] w-[60%] rounded-2xl max-[1000px]:w-full max-lap:h-auto max-lap:mb-[2%]`}
      >
        <section
          className={` flex justify-center items-start ${
            toggle ? " text-white" : " text-dark_black"
          } px-[5%] py-[1%]`}
        >
          <h3 className=" mr-auto text-lg font-bold max-[550px]:text-medium">
            Videos
          </h3>
          <Link
            to="/recently"
            className=" ml-auto text-medium font-medium max-[550px]:text-base"
          >
            See all
          </Link>
        </section>

        <section>
          {loading ? (
            <div className=" flex justify-center items-center">
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
              className="mySwiper px-[4%]"
            >
              {videos.slice(0, 10).map((vid) => (
                <SwiperSlide
                  key={vid.id}
                  className=" text-left cursor-pointer w-[30%]  max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-base max-[300px]:w-[40%]"
                >
                  <div className=" relative">
                    <img
                      src={vid.image}
                      className=" rounded-lg w-[11rem] h-[5.5rem] mb-2"
                    />
                    <BsPlayFill className=" text-white text-xxl absolute top-1/2 left-1/2 ml-[-1.3125rem] mt-[-1.1125rem] " />
                  </div>
                  <p className=" text-base truncate ">{vid.name}</p>
                  <p className=" text-sm">{vid.artist}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>
      </div>
    </>
  );
}

export default RecentPlayed;
