import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Albums,
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

function App() {
  const [refreshToken, setRefreshToken] = useState("");
  console.log(`refreshtoken: ${refreshToken}`);

  useEffect(() => {
    const hash = window.location.hash;
    console.log(`first hash: ${hash}`);
    let token = window.localStorage.getItem("token");
    console.log(`first token: ${token}`);

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
        <RefreshTokenContext.Provider value={refreshToken}>
          <Routes>
            <Route path="/" element={!refreshToken ? <SignIn /> : <Home />} />
            <Route path="albums" element={<Albums />} />
            <Route path="artists" element={<Artists />} />
            <Route path="genres" element={<Genres />} />
            <Route path="library" element={<Library />} />
            <Route path="playing" element={<Playing />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="recommended" element={<Recommended />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="songs" element={<Songs />} />
            <Route path="trending" element={<Trending />} />
          </Routes>
        </RefreshTokenContext.Provider>
    </div>
  );
}

export default App;
