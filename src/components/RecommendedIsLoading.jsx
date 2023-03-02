import React from "react";

const RecommendedIsLoading = () => {
  return [1, 2, 3, 4].map((e) => (
    <div key={e} className=" w-[25%] h-[8rem] flex justify-center items-center flex-col animate-pulse max-tablet:h-[5rem] max-phone:h-[4rem] max-[300px]:h-[3rem]">
      <p className=" rounded-lg w-[60%] h-[90%] mb-[3%] bg-dark_grey"></p>
      <p className=" bg-dark_grey h-[5%] w-[50%] mb-[3%]"></p>
      <p className=" bg-dark_grey h-[5%] w-[50%]"></p>
    </div>
  ));
};

export default RecommendedIsLoading;
