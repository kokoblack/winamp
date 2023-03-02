import React from "react";

const HomeArtistIsLoading = () => {
  return (
    <div className=" flex justify-center items-center gap-[5%] w-full h-[60%]">
      {[1, 2, 3].map((e) => (
        <div key={e} className="w-[30%] flex justify-center items-center flex-col animate-pulse max-[1000px]:w-[20%]  max-tablet:w-[25%] max-phone:w-[28%]">
            <p className=" rounded-full w-[4.5rem] h-[4.6rem] max-tablet:w-[3.5rem] max-tablet:h-[3.5rem] bg-dark_grey mb-[10%]"></p>
            <p className=" bg-dark_grey w-[50%] h-[.2rem]"></p>
        </div>
      ))}
    </div>
  );
};

export default HomeArtistIsLoading;
