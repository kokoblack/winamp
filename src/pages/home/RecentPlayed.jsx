import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";

function RecentPlayed() {
  return (
    <div className=" font-nunito not-italic bg-light_black mb-[2%] py-[.5rem] w-[60%] h-[14rem] rounded-2xl max-[1000px]:w-full">
      <section className=" flex justify-center items-center text-white px-[5%] py-[1%]">
        <h3 className=" mr-auto text-lg font-bold max-[550px]:text-base">Recently played</h3>
        <p className=" ml-auto text-medium font-medium max-[550px]:text-xsm">See all</p>
      </section>

      <section className=" bg-light_black">
        {/* {songPlayingReducer.state.songsTracks.slice(0, 15).map((songs) => ( */}
        {[1, 2].map(() => (
          <div
            // onClick={() => {
            //   songPlayingReducer.dispatch({
            //     type: "SET_IS_PLAYING",
            //     payload: true,
            //   });
            //   songPlayingReducer.dispatch({
            //     type: "GET_AUDIO_PLAYER_ARTIST",
            //     payload: songs.track.artists[0].name,
            //   });
            //   songPlayingReducer.dispatch({
            //     type: "GET_AUDIO_PLAYER_TITLE",
            //     payload: songs.track.name,
            //   });
            //   songPlayingReducer.dispatch({
            //     type: "GET_AUDIO_PLAYER_AUDIO",
            //     payload: songs.track.external_urls.spotify,
            //   });
            //   songPlayingReducer.dispatch({
            //     type: "GET_AUDIO_PLAYER_IMAGE",
            //     payload: songs.track.album.images[2].url,
            //   });
            // }}
            // key={songs.track.id}
            className=" flex justify-center items-center gap-[3%] px-[5%] py-[1%] text-white w-full hover:bg-[#EC625F66]"
          >
            <img
              //   src={songs.track.album.images[0].url}
              alt="song_cover"
              className=" rounded-lg w-[4rem] h-[4rem] max-[850px]:w-[3rem] max-[850px]:h-[3rem] max-[550px]:w-[2.1rem] max-[550px]:h-[2.1rem]"
            />
            <div className=" w-full">
              <h3 className="font-nunito not-italic text-lg font-semibold max-[850px]:text-medium max-[550px]:text-sm">
                {/* {songs.track.name} */} title
              </h3>
              <p className="font-nunito not-italic text-base font-medium max-[850px]:text-sm max-[550px]:text-xxsm">
                {/* {songs.track.artists[0].name} */} artist
              </p>
            </div>
            <div className=" flex justify-center items-center ml-auto text-lg gap-[20%] max-[850px]:text-base">
              <AiOutlineHeart />
              <AiOutlinePlus />
            </div>
            <audio
            //   ref={audioRef}
            //   src={songs.track.external_urls.spotify}
            //   controls
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default RecentPlayed;
