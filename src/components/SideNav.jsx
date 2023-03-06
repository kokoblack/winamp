import React, {useState} from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { GiGuitar } from "react-icons/gi";
import { TfiVideoClapper } from "react-icons/tfi";
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
        <img src={logo} alt="logo" className="w-6 h-8 max-lap:w-[8%] max-[500px]:w-[14%] max-lap:h-auto" />
        <h3 className="font-nunito not-italic text-[1.3vw] font-semibold text-white min-[1441px]:text-lg max-lap:text-[3vw] max-[500px]:text-[5.5vw] ">
          winamp
        </h3>
      </section>
      
      <section className="mb-12 ">
        {FirstNav.map(([icon, path, name], index) => (
          <div key={name}>
            <Link
            onClick={() => setCheckNumber(index)}
              to={path}
              className={`font-nunito not-italic text-[1.1vw] font-medium ${checkNumber === index ? 'text-bright_orange' : 'text-grey'} m-2 flex gap-2 justify-start items-center min-[1441px]:text-medium max-lap:text-[2.5vw] max-[500px]:text-[4.5vw]`}
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

export default React.memo(SideNav);
