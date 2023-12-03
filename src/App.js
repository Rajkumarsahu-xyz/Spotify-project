import React, { useEffect, useState } from 'react';
import SignInOut from './SignInOut';
import UserInfo from './UserInfo';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home';
import LeftSideContainer from './components/LeftSideContainer';
import RightSideContainer from './components/RightSideContainer';
import { Route, Routes } from 'react-router-dom';
import Playbar from './components/Playbar';
import CreateAlbumPage from './components/CreateAlbumPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import LibraryPlaylists from './components/LibraryPlaylists';
import LibraryAlbums from './components/LibraryAlbums';
import LibraryArtists from './components/LibraryArtists';
import CreatePlaylistPage from './components/CreatePlaylistPage';
import AlbumDetails from './components/AlbumDetails';
import ArtistDetails from './components/ArtistDetails';
import PlaylistDetails from './components/PlaylistDetails';

const App = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const [user] = useAuthState(auth);

  return (
    <div className='appContainer'>
      <div className='topHeader'>
        <MdArrowBackIosNew className="arrowheads"/>
        <MdArrowForwardIos className="arrowheads"/>
        <FaSpotify className='spotifyLogo'/>
        <h1>Spotify</h1>
        <SignInOut/>
        <div className='loginMsg'>
          {user && <h1>Welcome, {user.displayName || 'User'}!</h1>}
        </div>
      </div>
      
      <LeftSideContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/playlists' element={<Home/>}/>
        <Route path='/albums' element={<Home/>}/>
        <Route path='/artists' element={<Home/>}/>
        <Route path='/createAlbum' element={<CreateAlbumPage/>}/>
        <Route path='/createPlaylist' element={<CreatePlaylistPage/>}/>
        <Route path="/albums/:albumId" element={<AlbumDetails/>} />
        <Route path="/artists/:artistId" element={<ArtistDetails/>} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetails/>} />
        {/* <Route path="/artists/:artistId" component={ArtistDetails} /> */}
      </Routes>
      
      <RightSideContainer/>
      <Playbar/>
    </div>
  );
};

export default App;
