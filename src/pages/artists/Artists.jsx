import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdQueueMusic } from "react-icons/md";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import SideNav from "../../components/SideNav";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";

const Artists = () => {
  const artistReducer = useContext(AppDispatchContext);
  const token = useContext(RefreshTokenContext);

  const [toggleShow, setToggleShow] = useState(true);
  const [menu, setMenu] = useState(false);

  const handleMenu = useCallback(() => {
    setMenu(true);
  }, [menu]);

  const handleClickOutside = useCallback(() => {
    setMenu(false);
  }, [menu]);

  const ref = CloseOutsideMenu(handleClickOutside);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
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
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className=" font-nunito not-italic bg-light_black text-white relative ">
      <section className=" px-[2%] pt-[2%] max-tablet:px-[4%] max-tablet:pt-[4%]">
        <section className=" flex justify-center items-center mb-[1%] max-tablet:mb-[3%]">
          <div className=" flex justify-center items-center gap-[10%]">
            <div
              ref={ref}
              className="hidden mr-auto max-lap:block text-[2rem] max-tablet:text-lg "
            >
              <MdQueueMusic onClick={handleMenu} />
            </div>
            <h3 className=" text-xl font-semibold max-tablet:text-base">
              Artists
            </h3>
          </div>
          <div className="flex justify-center items-center ml-auto p-4 gap-[5%] bg-white text-dark_black rounded-l-[5rem] rounded-r-[5rem] h-[2.8rem] m-4 max-laptop:px-4 max-laptop:pt-2 max-laptop:pb-3 max-laptop:h-[2.2rem] max-tablet:hidden">
            <AiOutlineSearch className=" text-lg  mt-[3%]  max-[479px]:text-xsm " />
            <input
              type="text"
              placeholder="search artist"
              className=" bg-[transparent] border-light_dark border-solid border-1 outline-none placeholder:font-nunito placeholder:not-italic placeholder:text-base placeholder:font-medium max-laptop:placeholder:text-sm max-laptop:w-[8rem] max-[479px]:text-xsm max-[479px]:w-[5rem] "
            />
          </div>

          <AiOutlineSearch className=" hidden max-tablet:block text-lg ml-auto" />

          {menu && (
            <div className="hidden absolute h-screen top-0 left-0 w-[20%] bg-gradient-to-r from-[#201c1c] to-[#171616]  max-lap:block z-10 box-content max-pad:w[30%] max-[650px]:w-[35%] max-[330px]:w-[45%] ">
              <SideNav />
            </div>
          )}
        </section>

        <section className="text-sm text-white font-medium max-tablet:text-xxsm mb-[2%] max-tablet:mb-[4%]">
          <button
            onClick={() => setToggleShow(true)}
            className={`px-[2%] py-[1%] rounded-xl text-center border-[1px] border-solid border-bright_orange mr-[2%] bg-${
              toggleShow && "bright_orange"
            } `}
          >
            Artist
          </button>
          <button
            onClick={() => setToggleShow(false)}
            className={`px-[2%] py-[1%] rounded-xl text-center border-[1px] border-solid border-bright_orange mr-[2%] bg-${
              !toggleShow && "bright_orange"
            }`}
          >
            Followed Artist
          </button>
        </section>

        <section>
          {toggleShow &&
            artistReducer.state.artist.map((artist) => (
              <div
                key={artist.id}
                className=" text-base flex justify-start items-center gap-[4%] mb-[4%] text-white text-center max-tablet:text-xsm "
              >
                <img
                  src={artist.image}
                  className=" rounded-[100%] w-[4.5rem] h-[4.5rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem] max-tablet:mb-1"
                />
                <p>{artist.name}</p>
              </div>
            ))}
        </section>

        <section>
          {!toggleShow &&
            artistReducer.state.followedArtist.map((artist) => (
              <div
                key={artist.id}
                className=" text-base flex justify-start items-center gap-[4%] mb-[4%] text-white text-center max-tablet:text-xsm "
              >
                <img
                  src={artist.image}
                  className=" rounded-[100%] w-[4.5rem] h-[4.5rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem] max-tablet:mb-1"
                />
                <p>{artist.name}</p>
              </div>
            ))}
        </section>
      </section>
    </div>
  );
};

export default Artists;
