
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../firebase';
import { usePlayer } from "./PlayerContext";
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from 'react-icons/fa6';

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const { isPlaying, currentAudioUrl, playPauseToggle } = usePlayer();

  const togglePlay = (audioUrl, title, artistName, imgUrl) => {
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
        console.error('Album not found');
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className='playlistDetailsContainer'>
        {/* <div>
            <img src={album.coverImageUrl} alt={album.title} />
        </div> */}
        <div className='playlistDetailSongs'>
            <h1>{playlist.title} - {playlist.userName}</h1>
            {(playlist.songs).map((song, index) => (
                <div key={index} className='playlistDetailSongsCard'>
                    <h2>{song.title}</h2>
                    <div onClick={() => togglePlay(song.audioUrl, song.title, song.artistName, playlist.coverImageUrl)}>
                    {isPlaying && currentAudioUrl === song.audioUrl ? <FaCirclePause className="pauseBtn"/> : <FaCirclePlay className="playBtn"/>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default PlaylistDetails;