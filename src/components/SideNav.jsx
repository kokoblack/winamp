import React, {useContext, useState} from "react";
import logo from "../assets/logo.png";
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
    [<MdOutlineLocalFireDepartment />, "/trending", "Trending"],
    [<TfiVideoClapper />, "/playlists", "Playlists"],
    [<GiGuitar />, "/artists", "Artists"],
  ];

  const [checkNumber, setCheckNumber] = useState(0)

  return (
    <div style={{background: 'linear-gradient(182.2deg, rgba(32, 28, 28, 0.91) 0%, rgba(23, 22, 22, 0.94) 89.97%)'}} className="sticky top-0 pt-10 pl-[5%] h-screen max-lap:pt-8">
      <section className="flex gap-2 pl-1 items-center mb-8">
        <img src={logo} alt="logo" className="w-6 h-8 max-lap:w-4 max-lap:h-6" />
        <h3 className="font-nunito not-italic text-[1.3vw] font-semibold text-white max-lap:text-medium max-[479px]:text-base">
          winamp
        </h3>
      </section>
      
      <section className="mb-12 ">
        {FirstNav.map(([icon, path, name], index) => (
          <div key={name}>
            <Link
            onClick={() => setCheckNumber(index)}
              to={path}
              className={`font-nunito not-italic text-[1.1vw] font-medium ${checkNumber === index ? 'text-bright_orange' : 'text-grey'} m-2 flex gap-2 justify-start items-center max-lap:text-sm max-[479px]:text-xsm`}
            >
              {icon}
              <p>{name}</p>
            </Link>
          </div>
        ))}
      </section>

      {/* <section>
        <div>
          <h3 className="font-nunito not-italic text-[1.3vw] font-semibold text-grey m-[3%] pb-4 max-[850px]:text-medium max-lappb-2 max-[479px]:text-base">
            PERSONAL
          </h3>
        </div>

        {FirstNav.slice(3).map(([icon, path, name], index) => (
          <div key={name}>
            <Link
            onClick={() => setCheckNumber2(index)}
              to={path}
              className={`font-nunito not-italic text-[1.1vw] font-medium ${checkNumber2 === index ? 'text-bright_orange' : 'text-grey'} m-2 flex gap-2 justify-start items-center max-lap:text-sm max-[479px]:text-xsm`}
            >
              {icon}
              <p>{name}</p>
            </Link>
          </div>
        ))}
      </section> */}
    </div>
  );
};

export default React.memo(SideNav);
