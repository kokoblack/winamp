import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { GiGuitar } from "react-icons/gi";
import { TfiVideoClapper } from "react-icons/tfi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { AppDispatchContext } from "../App";

const SideNav = () => {
  const FirstNav = [
    [<RiHomeLine />, "/", "Home"],
    [<MdOutlineLocalFireDepartment />, "/trending", "Trending"],
    [<TfiVideoClapper />, "/playlists", "Playlists"],
    [<GiGuitar />, "/artists", "Artists"],
  ];

  const sideNavReducer = useContext(AppDispatchContext);
  const checkNumber = sideNavReducer.state.sideNavLink;

  return (
    <div
      className={`sticky top-0 pt-10 pl-[5%] pb-[10%] h-screen max-lap:pt-8 ${
        sideNavReducer.state.themeToggle ? "bg-light_black" : "bg-[#F7F7F7]"
      }`}
    >
      <section className="flex gap-2 pl-1 items-center mb-8">
        <img
          src={logo}
          alt="logo"
          className="w-6 h-8 max-lap:w-[8%] max-[500px]:w-[14%] max-lap:h-auto"
        />
        <h3
          className={`font-nunito not-italic text-[1.3vw] font-semibold ${
            sideNavReducer.state.themeToggle
              ? " text-white"
              : " text-dark_black"
          } min-[1441px]:text-lg max-lap:text-[3vw] max-[500px]:text-[5.5vw] `}
        >
          winamp
        </h3>
      </section>

      <section className="mb-12 ">
        {FirstNav.map(([icon, path, name], index) => (
          <div key={name}>
            <Link
              onClick={() =>
                sideNavReducer.dispatch({
                  type: "SET_SIDE_NAV_LINK",
                  payload: index,
                })
              }
              to={path}
              className={`font-nunito not-italic text-[1.1vw] font-medium ${
                checkNumber === index
                  ? "text-bright_orange"
                  : sideNavReducer.state.themeToggle
                  ? " text-dark_grey"
                  : " text-[#626262]"
              }
              } m-2 flex gap-2 justify-start items-center min-[1441px]:text-medium max-lap:text-[2.5vw] max-[500px]:text-[4.5vw]`}
            >
              {icon}
              <p>{name}</p>
            </Link>
          </div>
        ))}
      </section>

      {sideNavReducer.state.themeToggle ? (
        <div className=" flex justify-start items-center gap-2 font-nunito not-italic text-white text-[1.1vw] font-semibold min-[1441px]:text-medium max-lap:text-[2.5vw] max-[500px]:text-[4.5vw]">
          <p>White Theme</p>
          <MdToggleOff
            onClick={() => {
              sideNavReducer.dispatch({
                type: "CHANGE_THEME_TOGGLE",
                payload: false,
              });
            }}
            className=" text-white text-[2.1vw] min-[1441px]:text-lg max-lap:text-[3.5vw] max-[500px]:text-[5.5vw]"
          />
        </div>
      ) : (
        <div className=" flex justify-start items-center gap-2 text-dark_black font-nunito not-italic text-[1.1vw] font-semibold min-[1441px]:text-medium max-lap:text-[2.5vw] max-[500px]:text-[4.5vw]">
          <p>Dark Theme</p>
          <MdToggleOn
            onClick={() => {
              sideNavReducer.dispatch({
                type: "CHANGE_THEME_TOGGLE",
                payload: true,
              });
            }}
            className=" text-dark_black text-[2.1vw] min-[1441px]:text-lg max-lap:text-[3.5vw] max-[500px]:text-[5.5vw]"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(SideNav);
