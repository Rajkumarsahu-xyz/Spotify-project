import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
// import { useFirestore } from './../firebase'; // Assuming you have a hook for Firestore

const CreatePlaylistForm = () => {
  const [title, setTitle] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);

//   const firestore = useFirestore();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSongSelection = (e) => {
    const selectedSongId = e.target.value;
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, selectedSongId]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new playlist document in Firestore
    try {
      const playlistsCollection = collection(db, 'playlists');
      const newPlaylistDoc = await addDoc(playlistsCollection, {
        title: title,
        songs: selectedSongs,
      });

      console.log('Playlist created with ID: ', newPlaylistDoc.id);
    } catch (error) {
      console.error('Error creating playlist: ', error.message);
    }
  };

  // Fetch existing songs from Firestore
  const fetchSongs = async () => {
    try {
      const songsCollection = collection(db, 'songs');
      const songsSnapshot = await getDocs(songsCollection);
      const songsData = songsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const songsWithArtistName = await Promise.all(
        songsData.map(async (song) => {
          const artistQuery = doc(collection(db, 'artists'), song.artist_id);
          const artistDoc = await getDoc(artistQuery);
          const artistData = artistDoc.data();
          return {
            ...song,
            artistName: artistData?.name || '', // Handle case where albumData is null
          };
        })
      );

      setAvailableSongs(songsWithArtistName);
      console.log(availableSongs);

      // Use songsData to display available songs in the dropdown
    } catch (error) {
      console.error('Error fetching songs: ', error.message);
    }
  };

  // Call the fetchSongs function when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className='createPlaylistForm'>
        <form onSubmit={handleSubmit}>
        <label> Playlist Title: </label>
        <input type="text" value={title} onChange={handleTitleChange} />

        <br />

        <label> Select Songs: </label>
        <select multiple value={selectedSongs} onChange={handleSongSelection}>
            {availableSongs.map((song) => (
            <option key={song.id} value={song.id}>
                {song.title} - {song.artistName}
            </option>
            ))}
        </select>

        <br />
        <button type="submit">Create Playlist</button>
        </form>
    </div>
  );
};

export default CreatePlaylistForm;

