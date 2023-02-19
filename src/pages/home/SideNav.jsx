import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { GiSettingsKnobs, GiGuitar } from "react-icons/gi";
import { FiFolder } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { SlPlaylist } from "react-icons/sl";
import { TfiVideoClapper, TfiDownload } from "react-icons/tfi";
import { FaBattleNet, FaHeadphonesAlt } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

const SideNav = () => {
  const FirstNav = [
    [<RiHomeLine />, "/", "Home"],
    [<TfiVideoClapper />, "/videos", "Videos"],
    [<FaBattleNet />, "/visual", "Visualization"],
    [<MdOutlineLocalFireDepartment />, "/trending", "Trending"],
    [<FaHeadphonesAlt />, "/library", "Your Library"],
    [<TfiVideoClapper />, "/playlists", "Playlists"],
    [<FaBattleNet />, "/genres", "Genres"],
    [<MdOutlineLocalFireDepartment />, "/artists", "Artists"],
    [<FaHeadphonesAlt />, "/albums", "Saved Album"],
    [<RiHomeLine />, "/equalizer", "Equalizer"],
    [<AiOutlineHeart />, "/favourites", "Favourites"],
    [<TfiDownload />, "/downloads", "Download"],
  ];

  return (
    <div style={{background: 'linear-gradient(182.2deg, rgba(32, 28, 28, 0.91) 0%, rgba(23, 22, 22, 0.94) 89.97%)'}} className="pt-10 pl-[5%] h-screen max-[719px]:h-auto max-[719px]:pt-8">
      <section className="flex gap-2 pl-1 items-center mb-8">
        <img src={logo} alt="logo" className="w-6 h-8 max-[850px]:w-4 max-[850px]:h-6" />
        <h3 className="font-nunito not-italic text-lg font-semibold text-white max-[850px]:text-medium max-[479px]:text-base">
          winamp
        </h3>
      </section>

      <section className="mb-12 ">
        {FirstNav.slice(0, 4).map(([icon, path, name]) => (
          <div key={name}>
            <Link
              to={path}
              className="font-nunito not-italic text-base font-medium text-grey m-2 flex gap-2 justify-start items-center max-[850px]:text-sm max-[479px]:text-xsm"
            >
              {icon}
              <p>{name}</p>
            </Link>
          </div>
        ))}
      </section>

      <section>
        <div>
          <h3 className="font-nunito not-italic text-lg font-semibold text-grey m-[3%] pb-4 max-[850px]:text-medium max-[850px]:pb-2 max-[479px]:text-base">
            PERSONAL
          </h3>
        </div>

        {FirstNav.slice(5).map(([icon, path, name]) => (
          <div key={name}>
            <Link
              to={path}
              className="font-nunito not-italic text-base font-medium text-grey m-2 flex gap-2 justify-start items-center max-[850px]:text-sm max-[479px]:text-xsm"
            >
              {icon}
              <p>{name}</p>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SideNav;
