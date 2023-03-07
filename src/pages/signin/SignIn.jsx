import React from "react";
import logo from "../../assets/logo.png";

const signin = () => {
  const client_id = "2a2dbeac86854258ae8629ed11a0cdaf";
  const REDIRECTED_URI = "http://localhost:5173";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-modify",
    "user-follow-read",
    "app-remote-control",
    "streaming",
  ];

  return (
    <div className=" flex justify-center items-center flex-col bg-gradient-to-r from-[#201c1c] to-[#171616] w-full h-screen px-4">
      <div className=" flex justify-center items-center gap-[2%] w-full">
        <img src={logo} className=" max-pad:w-[4rem] max-pad:h-[5rem] max-[500px]:w-[3rem] max-[500px]:h-[4rem] max-[330px]:w-[3rem] max-[330px]:h-[3rem]" />
        <h1 className=" text-bright_orange text-xxl font-nunito not-italic font-black max-lap:text-[6vw] max-[750px]:text-[3rem] max-[500px]:text-[10vw]">
          Winamp
        </h1>
      </div>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECTED_URI}&scope=${scope.join(
          " "
        )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
        className="font-nunito not-italic text-medium font-semibold px-4 py-2 rounded-xl text-white bg-bright_orange my-[3%] max-lap:text-[2.5vw] max-[750px]:text-[1rem] max-[500px]:text-base max-[500px]:py-1 "
      >
        Connect With Spotify
      </a>
      <div className=" w-full flex justify-center items-center font-nunito font-semibold not-italic text-grey gap-[4%] max-lap:text-[3vw] max-[500px]:text-[4vw]">
        <p className=" max-[500px]:w-[50%]">Don"t have an account?</p>
        <a
          href="https://www.spotify.com/ng/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F%3F"
          className=" decoration-bright_orange underline hover:text-bright_orange"
        >
          Register with Spotify
        </a>
      </div>
    </div>
  );
};

export default signin;
