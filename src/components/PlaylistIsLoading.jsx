import React from 'react'

const PlaylistIsLoading = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e) => (
    <div key={e} className="h-[10rem] flex justify-center items-center flex-col animate-pulse max-tablet:h-[8rem] max-phone:h-[6rem]">
      <p className=" rounded-lg w-[60%] h-[90%] mb-[3%] bg-dark_grey"></p>
      <p className=" bg-dark_grey h-[5%] w-[50%]"></p>
    </div>
  ));
}

export default PlaylistIsLoading