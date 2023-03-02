import React from 'react'

const ArtistIsLoading = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
    <div key={e} className="w-full flex justify-start items-center gap-[3%] animate-pulse mb-[3%]">
        <p className=" rounded-full w-[4.5rem] h-[4.6rem] max-tablet:w-[3.5rem] max-tablet:h-[3.5rem] bg-dark_grey"></p>
        <p className=" bg-dark_grey w-[10%] h-[.2rem] "></p>
    </div>
  ))
}

export default ArtistIsLoading