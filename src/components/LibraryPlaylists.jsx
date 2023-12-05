
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from '../firebase';
import { useLocation, useNavigate } from "react-router-dom";

function LibraryPlaylists() {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const user = auth.currentUser;

  const navigate = useNavigate();

  function playlistClickHandler(albumId) {
    navigate(`/playlists/${albumId}`);
  }

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      if (user) {
        const db = getFirestore(app);
        const playlistsRef = collection(db, 'playlists');
        // console.log(user.uid);
        const userPlaylistsQuery = query(playlistsRef, where('createdBy.userId', '==', user.uid));
        const playlistsSnapshot = await getDocs(userPlaylistsQuery);

        const playlistsData = playlistsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserPlaylists(playlistsData);
      }
    };

    fetchUserPlaylists();
  }, [user]);

  return (
    <div className="libraryPlaylistsContainer">
      {userPlaylists.map((playlist, index) => (
        <p key={index} onClick={() => playlistClickHandler(playlist.id)}>
          {playlist.title}
        </p>
      ))}
    </div>
  );
}

export default LibraryPlaylists;
