import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdQueueMusic } from "react-icons/md";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import ArtistIsLoading from "../../components/ArtistIsLoading";
import ArtistSearch from "../../components/ArtistSearch";
import MappedArtist from "../../components/MappedArtist";

const Artists = () => {
  const artistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);
  const toggle = artistReducer.state.themeToggle

  const [toggleShow, setToggleShow] = useState(true);
  const [count, setCount] = useState(null);
  const [count2, setCount2] = useState(null);
  const [id, setId] = useState("3tVQdUvClmAT7URs9V3rsp");
  const [album, setAlbum] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
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
    <div className={` font-nunito not-italic ${toggle? " bg-dark_black text-white" : " bg-white text-dark_black" }  relative max-lap:h-screen`}>
      <section className={` px-[2%] py-[2%] ${toggle? " bg-light_black" : " bg-[#F7F7F7]" } max-tablet:px-[4%] max-tablet:pt-[4%]`}>
        <section className=" flex justify-start items-center mb-[3%] max-tablet:mb-[5%]">
          <div className=" flex justify-center items-center gap-[10%] ">
            <div
              ref={ref}
              className={`hidden ${
                searchToggle ? " max-tablet:hidden" : " max-lap:block"
              } mr-auto  text-[2rem] max-[550px]:text-[7vw] `}
            >
              <MdQueueMusic onClick={handleMenu} />
            </div>
            <h3
              className={`${
                searchToggle ? "hidden" : "block"
              } text-xl font-semibold max-tablet:text-[5.2vw]`}
            >
              Artists
            </h3>
          </div>

          <div className=" max-tablet:hidden ml-auto">
            <ArtistSearch {...{ onSearchChange }} />
          </div>

          <AiOutlineSearch
            onClick={() => setSearchToggle(true)}
            className={` hidden ${
              searchToggle ? "max-tablet:hidden" : "max-tablet:block"
            } max-[550px]:text-[5vw] ml-auto`}
          />

          {searchToggle && (
            <div className=" w-full">
              <ArtistSearch {...{ onSearchChange }} />
            </div>
          )}
        </section>

        <section
          onClick={() => setSearchToggle(false)}
          className=" text-sm font-medium mb-[2%] max-tablet:mb-[4%]"
        >
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

      <section className={` px-[2%] pt-[2%] ${toggle? " bg-dark_black" : " bg-white" } max-tablet:px-[4%] max-tablet:pt-[4%]`}>
        <section>
          {toggleShow ? (
            <MappedArtist
              filteredArtist={filteredArtistOne}
              count={count}
              setId={setId}
              setCount={setCount}
              loading={loadingTwo}
              album={album}
            />
          ) : loadingOne ? (
            <ArtistIsLoading />
          ) : (
            <MappedArtist
              filteredArtist={filteredArtistTwo}
              count={count2}
              setId={setId}
              setCount={setCount2}
              loading={loadingTwo}
              album={album}
            />
          )}
        </section>
      </section>
      <div className=" h-[4.5rem]"></div>
    </div>
  );
};

export default React.memo(Artists);
