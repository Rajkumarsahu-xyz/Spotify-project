import React from "react";
import { IoMdAdd } from "react-icons/io";
import { BiLibrary } from "react-icons/bi";
import LibraryPlaylists from "./LibraryPlaylists";
import LibraryAlbums from "./LibraryAlbums";
import LibraryArtists from "./LibraryArtists";
import { Link, Route, Routes } from "react-router-dom";

function YourLibrary() {
    return (
        <div className="yourLibrary">
            <div className="libraryHeading">
                <BiLibrary className="libraryIcon"/>
                <h2>Your Library</h2>
                <IoMdAdd className="create-Btn"/>
            </div>

            <div className="libraryOptions">
                <Link to='/playlists'><h3 className="libraryOptionsTab">Playlists</h3></Link>
                <Link to='/albums'><h3 className="libraryOptionsTab">Albums</h3></Link>
                <Link to='/artists'><h3 className="libraryOptionsTab">Artists</h3></Link>
            </div>

            <Routes>
                <Route path={'/'} element={<LibraryPlaylists/>}/>
                <Route path={'/playlists'} element={<LibraryPlaylists/>}/>
                <Route path={'/albums'} element={<LibraryAlbums/>}/>
                <Route path={'/artists'} element={<LibraryArtists/>}/>
            </Routes>
                
        </div>
    );
}

export default YourLibrary;