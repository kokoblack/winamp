import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdQueueMusic } from "react-icons/md";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import GetArtistData from "../../components/GetArtistData";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import ArtistSearch from "../../components/ArtistSearch";
import MappedArtist from "../../components/MappedArtist";
import ArtistIsLoading from "../../components/ArtistIsLoading";

const Artists = () => {
  const artistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);
  const toggle = artistReducer.state.themeToggle;

  const [count, setCount] = useState(null);
  const [id, setId] = useState("3tVQdUvClmAT7URs9V3rsp");
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchArtist, setSearchArtist] = useState("");

  const filteredArtistOne = artist.filter((artist) => {
    return artist.name.toLowerCase().includes(searchArtist.toLowerCase());
  });

  const onSearchChange = (event) => {
    setSearchArtist(event.target.value);
  };

  const handleMenu = () => {
    return artistReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return artistReducer.setSideNavMenu(false);
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    setLoading(true);
    GetArtistData(token, setLoading, setArtist);
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
        const data = res.data.items.map((e) => {
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
    <div
      className={` font-nunito not-italic ${
        toggle ? " bg-dark_black text-white" : " bg-white text-dark_black"
      }  relative max-lap:h-screen`}
    >
      <section
        className={` px-[2%] py-[2%] ${
          toggle ? " bg-light_black" : " bg-[#F7F7F7]"
        } max-tablet:px-[4%] max-tablet:pt-[4%]`}
      >
        <section className=" flex justify-start items-center">
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
      </section>

      {loading && <ArtistIsLoading />}
      {!loading && (
        <section
          className={` px-[2%] pt-[2%] ${
            toggle ? " bg-dark_black" : " bg-white"
          } max-tablet:px-[4%] max-tablet:pt-[4%]`}
        >
          <MappedArtist
            filteredArtist={filteredArtistOne}
            count={count}
            setId={setId}
            setCount={setCount}
            loading={loadingTwo}
            album={album}
          />
        </section>
      )}

      <div
        className={`${toggle ? " bg-dark_black" : " bg-white"} h-[4.5rem]`}
      ></div>
    </div>
  );
};

export default React.memo(Artists);
