import { useEffect, useContext, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        "https://api.spotify.com/v1/artists?ids=3tVQdUvClmAT7URs9V3rsp,687cZJR45JO7jhk1LHIbgq,0Y3agQaa6g2r0YmHPOO9rh,3wcj11K77LjEY1PkEazffa,3zaDigUwjHvjOkSn0NDf9x,6LuN9FCkKOj5PcnpouEgny,66CXWjxzNUsdJxJ2JdwvnR,0hCNtLu0JehylgoiP8L4Gh,7tYKF4w9nC0nq9CsPZTHyP,5ZS223C6JyBfXasXxrRqOk,2gzWmhOZhDN6gXL49JW9qj,2gzWmhOZhDN6gXL49JW9qj,6qqNVTkY8uBg9cP3Jd7DAH,0du5cEVh5yTK9QJze8zA0C,6vWDO969PvNqNYHIOW5v0m,2YZyLoL8N0Wb9xBt1NhZWg,7dGJo4pcD2V6oG8kP0tJRR,3ZpEKRjHaHANcpk10u6Ntq,687cZJR45JO7jhk1LHIbgq,5yOvAmpIR7hVxiS6Ls5DPO,75VKfyoBlkmrJFDqo1o2VY,3TVXtAsR1Inumwj472S9r4,6eUKZXaKkcviH0Ku9w2n3V,1Xyo4u8uXC1ZmMpatF05PJ,4dpARuHxo51G3z768sgnrY,5WUlDfRSoLAfcVSX1WnrxN,0X2BH1fck6amBIoJhDVmmJ,2wUjUUtkb5lvLKcGKsKqsR,4nDoRrQiYLoBzwC5BhVJzF,0ZED1XzwlLHW4ZaG4lOT6m,0C8ZW7ezQVs4URX5aX7Kqx,26VFTg2z8YR0cCuwLzESi2,2wY79sveU1sp5g7SokKOiI,1uNFoZAHBGtllmzznpCI3s,5K4W6rqBFWDnAN6FQUkS6x,4kYGAK2zu9EAomwj3hXkXy,7bXgB6jMjp9ATFy66eO08Z,6l3HvQ5sa6mXTsMTB19rO5,5pKCCKE2ajJHZ9KAiaK11H",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const artist = res.data.artists.map((e) => {
          return {
            id: e.id,
            name: e.name,
            image: e.images[0].url,
            followers: e.followers,
          };
        });

        const jsonObject = artist.map(JSON.stringify);
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

        homeArtistReducer.dispatch({
          type: "SET_ARTIST",
          payload: uniqueData,
        });

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div
      className={` font-nunito not-italic ${
        toggle ? "bg-light_black text-white" : "bg-[#F7F7F7] text-dark_black"
      } py-[.5rem] px-[2%] w-[40%] h-[12rem] rounded-2xl max-[1000px]:w-full max-lap:h-auto`}
    >
      <section className=" flex justify-center items-center py-[1%] px-[3%] mb-[2%]">
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
          {homeArtistReducer.state.artist.slice(0, 10).map((artist) => (
            <SwiperSlide
              key={artist.id}
              className=" cursor-pointer w-[30%] text-base flex justify-start items-center flex-col text-center max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-base max-[300px]:w-[40%]"
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
