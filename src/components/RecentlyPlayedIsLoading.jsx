import React from "react";

const RecentlyPlayedIsLoading = () => {
  return [1, 2].map((e) => (
    <div
      key={e}
      className=" flex justify-center items-center gap-[3%] px-[5%] py-[1%] w-full h-[35%] animate-pulse"
    >
      <p className="rounded-lg w-[3rem] h-[3rem] max-tablet:w-[2.5rem] max-tablet:h-[2.5rem] bg-dark_grey"></p>
      <div className=" w-full h-[3rem] flex justify-center items-center flex-col">
        <p className=" w-full h-[20%] bg-dark_grey mb-[2%]"></p>
        <p className=" w-full h-[20%] bg-dark_grey"></p>
      </div>
    </div>
  ));
};

export default RecentlyPlayedIsLoading;
