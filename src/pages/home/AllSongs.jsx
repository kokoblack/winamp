import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import SideNav from "../../components/SideNav";
import { CloseOutsideMenu } from "../../components/CloseOutsideMenu";
import { AppDispatchContext, RefreshTokenContext } from "../../App";
import pic2 from "../../assets/profile1.jpg";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { MdQueueMusic } from "react-icons/md";
import { BiCast } from "react-icons/bi";

function AllSongs() {
  const token = useContext(RefreshTokenContext);
  const allsongs = useContext(AppDispatchContext);
  const query = "browse/featured-playlists";

  const [publicPlaylists, setPublicPlaylists] = useState([]);
  const [count, setCount] = useState(0);
  // const [search, setSearch] = useState(false)
  const [isHover, setIsHover] = useState(false);
  const [menu, setMenu] = useState(false);
  const timeoutRef = useRef(null);

  const images = publicPlaylists.slice(0, 5).map((e) => e.images[0].url);
  const namesOfPlaylists = publicPlaylists.slice(0, 5).map((e) => e.name);
  const tracks = publicPlaylists.slice(0, 5).map((e) => e.tracks.total);
  const description = publicPlaylists.slice(0, 5).map((e) => e.description)
  const id = publicPlaylists.slice(0, 5).map((e) => e.id)

  const forward = () => {
    setCount((count) => count + 1);
    if (count === images.length - 1) {
      setCount(0);
    }
  };

  const backward = () => {
    setCount((count) => count - 1);
    if (count === 0) {
      setCount(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const handleMenu = () => {
    setMenu(true);
  };

  const handleClickOutside = () => {
    setMenu(false);
  };

  const handleLinkClick = () => {
    allsongs.dispatch({type: 'GET_IMAGE_SRC', payload: images[count]})
    allsongs.dispatch({type: 'GET_ID', payload: id[count]})
    allsongs.dispatch({type: 'GET_DESCRIPTION', payload: description[count]})
    allsongs.dispatch({type: 'GET_TRACK_TOTAL', payload: tracks[count]})
    console.log(allsongs.state.songPlayingId)
  }

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
        setPublicPlaylists(res.data.playlists.items);
      })
      .catch((err) => console.log(err));
  }, [token, query]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundImage: `url(${images[count]})` }}
      className="relative w-full bg-[image:var(--image-url)] bg-cover bg-center px-[4%] pt-3 pb-4   transition-all ease-in duration-[3000]"
    >
      <section className="w-full flex justify-end items-center max-tablet:mb-[5%] max-tablet:mt-[2%]">
        <div
          ref={ref}
          className="hidden mr-auto max-lap:block text-[1.5rem] "
        >
          <MdQueueMusic onClick={handleMenu} />
        </div>
        <div className="flex justify-center items-center p-4 bg-light_black rounded-l-[5rem] rounded-r-[5rem] h-[2.8rem] m-4 max-laptop:px-4 max-laptop:pt-2 max-laptop:pb-3 max-laptop:h-[2.2rem] max-tablet:hidden">
          <AiOutlineSearch className="text-[#C0BFBF] mt-[3%] max-laptop:text-sm max-[479px]:text-xsm " />
          <input
            type="text"
            placeholder="search"
            className="text-[#C0BFBF] bg-[transparent] border-light_dark border-solid border-1 ml-2 placeholder:font-nunito placeholder:not-italic placeholder:text-base placeholder:font-medium max-laptop:placeholder:text-sm max-laptop:w-[8rem] max-[479px]:text-xsm max-[479px]:w-[5rem] "
          />
        </div>
        <AiOutlineSearch className=" hidden max-tablet:block text-lg"/>
        <BiCast className="ml-[1%] text-lg  max-[479px]:ml-1 " />
        <IoMdNotificationsOutline className="ml-[2%] text-lg " />
        <img
          src={pic2}
          className="ml-[2%] h-8 w-8 rounded-[100%] "
        />

        {menu && (
          <div className="hidden absolute h-screen top-0 left-0 w-[20%] bg-gradient-to-r from-[#201c1c] to-[#171616]  max-lap:block z-10 box-content max-pad:w[30%] max-[650px]:w-[35%] max-[330px]:w-[45%] ">
            <SideNav />
          </div>
        )}
      </section>

      <section>
        <h3 className="font-nunito not-italic text-xl font-medium text-white mb-[3%] max-laptop:text-medium max-[850px]:text-base max-[479px]:text-sm max-[479px]:mb-[2%] ">
          TRENDING PLAYLISTS
        </h3>
        <h1 className="font-raleway not-italic text-xxl font-black text-white max-laptop:text-[2.2rem] max-[850px]:text-[1.9rem] max-[479px]:text-nl max-[479px]:mb-2 max-[479px]:mt-5 ">
          {namesOfPlaylists[count]}
        </h1>
        <div className="flex justify-start items-center gap-8 mb-6 max-[479px]:mb-4">
          <p className="font-nunito not-italic text-medium font-medium text-white max-laptop:text-base max-[850px]:text-sm max-[479px]:text-xsm ">
            Tracks
          </p>
          <p className="font-nunito not-italic text-medium font-medium text-white max-laptop:text-base max-[850px]:text-sm max-[479px]:text-xsm ">
            {tracks[count]}
          </p>
        </div>
        <div>
          <Link
            onClick={handleLinkClick}
            to="/songs"
            className="font-nunito not-italic text-medium font-semibold px-4 py-2 rounded-xl text-white bg-bright_orange mr-2 max-[850px]:text-sm max-[850px]:py-1 max-[479px]:text-xsm"
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
            className={`w-3 h-3 bg-${
              count === i ? "bright_orange" : "light_black"
            } rounded-[100%] m-1 max-[479px]:w-2 max-[479px]:h-2 max-[479px]:wx-1 max-[479px]:wy-2 `}
          ></div>
        ))}
      </section>

      <div
        style={{ display: isHover ? "block" : "none" }}
        className="flex justify-center items-center"
      >
        <BsArrowLeftCircle
          size={30}
          onClick={backward}
          className="absolute left-[2%] top-[45%] text-bright_orange text-xl"
        />
        <BsArrowRightCircle
          size={30}
          onClick={forward}
          className="absolute right-[2%] top-[46%] text-bright_orange text-xl"
        />
      </div>
    </div>
  );
}

export default AllSongs;

// const [touchPosition, setTouchPosition] = useState(null);

// const handleTouchStart = (e) => {
//   const touchDown = e.touches[0].clientX;
//   setTouchPosition(touchDown);
// };

// const handleTouchMove = (e) => {
//   const touchDown = touchPosition;

//   if (touchDown === null) {
//     return;
//   }

//   const currentTouch = e.touches[0].clientX;
//   const diff = touchDown - currentTouch;

//   if (diff > 5) {
//     next();
//   }

//   if (diff < -5) {
//     prev();
//   }

//   setTouchPosition(null);
// };

// onTouchStart = { handleTouchStart };
// onTouchMove = { handleTouchMove };
