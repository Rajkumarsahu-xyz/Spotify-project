 
  import React, { useState, useEffect } from 'react';
  import { getFirestore, collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
  import { app } from './../firebase'; // Assuming you have a 'firebase' export in './firebase'
  import PlayPauseButton from './PlayPauseButton';
  import { usePlayer } from "./PlayerContext";
  import { FaCirclePause } from 'react-icons/fa6';
  import { FaCirclePlay } from 'react-icons/fa6';

const db = getFirestore(app);

const RecentlyPlayed = () => {
  const { isPlaying, currentAudioUrl, playPauseToggle } = usePlayer();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const togglePlay = (audioUrl, title, artistName, imgUrl, songId) => {
    playPauseToggle(audioUrl, title, artistName, imgUrl, songId);
  };

  useEffect(() => {
    // Fetch data from the songs table
    const fetchData = async () => {
      const songsCollection = collection(db, 'songs');
      const songsQuery = query(songsCollection);

      try {
        const songsSnapshot = await getDocs(songsQuery);
        const songsData = songsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // console.log(songsData);

        // Fetch cover images from the albums table using album_id from songs
        const songsWithAlbumData = await Promise.all(
          songsData.map(async (song) => {
            const albumQuery = doc(collection(db, 'albums'), song.album_id);
            const albumDoc = await getDoc(albumQuery);
            const albumData = albumDoc.data();
            return {
              ...song,
              imgUrl: albumData?.coverImageUrl || '', // Handle case where albumData is null
            };
          })
        );

        console.log(songsWithAlbumData);

        const songsWithArtistData = await Promise.all(
          songsWithAlbumData.map(async (song) => {
            const artistQuery = doc(collection(db, 'artists'), song.artist_id);
            const artistDoc = await getDoc(artistQuery);
            const artistData = artistDoc.data();
            return {
              ...song,
              artistName: artistData?.name || '', // Handle case where albumData is null
            };
          })
        );

        // console.log(songsWithAlbumData);

        // Filter out null values (songs without a matching album)
        const validSongsWithAlbumData = songsWithArtistData.filter((song) => song !== null);
        // console.log(validSongsWithAlbumData);

        setRecentlyPlayed(validSongsWithAlbumData.slice(0, 6));
        console.log(recentlyPlayed);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: '18vh' }}>Recently Played</h2>
      <div className='recentlyPlayedContainer'>
        {recentlyPlayed.map((song, index) => (
          <div key={index} className='recentSongsCard'>
            <img src={song.imgUrl} alt={`Song ${index + 1}`} />
            <p>{song.title}</p>
            <div onClick={() => togglePlay(song.audioUrl, song.title, song.artistName, song.imgUrl, song.id)}>
              {isPlaying && currentAudioUrl === song.audioUrl ? <FaCirclePause className="pauseBtn"/> : <FaCirclePlay className="playBtn"/>}
            </div>
            {/* <PlayPauseButton /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
