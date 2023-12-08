
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { toast } from 'react-toastify';

const CreatePlaylistForm = () => {
  const [title, setTitle] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [newlyCreatedPlaylist, setNewlyCreatedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSongSelection = (e) => {
    const selectedSongInfo = JSON.parse(e.target.value);
    console.log(selectedSongInfo.id);
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, { id: selectedSongInfo.id, audioUrl: selectedSongInfo.audioUrl, title: selectedSongInfo.title}]);
  };

  function selectSongs(event) {
    const selectedOption = event.target;
    if (selectedOption.tagName === 'OPTION') {
      selectedOption.style.backgroundColor = "black";
      selectedOption.style.color = "white";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!auth.currentUser) {
      console.error('User not authenticated.');
      return;
    }

      setLoading(true);

    // Get the current user's information
    const { uid, displayName } = auth.currentUser;
    setUser({ uid, displayName });

    // Create a new playlist document in Firestore
    try {
      const playlistsCollection = collection(db, 'playlists');
      const newPlaylistDoc = await addDoc(playlistsCollection, {
        title: title,
        songs: selectedSongs,
        createdBy: {
          userId: uid,
          username: displayName,
        },
      });

      setNewlyCreatedPlaylist({
        title: title,
        songs: selectedSongs,
        createdBy: {
          userId: uid,
          username: displayName,
        },
      });

      console.log('Playlist created with ID:', newPlaylistDoc.id);
    } catch (error) {
      console.error('Error creating playlist:', error.message);
    }

    setLoading(false);
    toast.success('Playlist created successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  };

  // Call the fetchSongs function when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <div className='createPlaylistForm'>
        <form onSubmit={handleSubmit}>
          <label>Playlist Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
          
          <br />

          <label>Select Songs:</label>
          <select multiple value={selectedSongs} onChange={handleSongSelection}>
            {availableSongs.map((song) => (
              <option key={song.id} value={JSON.stringify({ id: song.id, title: song.title, audioUrl: song.audioUrl })} onClick={selectSongs}>
                {song.title} - {song.artistName}
              </option>
            ))}
          </select>

          <br />

          <button type="submit">Create Playlist</button>
        </form>
      </div>
      {loading && <span className='loader'>Loading</span>}
      {newlyCreatedPlaylist && (
            <div className='newlyCreatedPlaylist'>
                <h2>Newly Created Playlist</h2>
                <h3>{newlyCreatedPlaylist.title} - {newlyCreatedPlaylist.createdBy.username}</h3>
                
                {newlyCreatedPlaylist.songs.map((song, index) => (
                    <div key={index}>
                        <p>Song {index + 1} : {song.title}</p>
                        <audio controls>
                            <source src={`${newlyCreatedPlaylist.songs[index].audioUrl}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CreatePlaylistForm;
