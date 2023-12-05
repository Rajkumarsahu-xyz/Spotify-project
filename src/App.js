import React, { useEffect, useState } from 'react';
import SignInOut from './SignInOut';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home';
import LeftSideContainer from './components/LeftSideContainer';
import RightSideContainer from './components/RightSideContainer';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Playbar from './components/Playbar';
import CreateAlbumPage from './components/CreateAlbumPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import CreatePlaylistPage from './components/CreatePlaylistPage';
import AlbumDetails from './components/AlbumDetails';
import ArtistDetails from './components/ArtistDetails';
import PlaylistDetails from './components/PlaylistDetails';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className='appContainer'>
      <div className='topHeader'>
        <MdArrowBackIosNew className="arrowheads" onClick={goBack}/>
        <MdArrowForwardIos className="arrowheads" onClick={goForward}/>
        <FaSpotify className='spotifyLogo' onClick={handleLogoClick}/>
        <h1 onClick={handleLogoClick}>Spotify</h1>
        <SignInOut/>
        <div className='loginMsg'>
          {user && <h1>Welcome, {user.displayName || 'User'}!</h1>}
        </div>
      </div>
      
      <LeftSideContainer/>
      <Routes>
        <Route path='/' element={<Loader><Home /></Loader>}/>
        <Route path='/playlists' element={<Loader><Home /></Loader>}/>
        <Route path='/albums' element={<Loader><Home /></Loader>}/>
        <Route path='/artists' element={<Loader><Home /></Loader>}/>
        <Route path='/createAlbum' element={<Loader><CreateAlbumPage /></Loader>}/>
        <Route path='/createPlaylist' element={<Loader><CreatePlaylistPage /></Loader>}/>
        <Route path="/albums/:albumId" element={<Loader><AlbumDetails /></Loader>} />
        <Route path="/artists/:artistId" element={<Loader><ArtistDetails /></Loader>} />
        <Route path="/playlists/:playlistId" element={<Loader><PlaylistDetails /></Loader>} />
        {/* <Route path="/artists/:artistId" component={ArtistDetails} /> */}
      </Routes>
      
      <RightSideContainer/>
      <Playbar/>
      <ToastContainer />
    </div>
  );
};

export default App;
