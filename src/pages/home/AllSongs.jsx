import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { CloseOutsideMenu } from "../../components/CloseOutsideMenu";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import pic2 from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdQueueMusic } from "react-icons/md";
import { BiCast } from "react-icons/bi";

function AllSongs() {
  const token = useContext(RefreshTokenContext);
  const allsongs = useContext(AppDispatchContext);
  const query = "browse/featured-playlists";

  const [publicPlaylists, setPublicPlaylists] = useState([]);
  const [count, setCount] = useState(0);
  const [searchToggle, setSearchToggle] = useState(false);
  const [MobileSearchToggle, setMobileSearchToggle] = useState(false);
  const [text, setText] = useState("");
  const [allSearchData, setAllSearchData] = useState([]);
  const timeoutRef = useRef(null);

  const images = publicPlaylists.slice(0, 5).map((e) => e.images[0].url);
  const namesOfPlaylists = publicPlaylists.slice(0, 5).map((e) => e.name);
  const tracks = publicPlaylists.slice(0, 5).map((e) => e.tracks.total);
  const description = publicPlaylists.slice(0, 5).map((e) => e.description);
  const id = publicPlaylists.slice(0, 5).map((e) => e.id);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const handleMenu = () => {
    return allsongs.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return allsongs.setSideNavMenu(false);
  };

  const handleLinkClick = () => {
    allsongs.dispatch({ type: "GET_IMAGE_SRC", payload: images[count] });
    allsongs.dispatch({ type: "GET_ID", payload: id[count] });
    allsongs.dispatch({ type: "GET_DESCRIPTION", payload: description[count] });
    allsongs.dispatch({ type: "GET_TRACK_TOTAL", payload: tracks[count] });
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCount((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [count]);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/${query}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const jsonObject = res.data.playlists.items.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const removeDuplicate = Array.from(uniqueSet).map(JSON.parse);

        const uniqueData = [];
        removeDuplicate.forEach((e) => {
          if (e === null) {
            null;
          } else {
            uniqueData.push(e);
          }
        });
        setPublicPlaylists(uniqueData);
      })
      .catch((err) => console.log(err));
  }, [token, query]);

  useEffect(() => {
    axios
      .get(
        `https://api.spotify.com/v1/search?include_external=audio&q=${text}&type=album,track,artist`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const album = res.data.albums.items.slice(0, 6).map((e) => {
          return {
            id: e.id,
            name: e.name,
            artist: e.artists[0].name,
            releaseDate: e.release_date.substring(0, 4),
            image: e.images[0].url,
            type: e.type,
          };
        });

        allsongs.dispatch({
          type: "SET_SEARCH_ALBUM",
          payload: album,
        });

        const artist = [];
        res.data.artists.items.slice(0, 6).forEach((e) => {
          if (e.images.length === 0) {
            null;
          } else {
            artist.push({
              id: e.id,
              name: e.name,
              image: e.images[0].url,
              type: e.type,
            });
          }
        });

        allsongs.dispatch({
          type: "SET_SEARCH_ARTIST",
          payload: artist,
        });

        const tracks = res.data.tracks.items.slice(0, 8).map((e) => {
          return {
            id: e.id,
            name: e.name,
            artist: e.artists[0].name,
            url: e.preview_url,
            image: e.album.images[0].url,
            type: e.type,
          };
        });

        const uniqueTrackData = [];
        tracks.forEach((e) => {
          if (e.url === null) {
            null;
          } else {
            uniqueTrackData.push(e);
          }
        });

        allsongs.dispatch({
          type: "SET_SEARCH_TRACKS",
          payload: uniqueTrackData,
        });

        const allData = [...album, ...artist, ...uniqueTrackData].sort(
          () => Math.random() - 0.5
        );

        allsongs.dispatch({
          type: "SET_SEARCH_ALL_DATA",
          payload: allData,
        });
        setAllSearchData(allData);
      })
      .catch((err) => console.log(err));
  }, [token, text]);

  return (
    <div
      style={{ backgroundImage: `url(${images[count]})` }}
      className="w-full bg-[image:var(--image-url)] bg-cover bg-center bg-[blue] px-[2%] pt-3 pb-4   transition-all ease-in duration-[3000]"
    >
      <section className="w-full flex justify-end items-center max-tablet:mb-[5%] max-tablet:mt-[2%] max-[700px]:">
        <div
          ref={ref}
          className={`hidden text-[2rem] mr-auto ${
            MobileSearchToggle ? "max-[700px]:hidden" : "max-[700px]:block"
          } max-lap:block  `}
        >
          <MdQueueMusic onClick={handleMenu} />
        </div>
        <div
          className={` relative flex justify-start items-center p-4 bg-light_black ${
            searchToggle ? null : "rounded-l-[5rem]"
          } ${searchToggle ? null : "rounded-r-[5rem]"} ${
            searchToggle ? "rounded-t-2xl" : null
          }  w-[50%] h-[2.8rem] max-[700px]:w-full  max-[700px]:my-4 max-[700px]:mx-0 max-[700px]:h-[2.8rem] ${
            MobileSearchToggle ? "max-[700px]:block" : "max-[700px]:hidden"
          } m-4 max-laptop:px-4 max-laptop:pt-2 max-laptop:pb-3 max-laptop:h-[2.2rem] `}
        >
          <AiOutlineSearch className=" mt-[1%] text-[#C0BFBF] max-laptop:text-sm max-[700px]:text-lg max-[700px]:absolute max-[700px]:top-[25%] max-[700px]:left-[5%] max-[500px]:top-[30%] max-[300px]:top-[25%]" />
          <input
            onChange={(event) => {
              setSearchToggle(true);
              setText(event.target.value);
            }}
            type="text"
            placeholder="search artists, albums, tracks"
            className=" w-full text-[#C0BFBF] bg-[transparent] border-light_dark outline-none border-solid border-1 ml-2 placeholder:font-nunito placeholder:not-italic placeholder:text-base placeholder:font-medium max-laptop:placeholder:text-sm max-[700px]:absolute max-[700px]:top-[25%] max-[700px]:left-[10%] max-[700px]:w-[80%] max-[320px]:left-[12%] max-[300px]:top-[20%]"
          />

          {searchToggle && (
            <div className="font-nunito not-italic z-20 absolute top-[90%] right-0 rounded-b-2xl w-full bg-light_black text-white">
              {allSearchData.slice(0, 8).map((data) => (
                <div key={data.id} className=" w-full">
                  {data.type === "album" && (
                    <div
                      onClick={() => {
                        setMobileSearchToggle(false);
                        setSearchToggle(false);
                        setText("");
                      }}
                      className=" w-full px-4 py-2 flex justify-start items-center gap-[4%] hover:bg-[#EC625F66] cursor-pointer"
                    >
                      <img
                        src={data.image}
                        alt="cover album"
                        className="w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
                      />
                      <div className=" w-full">
                        <p className=" text-white text-sm mb-[1%] max-tablet:text-[.7rem]">
                          {data.name}
                        </p>
                        <div className=" w-full flex justify-start items-center gap-[1%] text-grey text-xsm">
                          <p>{data.type}</p>
                          <p>•</p>
                          <p>{data.artist}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.type === "track" && (
                    <div
                      onClick={() => {
                        setMobileSearchToggle(false);
                        setSearchToggle(false);
                        setText("");
                      }}
                      className="w-full px-4 py-2 font-nunito not-italic flex justify-start items-center gap-[4%] hover:bg-[#EC625F66] cursor-pointer"
                    >
                      <img
                        src={data.image}
                        alt="cover track"
                        className="w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem]"
                      />
                      <div className=" w-full">
                        <p className=" text-white text-sm mb-[1%] max-tablet:text-[.7rem] ">
                          {data.name}
                        </p>
                        <div className=" flex justify-start items-center gap-[1%] text-grey text-xsm">
                          <p>{data.type}</p>
                          <p>•</p>
                          <p>{data.artist}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.type === "artist" && (
                    <div
                      onClick={() => {
                        setMobileSearchToggle(false);
                        setSearchToggle(false);
                        setText("");
                      }}
                      className="w-full px-4 py-2 font-nunito not-italic flex justify-start items-center gap-[4%] hover:bg-[#EC625F66] cursor-pointer"
                    >
                      <img
                        src={data.image}
                        alt="cover album"
                        className=" rounded-full w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem] "
                      />
                      <div className=" w-full">
                        <p className=" text-white text-sm mb-[1%] max-tablet:text-[.7rem]">
                          {data.name}
                        </p>
                        <p className="text-grey text-xsm">{data.type}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link className=" text-white px-4 pb-2 pt-1 flex justify-end items-center text-sm hover:text-bright_orange">
                See All
              </Link>
            </div>
          )}
        </div>
        <AiOutlineSearch
          onClick={() => setMobileSearchToggle(true)}
          className={`hidden text-nl ${
            MobileSearchToggle ? "max-[700px]:hidden" : "max-[700px]:block"
          } text-lg`}
        />
        <Link
          to="trending"
          className={`ml-[1%] text-nl max-tablet:ml-[2%] ${
            MobileSearchToggle ? "max-[700px]:hidden" : "max-[700px]:block"
          }`}
        >
          <BiCast />
        </Link>
        <IoMdNotificationsOutline
          className={`ml-[2%] text-nl ${
            MobileSearchToggle ? "max-[700px]:hidden" : "max-[700px]:block"
          }`}
        />
        <img
          src={pic2}
          className={`ml-[2%] h-8 w-8 rounded-[100%] ${
            MobileSearchToggle ? "max-[700px]:hidden" : "max-[700px]:block"
          }`}
        />
      </section>

      <section
        onClick={() => {
          setMobileSearchToggle(false);
          setSearchToggle(false);
        }}
      >
        <h3 className="font-nunito not-italic text-xl font-medium text-white mb-[3%] max-[500px]:text-base  max-[479px]:mb-[1%] ">
          TRENDING PLAYLISTS
        </h3>
        <h1 className="font-raleway not-italic text-xxl font-black text-white max-[500px]:text-[1.9rem] max-tablet:mb-2 max-tablet:mt-3 ">
          {namesOfPlaylists[count]}
        </h1>
        <div className="flex justify-start items-center gap-8 mb-6">
          <p className="font-nunito not-italic text-medium font-medium text-white max-[500px]:text-sm ">
            Tracks
          </p>
          <p className="font-nunito not-italic text-medium font-medium text-white max-[500px]:text-sm ">
            {tracks[count]}
          </p>
        </div>
        <div>
          <Link
            onClick={handleLinkClick}
            to="/songs"
            className="font-nunito not-italic text-medium font-semibold px-4 py-2 rounded-xl text-white bg-bright_orange mr-2 max-[850px]:text-base"
          >
            {" "}
            Listen Now{" "}
          </Link>
        </div>
      </section>

      <section className="flex gap-1 justify-center items-center my-4">
        {[1, 2, 3, 4, 5].map((e, i) => (
          <div
            key={e}
            onClick={() => {
              setCount(i);
            }}
            className={`w-3 h-3 bg-${
              count === i ? "bright_orange" : "light_black"
            } rounded-[100%] m-1 max-[479px]:w-2 max-[479px]:h-2 max-[479px]:wx-1 max-[479px]:wy-2 cursor-pointer `}
          ></div>
        ))}
      </section>
    </div>
  );
}

export default React.memo(AllSongs);
