
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from './../firebase';
import { usePlayer } from "./PlayerContext";
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from 'react-icons/fa6';
import Loader from '../Loader';

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const { isPlaying, currentAudioUrl, playPauseToggle } = usePlayer();

  const togglePlay = (audioUrl, title, artistName, imgUrl) => {
    playPauseToggle(audioUrl, title, artistName, imgUrl);
  };

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      const db = getFirestore(app);
      const albumDocRef = doc(db, 'albums', albumId);
      const albumDoc = await getDoc(albumDocRef);
      const albumData = albumDoc.data();

      const artistsRef = collection(db, "artists");

      const artistDocRef = doc(artistsRef, albumData.artist_id);
    const artistDocSnapshot = await getDoc(artistDocRef);

    const artistData = artistDocSnapshot.data();
    console.log(artistData);

      if (albumDoc.exists()) {
        setAlbum({ id: albumDoc.id, artistName: artistData.name, ...albumDoc.data() });
      } else {
        console.error('Album not found');
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  if (!album) {
    return <Loader/>;
  }

  return (
    <div className='albumDetailsContainer'>
        <div>
            <img src={album.coverImageUrl} alt={album.title} />
        </div>
        <div className='albumDetailSongs'>
            <h1>{album.title} - {album.artistName}</h1>
            {(album.songs).map((song, index) => (
                <div key={index} className='albumDetailSongsCard'>
                    <h2>{song.name}</h2>
                    <div onClick={() => togglePlay(song.audioUrl, song.name, album.artistName, album.coverImageUrl)}>
                    {isPlaying && currentAudioUrl === song.audioUrl ? <FaCirclePause className="pauseBtn"/> : <FaCirclePlay className="playBtn"/>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default AlbumDetails;