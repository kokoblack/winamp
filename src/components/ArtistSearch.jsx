import React from "react";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AppDispatchContext } from "../App";

const ArtistSearch = ({ onSearchChange }) => {
  const artistSearchToggle = useContext(AppDispatchContext)
  const toggle = artistSearchToggle.state.themeToggle
  
  return (
    <div
      className={` w-full flex justify-start items-center ml-auto p-4 gap-[5%] ${toggle? " bg-white text-dark_black" : " bg-light_black text-dark_grey" } rounded-l-[5rem] rounded-r-[5rem] h-[2.8rem] m-4 max-laptop:px-4 max-laptop:pt-2 max-laptop:pb-3 max-laptop:h-[2.2rem] `}
    >
      <AiOutlineSearch className=" text-[1.5rem] mt-[3%] max-tablet:mt-[2%] " />
      <input
        onChange={onSearchChange}
        type="text"
        placeholder="search artist"
        className=" bg-[transparent] border-light_dark border-solid border-1 outline-none placeholder:font-nunito placeholder:not-italic placeholder:text-base placeholder:font-medium max-laptop:placeholder:text-sm max-laptop:w-[8rem] max-tablet:w-full "
      />
    </div>
  );
};

export default ArtistSearch;
