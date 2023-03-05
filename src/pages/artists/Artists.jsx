import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdQueueMusic, MdOutlineClose } from "react-icons/md";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import ArtistIsLoading from "../../components/ArtistIsLoading";
import RecommendedIsLoading from "../../components/RecommendedIsLoading";

const Artists = () => {
  const artistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  const [toggleShow, setToggleShow] = useState(true);
  const [count, setCount] = useState(null);
  const [count2, setCount2] = useState(null);
  const [id, setId] = useState("3tVQdUvClmAT7URs9V3rsp");
  const [album, setAlbum] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [toggleArtistSearch, setToggleArtistSearch] = useState(true);
  const [searchArtist, setSearchArtist] = useState("");
  const [searchFollowedArtist, setSearchFollowedArtist] = useState("");
  const [data, setData] = useState([]);

  const filteredArtistOne = artistReducer.state.artist.filter((artist) => {
    return artist.name.toLowerCase().includes(searchArtist.toLowerCase());
  });

  const filteredArtistTwo = data.filter((artist) => {
    return artist.name
      .toLowerCase()
      .includes(searchFollowedArtist.toLowerCase());
  });

  const onSearchChange = (event) => {
    toggleArtistSearch
      ? setSearchArtist(event.target.value)
      : setSearchFollowedArtist(event.target.value);
  };

  const handleMenu = () => {
    return artistReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return artistReducer.setSideNavMenu(false);
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    setLoadingOne(true);

    axios
      .get("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const artist = res.data.artists.items.map((e) => {
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

        artistReducer.dispatch({
          type: "SET_FOLLOWED_ARTIST",
          payload: uniqueData,
        });
        setData(uniqueData);
        setLoadingOne(false);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    setLoadingTwo(true);

    axios
      .get(
        `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const data =
          res.data.items.length > 11
            ? res.data.items.slice(0, 10).map((e) => {
                return {
                  id: e.id,
                  name: e.name,
                  image: e.images[0].url,
                  releaseDate: e.release_date,
                };
              })
            : res.data.items.map((e) => {
                return {
                  id: e.id,
                  name: e.name,
                  image: e.images[0].url,
                  releaseDate: e.release_date,
                };
              });

        const jsonObject = data.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const removeDuplicate = Array.from(uniqueSet).map(JSON.parse);
        setAlbum(removeDuplicate);

        setLoadingTwo(false);
      })
      .catch((err) => console.log(err));
  }, [token, id]);

  return (
    <div className=" font-nunito not-italic text-white relative ">
      <section className=" px-[2%] py-[2%] bg-light_black max-tablet:px-[4%] max-tablet:pt-[4%]">
        <section className=" flex justify-center items-center mb-[1%] max-tablet:mb-[3%]">
          <div className=" flex justify-center items-center gap-[10%] mb-[4%]">
            <div
              ref={ref}
              className="hidden mr-auto max-lap:block text-[2rem] max-[550px]:text-[7vw] "
            >
              <MdQueueMusic onClick={handleMenu} />
            </div>
            <h3 className=" text-xl font-semibold max-tablet:text-[5.2vw]">
              Artists
            </h3>
          </div>
          <div className="flex justify-center items-center ml-auto p-4 gap-[5%] bg-white text-dark_black rounded-l-[5rem] rounded-r-[5rem] h-[2.8rem] m-4 max-laptop:px-4 max-laptop:pt-2 max-laptop:pb-3 max-laptop:h-[2.2rem] max-tablet:hidden">
            <AiOutlineSearch className=" text-xl mt-[3%] max-[479px]:text-xsm " />
            <input
              onChange={onSearchChange}
              type="text"
              placeholder="search artist"
              className=" bg-[transparent] border-light_dark border-solid border-1 outline-none placeholder:font-nunito placeholder:not-italic placeholder:text-base placeholder:font-medium max-laptop:placeholder:text-sm max-laptop:w-[8rem] max-[479px]:text-xsm max-[479px]:w-[5rem] "
            />
          </div>

          <AiOutlineSearch className=" hidden max-tablet:block max-[550px]:text-[5vw] ml-auto" />
        </section>

        <section className=" text-sm text-white font-medium mb-[2%] max-tablet:mb-[4%]">
          <button
            onClick={() => {
              setToggleShow(true);
              setToggleArtistSearch(true);
            }}
            className={`px-[2%] py-[1%] rounded-xl text-center border-[1px] border-solid border-bright_orange mr-[2%] bg-${
              toggleShow && "bright_orange"
            } `}
          >
            Artist
          </button>
          <button
            onClick={() => {
              setToggleShow(false);
              setToggleArtistSearch(false);
            }}
            className={`px-[2%] py-[1%] rounded-xl text-center border-[1px] border-solid border-bright_orange mr-[2%] bg-${
              !toggleShow && "bright_orange"
            }`}
          >
            Followed Artist
          </button>
        </section>
      </section>

      <section className=" px-[2%] pt-[2%] bg-dark_black max-tablet:px-[4%] max-tablet:pt-[4%]">
        <section>
          {toggleShow ? (
            filteredArtistOne.map((artist, index) => (
              <div key={index}>
                <div className=" text-base cursor-pointer flex justify-start items-center gap-[4%] mb-[4%] text-white text-center max-tablet:text-base max-phone:text-sm ">
                  <img
                    onClick={() => {
                      setId(artist.id);
                      setCount(index);
                    }}
                    src={artist.image}
                    className=" rounded-[100%] w-[4.5rem] h-[4.5rem] max-phone:w-[4rem] max-phone:h-[4rem] max-tablet:mb-1"
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
                  {loadingTwo ? (
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
                          className=" cursor-pointer w-[15%] text-base text-white max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-sm max-phone:w-[28%]"
                        >
                          <img
                            src={artist.image}
                            className=" rounded-xl w-full mb-[3%] h-auto max-tablet:mb-1"
                          />
                          <p className=" text-sm font-semibold text-left mb-[3%] max-tablet:text-xsm ">
                            {artist.name}
                          </p>
                          <p className=" text-xsm font-medium text-grey text-left max-tablet:text-xxsm">
                            {artist.releaseDate}
                          </p>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>
            ))
          ) : loadingOne ? (
            <ArtistIsLoading />
          ) : (
            filteredArtistTwo.map((artist, index) => (
              <div key={index}>
                <div className=" text-base cursor-pointer flex justify-start items-center gap-[4%] mb-[4%] text-white text-center max-tablet:text-base max-phone:text-sm ">
                  <img
                    onClick={() => {
                      setId(artist.id);
                      setCount2(index);
                    }}
                    src={artist.image}
                    className=" rounded-[100%] w-[4.5rem] h-[4.5rem] max-phone:w-[4rem] max-phone:h-[4rem] max-tablet:mb-1"
                  />
                  <div className=" flex justify-start items-center gap-[4%] w-full">
                    <p>{artist.name}</p>
                    <MdOutlineClose
                      onClick={() => setCount2(-1)}
                      className={`${
                        count2 === index ? "block" : "hidden"
                      } right-[2%] top-0 text-bright_orange text-lg cursor-pointer`}
                    />
                  </div>
                </div>
                <div>
                  {loadingTwo ? (
                    <div
                      className={`${
                        count2 === index ? "flex" : "hidden"
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
                        count2 === index ? "block" : "hidden"
                      } mySwiper mb-[4%]`}
                    >
                      {album.map((artist, index) => (
                        <SwiperSlide
                          key={index}
                          className=" cursor-pointer w-[15%] text-base text-white max-[1000px]:w-[20%]  max-tablet:w-[25%] max-tablet:text-sm max-phone:w-[28%]"
                        >
                          <img
                            src={artist.image}
                            className=" rounded-xl w-full mb-[3%] h-auto max-tablet:mb-1"
                          />
                          <p className=" text-sm font-semibold text-left mb-[3%] max-tablet:text-xsm ">
                            {artist.name}
                          </p>
                          <p className=" text-xsm font-medium text-grey text-left max-tablet:text-xxsm">
                            {artist.releaseDate}
                          </p>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </section>
      <div className=" h-[4.5rem]"></div>
    </div>
  );
};

export default React.memo(Artists);
