import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BiLibrary } from "react-icons/bi";
import LibraryPlaylists from "./LibraryPlaylists";
import LibraryAlbums from "./LibraryAlbums";
import LibraryArtists from "./LibraryArtists";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

function YourLibrary() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  function PlaylistsClicked() {
    navigate('/playlists');
  }
  function AlbumsClicked() {
    navigate('/albums');
  }
  function ArtistClicked() {
    navigate('/artists');
  }

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    if (option === "album") {
        onAuthStateChanged(auth, (user) => {
            if(!user) {
                console.log("User is not signed in");
                navigate("/");
            }
            else {
                console.log("User is signed in");
                navigate("/createAlbum");
            }
        })
    } 
    else if (option === "playlist") {
        onAuthStateChanged(auth, (user) => {
            if(!user) {
                console.log("User is not signed in");
                navigate("/");
            }
            else {
                console.log("User is signed in");
                navigate("/createPlaylist");
            }
        })
    }
  };

  return (
    <div className="yourLibrary">
      <div className="libraryHeading">
        <BiLibrary className="libraryIcon" />
        <h2>Your Library</h2>
        <div onClick={() => setShowDropdown(!showDropdown)}>
          <IoMdAdd className="create-Btn" />
        </div>
        {showDropdown && (
          <div className="dropdown-content">
            <ul>
              <li onClick={() => handleOptionClick("album")}>Create Album</li>
              <li onClick={() => handleOptionClick("playlist")}>
                Create Playlist
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="libraryOptions">
          <h3 className="libraryOptionsTab" onClick={PlaylistsClicked}>Playlists</h3>
          <h3 className="libraryOptionsTab" onClick={AlbumsClicked}>Albums</h3>
          <h3 className="libraryOptionsTab" onClick={ArtistClicked}>Artists</h3>
      </div>

      <Routes>
        <Route path={"/"} element={<LibraryPlaylists />} />
        <Route path={"/playlists"} element={<LibraryPlaylists />} />
        <Route path={"/albums"} element={<LibraryAlbums />} />
        <Route path={"/artists"} element={<LibraryArtists />} />
        <Route path={"/createAlbum"} element={<LibraryPlaylists />} />
        <Route path={"/createAlbum"} element={<LibraryAlbums />} />
        <Route path={"/createAlbum"} element={<LibraryArtists />} />
        <Route path={"/createPlaylist"} element={<LibraryPlaylists />} />
        <Route path={"/createPlaylist"} element={<LibraryAlbums />} />
        <Route path={"/createPlaylist"} element={<LibraryArtists />} />
      </Routes>
    </div>
  );
}

export default YourLibrary;
