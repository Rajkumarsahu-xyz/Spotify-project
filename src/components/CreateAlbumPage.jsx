
import React, { useState } from 'react';
import { createAlbum, addSongToAlbum } from '../FirebaseFunctions';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

const CreateAlbumPage = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [songs, setSongs] = useState([
    {
      name: '',
      genre: '',
      tags: '',
      file: null,
    },
  ]);
  const [newlyCreatedAlbum, setNewlyCreatedAlbum] = useState(null);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
  };

  const handleSongFileChange = (event) => {
    const files = event.target.files;
    const newSongs = Array.from(files).map((file) => ({
      file,
      name: '',
      genre: '',
      tags: '',
    }));
    setSongs(newSongs);
  };

  const handleSongNameChange = (index, name) => {
    const updatedSongs = [...songs];
    updatedSongs[index].name = name;
    setSongs(updatedSongs);
  };

  const handleGenreChange = (index, genre) => {
    const updatedSongs = [...songs];
    updatedSongs[index].genre = genre;
    setSongs(updatedSongs);
  };

  const handleTagsChange = (index, tags) => {
    const updatedSongs = [...songs];
    updatedSongs[index].tags = tags;
    setSongs(updatedSongs);
  };

const handleSubmit = async () => {
    // Upload cover image to Firebase Storage
    const coverImageUrl = await uploadFile('AlbumCovers', albumTitle, coverImage);
  
    // Create album in Firestore
    const albumId = await createAlbum(albumTitle, coverImageUrl);
  
    // Add song to the album
    for (const song of songs) {
      await addSongToAlbum(albumId, song.name, song.genre, song.tags, song.file);
    }

    const uploadedSongs = await Promise.all(
        songs.map(async (song) => ({
          name: song.name,
          genre: song.genre,
          tags: song.tags,
          audioUrl: await uploadFile('Songs', song.name, song.file),
        }))
      );

      setNewlyCreatedAlbum({
        id: albumId,
        title: albumTitle,
        coverImageUrl,
        songs: uploadedSongs,
      });
  
    // Reset form state
    setAlbumTitle('');
    setCoverImage(null);
    setSongs([
      {
        name: '',
        genre: '',
        tags: '',
        file: null,
      },
    ]);
  };
  

  const uploadFile = async (folder, fileName, file) => {
    if (file) {
      const storageRef = ref(storage, `${folder}/${fileName}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    }
    return null;
  };

  return (
    <div className='createAlbum-container'>
        <h1>Create an Album</h1>
        <div className='createAlbumForm'>
            <label>Album Title </label>
            <input type="text" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
            <br />
            <label>Add Album Cover Picture </label>
            <input type="file" onChange={handleCoverImageChange} />
            {/* <button onClick={() => handleUpload('cover')}>Upload</button> */}
            <br />
            <label>Add Songs to the Album </label>
            <input type="file" multiple onChange={handleSongFileChange} />

            {songs.map((song, index) => (
            <div key={index}>
                <label>Song {index + 1} Name </label>
                <input
                type="text"
                value={song.name}
                onChange={(e) => handleSongNameChange(index, e.target.value)}
                />
                <br />
                <label>Song {index + 1} Genre </label>
                <input
                type="text"
                value={song.genre}
                onChange={(e) => handleGenreChange(index, e.target.value)}
                />
                <br />
                <label>Song {index + 1} Tags </label>
                <input
                type="text"
                value={song.tags}
                onChange={(e) => handleTagsChange(index, e.target.value)}
                />
                <br />
            </div>
            ))}

            <br />

            <button onClick={handleSubmit}>Create Album</button>
        </div>

        {newlyCreatedAlbum && (
            <div className='newlyCreatedAlbum'>
                <h2>Newly Created Album</h2>
                <h3>{newlyCreatedAlbum.title}</h3>
                <img src={`${newlyCreatedAlbum.coverImageUrl}`} style={{height: "20vh", width:"15vw"}} alt="" />
                {newlyCreatedAlbum.songs.map((song, index) => (
                    <div key={index}>
                        <p>Song {index + 1}: {song.name}</p>
                        <audio controls>
                            <source src={`${newlyCreatedAlbum.songs[index].audioUrl}`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default CreateAlbumPage;