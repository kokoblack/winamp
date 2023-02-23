import { useState, useEffect, createContext, useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { intialState, reducer } from "./components/reducer";
import {
  Home,
  Albums,
  AllRecentlyPlayed,
  Artists,
  Genres,
  Library,
  Playing,
  Playlists,
  Recommended,
  SignIn,
  SignUp,
  Songs,
  Trending,
} from "./pages";

export const RefreshTokenContext = createContext();
export const AppDispatchContext = createContext();
export const AudioRefContext = createContext();

function App() {
  const audioRef = useRef();

  const [refreshToken, setRefreshToken] = useState("");
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
      <AppDispatchContext.Provider value={{state, dispatch}}>
        <RefreshTokenContext.Provider value={refreshToken}>
          <AudioRefContext.Provider value={audioRef}>
            <Routes>
              <Route path="/" element={!refreshToken ? <SignIn /> : <Home />} />
              <Route path="albums" element={<Albums />} />
              <Route path="artists" element={<Artists />} />
              <Route path="genres" element={<Genres />} />
              <Route path="library" element={<Library />} />
              <Route path="playing" element={<Playing />} />
              <Route path="playlists" element={<Playlists />} />
              <Route path="recently" element={<AllRecentlyPlayed/>}/>
              <Route path="recommended" element={<Recommended />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="songs" element={<Songs />} />
              <Route path="trending" element={<Trending />} />
            </Routes>
          </AudioRefContext.Provider >
        </RefreshTokenContext.Provider>
      </AppDispatchContext.Provider>
    </div>
  );
}

export default App;
