
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import { usePlayer } from "./PlayerContext";
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from 'react-icons/fa6';
import Loader from '../Loader';

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const { isPlaying, currentAudioUrl, playPauseToggle } = usePlayer();

  const togglePlay = async (audioUrl, title, artistName, imgUrl, songId) => {
    // If imgUrl is not available, fetch it from the albums collection
    if (!imgUrl) {
      const db = getFirestore(app);
      const songDocRef = doc(db, 'songs', songId); // Assuming title is unique
      const songDoc = await getDoc(songDocRef);
      console.log(songDoc.data());
      const songData = songDoc.data();

      if (songDoc.exists() && songData.album_id) {
        const albumDocRef = doc(db, 'albums', songData.album_id);
        const albumDoc = await getDoc(albumDocRef);
        const albumData = albumDoc.data();

        const artistDocRef = doc(db, 'artists', songData.artist_id);
        const artistDoc = await getDoc(artistDocRef);
        const artistData = artistDoc.data();

        if (albumDoc.exists()) {
          imgUrl = albumData.coverImageUrl;
        }
        if(artistDoc.exists()) {
          artistName = artistData.name;
        }
      }
    }

    playPauseToggle(audioUrl, title, artistName, imgUrl);
  };

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      const db = getFirestore(app);
      const playlistDocRef = doc(db, 'playlists', playlistId);
      const playlistDoc = await getDoc(playlistDocRef);
      const playlistData = playlistDoc.data();

      if (playlistDoc.exists()) {
        setPlaylist({ id: playlistDoc.id, userName: playlistData.createdBy.username, ...playlistDoc.data() });
      } else {
        console.error('Playlist not found');
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  if (!playlist) {
    return <Loader/>;
  }

  return (
    <div className='playlistDetailsContainer'>
      <div className='playlistDetailSongs'>
        <h1>{playlist.title} - {playlist.userName}</h1>
        {(playlist.songs).map((song, index) => (
          <div key={index} className='playlistDetailSongsCard'>
            <h2>{song.title}</h2>
            <div onClick={() => togglePlay(song.audioUrl, song.title, song.artistName, song.imgUrl, song.id)}>
              {isPlaying && currentAudioUrl === song.audioUrl ? <FaCirclePause className="pauseBtn" /> : <FaCirclePlay className="playBtn" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
