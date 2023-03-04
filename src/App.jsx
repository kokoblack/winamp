import { useState, useEffect, createContext, useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { AudioPlayer } from "./components/import";
import { intialState, reducer } from "./components/reducer";
import SideNav from "./components/SideNav";
import {
  Home,
  AllRecentlyPlayed,
  Artists,
  Playlists,
  SignIn,
  Songs,
  Trending,
} from "./pages";

export const RefreshTokenContext = createContext();
export const AppDispatchContext = createContext();
export const AudioRefContext = createContext();

function App() {
  const audioRef = useRef();

  const [refreshToken, setRefreshToken] = useState("");
  const [sideNavMenu, setSideNavMenu] = useState(false);
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((ele) => ele.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setRefreshToken(token);
  }),
    [refreshToken];

  return (
    <div>
      <AppDispatchContext.Provider value={{ state, dispatch, setSideNavMenu }}>
        <RefreshTokenContext.Provider value={refreshToken}>
          <AudioRefContext.Provider value={audioRef}>
            {!refreshToken ? (
              <SignIn />
            ) : (
              <>
                <div className=" flex justify-center items-start max-lap:block w-full relative">
                  <div
                    className={
                      sideNavMenu
                        ? " absolute h-screen top-0 left-0 w-[20%] bg-gradient-to-r from-[#201c1c] to-[#171616] z-30 box-content max-pad:w[30%] max-[650px]:w-[35%] max-[330px]:w-[45%]"
                        : " basis-[13%] sticky top-0 max-lap:hidden"
                    }
                  >
                    <SideNav />
                  </div>
                  <div className="basis-[87%]">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="artists" element={<Artists />} />
                      <Route path="genres" element={<Genres />} />
                      <Route path="playlists" element={<Playlists />} />
                      <Route path="songs" element={<Songs />} />
                      <Route path="recently" element={<AllRecentlyPlayed />} />
                      <Route path="trending" element={<Trending />} />
                    </Routes>
                  </div>
                </div>
                <div className=" fixed bottom-0 z-50">
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
