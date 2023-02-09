import { Routes, Route } from 'react-router-dom'
import { Home, Albums, Artists, Downloads, Equalizer, Favourites, Genres, Library, Playing, Playlists, Profile, Recommended, SignIn, SignUp, Songs, Trending, Videos, Visual } from './pages';


function App() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='albums' element={<Albums />} />
        <Route path='artists' element={<Artists />} />
        <Route path='downloads' element={<Downloads />} />
        <Route path='equalizer' element={<Equalizer />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='genres' element={<Genres />} />
        <Route path='library' element={<Library />} />
        <Route path='playing' element={<Playing />} />
        <Route path='playlists' element={<Playlists />} />
        <Route path='profilr' element={<Profile />} />
        <Route path='recommended' element={<Recommended />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='songs' element={<Songs />} />
        <Route path='trending' element={<Trending />} />
        <Route path='videos' element={<Videos />} />
        <Route path='visual' element={<Visual />} />
      </Routes>
    </div>
  );
}

export default App;
