import { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "../../components/AudioPlayer";

const Playlists = () => {
  // const publicPlaylistsQuery = "browse/featured-playlists";
  // const baseUrl = "https://api.spotify.com/v1/";
  // const [refreshToken, setRefreshToken] = useState("");
  // console.log(`refreshtoken: ${refreshToken}`);
  // const [query, setQuery] = useState(publicPlaylistsQuery);
  // const [publicPlaylistsData, setPublicPlaylistsData] = useState("kareem");

  // console.log(`app: ${publicPlaylistsData}`);

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   console.log(`first hash: ${hash}`);
  //   let token = window.localStorage.getItem("token");
  //   console.log(`first token: ${token}`);

  //   if (hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((ele) => ele.startsWith("access_token"))
  //       .split("=")[1];

  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }

  //   setRefreshToken(token);
  //   console.log(`set token: ${token}`);
  // }),
  //   [refreshToken];

  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos/1')
  //     .then((res) => {
  //       const data = res.data.title;
  //       setPublicPlaylistsData(res.data.title);
  //       console.log(`set: ${publicPlaylistsData}`);
  //       console.log(res.data.title);
  //       console.log(`data: ${data}`);
  //     })
  //     .catch((err) => console.log(err));
  // }, [refreshToken, query]);

  return (
    <div>
      {/* <AudioPlayer /> */} hi
    </div>
  );
};

export default Playlists;
