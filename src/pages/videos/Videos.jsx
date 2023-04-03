import { useContext } from "react";
import { BsPlayFill } from "react-icons/bs";
import { AppDispatchContext } from "../../App";
import CloseOutsideMenu from "../../components/CloseOutsideMenu";
import { MdQueueMusic } from "react-icons/md";

const Videos = () => {
  const p = {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
  };
  const videoReducer = useContext(AppDispatchContext);
  const toggle = videoReducer.state.themeToggle;
  const play = videoReducer.state.vidPlay
  const vidID = videoReducer.state.vidID
  const name = videoReducer.state.vidName

  const handleMenu = () => {
    return videoReducer.setSideNavMenu(true);
  };

  const handleClickOutside = () => {
    return videoReducer.setSideNavMenu(false);
  };

  const ref = CloseOutsideMenu(handleClickOutside);

  return (
    <div
      className={` min-h-screen font-nunito not-italic ${
        toggle ? "bg-dark_black text-white" : "bg-white text-dark_black"
      }  text-xl p-[2%] max-[550px]:text-[5.2vw] max-lap:pt-[4%] max-lap:px-[4%]`}
    >
      <div
        className={`${
          toggle ? "bg-dark_black" : "bg-white"
        } sticky pb-1 z-10 top-0 `}
      >
        <div className={` flex justify-start items-center gap-[3%] mt-[1.5%] `}>
          <div
            ref={ref}
            className="hidden max-lap:block text-[2rem] max-[550px]:text-[7vw] "
          >
            <MdQueueMusic onClick={handleMenu} />
          </div>
          <h1 className=" font-black">Videos</h1>
        </div>

        {play && (
          <div className={`${toggle ? "bg-light_black" : "bg-[#F7F7F7]"} `}>
            <iframe
              allow="autoplay"
              className=" h-[40vh] w-full my-[1%] max-lap:h-[30vh]"
              src={`https://www.youtube.com/embed/${vidID}?autoplay=1`}
            ></iframe>
            <p style={p} className=" text-medium max-tablet:text-sm py-[.5rem]">
              {name}
            </p>
          </div>
        )}
      </div>

      <div
        className={`${
          toggle ? " bg-dark_black" : " bg-white"
        } flex justify-start flex-wrap items-start gap-x-[2.5%] gap-y-[30%] mt-[2%]`}
      >
        {videoReducer.state.videos.map((e) => (
          <div
            key={e.id}
            className=" w-[23.1%] max-lap:w-[31.5%] max-tablet:w-[48.5%] mb-[3%]"
          >
            <div
              onClick={() => {
               videoReducer.dispatch({
                  type: "SET_VIDID",
                  payload: e.id,
                })
                videoReducer.dispatch({
                  type: "SET_VIDPLAY",
                  payload: true,
                })
                videoReducer.dispatch({
                  type: "SET_VIDNAME",
                  payload: e.name,
                })
              }}
              className=" relative cursor-pointer"
            >
              <img
                src={e.image}
                className=" rounded-lg w-[100%] h-auto mb-[3%]"
              />
              <BsPlayFill className=" text-white text-xxl absolute top-1/2 left-1/2 ml-[-1.3125rem] mt-[-1.1125rem] " />
            </div>
            <p style={p} className=" text-medium max-tablet:text-sm mb-[.2rem]">
              {e.name}
            </p>
            <p
              className={` text-base max-tablet:text-xsm ${
                toggle ? " text-grey" : " text-dark_black"
              }`}
            >
              {e.artist}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`${toggle ? " bg-dark_black" : " bg-white"} h-[3rem]`}
      ></div>
    </div>
  );
};

export default Videos;
