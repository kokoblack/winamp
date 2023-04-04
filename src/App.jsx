import { useState, useEffect, createContext, useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { AudioPlayer } from "./components/import";
import { intialState, reducer } from "./components/reducer";
import SideNav from "./components/SideNav";
import axios from "axios";
import logo from "../src/assets/logo.png"
import {
  Home,
  AllRecentlyPlayed,
  Artists,
  Videos,
  Songs,
  Trending,
} from "./pages";

export const RefreshTokenContext = createContext();
export const AppDispatchContext = createContext();
export const AudioRefContext = createContext();

function App() {
  const audioRef = useRef();
  const client_id = "2a2dbeac86854258ae8629ed11a0cdaf";
  const client_secret = "6260b59b76a44cccb09eae19fc4fb241";

  const [refreshToken, setRefreshToken] = useState("");
  const [sideNavMenu, setSideNavMenu] = useState(false);
  const [state, dispatch] = useReducer(reducer, intialState);

  const toggle = state.themeToggle;

  useEffect(() => {
    axios({
      method: "post",
      url: `https://accounts.spotify.com/api/token?`,
      data: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: client_id, // User ID
        password: client_secret, // User Secret
      },
    })
      .then((res) => setRefreshToken(res.data.access_token))
      .catch((err) =>
        console.log(err.response.request.status, err.response.data.error)
      );
  }, []);

  return (
    <div className="max-w-[1440px]">
      <AppDispatchContext.Provider value={{ state, dispatch, setSideNavMenu }}>
        <RefreshTokenContext.Provider value={refreshToken}>
          <AudioRefContext.Provider value={audioRef}>
            {!refreshToken ? (
              <div className=" bg-dark_black flex justify-center items-center h-screen">
                <img src={logo} alt="logo" className=" animate-pulse" />
              </div>
            ) : (
              <>
                <div
                  className={`${
                    toggle ? " bg-dark_black" : " bg-white"
                  } flex justify-center items-start max-lap:block w-full relative`}
                >
                  <div
                    className={
                      sideNavMenu
                        ? " fixed h-screen top-0 left-0 w-[45%] z-30 box-content max-lap:w-[30%] max-[500px]:w-[45%]"
                        : " w-[13%] sticky top-0 max-lap:hidden"
                    }
                  >
                    <SideNav />
                  </div>
                  <div
                    className={`${
                      toggle ? " bg-dark_black" : " bg-white"
                    } w-[87%] max-lap:w-full`}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="artists" element={<Artists />} />
                      <Route path="videos" element={<Videos />} />
                      <Route path="songs" element={<Songs />} />
                      <Route path="recently" element={<AllRecentlyPlayed />} />
                      <Route path="trending" element={<Trending />} />
                    </Routes>
                  </div>
                </div>
                <div className=" max-w-[1440px] fixed bottom-0 z-50">
                  <AudioPlayer />
                </div>
              </>
            )}
          </AudioRefContext.Provider>
        </RefreshTokenContext.Provider>
      </AppDispatchContext.Provider>
    </div>
  );
}

export default App;
