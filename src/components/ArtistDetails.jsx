
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from './../firebase';
import Loader from '../Loader';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const navigate = useNavigate();

  function handleAlbumClick(albumId) {
    navigate(`/albums/${albumId}`);
  }

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const db = getFirestore(app);
      const artistDocRef = doc(db, 'artists', artistId);
      const artistDoc = await getDoc(artistDocRef);

      if (artistDoc.exists()) {
        const artistData = artistDoc.data();

        // Fetch additional details for each album
        const albumDetailsPromises = artistData.Album.map(async (albumId) => {
          const albumDocRef = doc(db, 'albums', albumId);
          const albumDoc = await getDoc(albumDocRef);

          if (albumDoc.exists()) {
            const albumData = albumDoc.data();
            return { id: albumDoc.id, ...albumData };
          } else {
            console.error('Album not found:', albumId);
            return null;
          }
        });

        const albumDetails = await Promise.all(albumDetailsPromises);

        setArtist({ id: artistDoc.id, ...artistData, Album: albumDetails });
      } else {
        console.error('Artist not found');
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artist) {
    return <Loader/>;
  }

  return (
    <div className='artistDetailsContainer'>
      <div className='artistBio'>
        <img src={artist.Album[0].coverImageUrl} alt={artist.name} />
        <h1>{artist.name}</h1>
        <h3>Genre - {artist.genre}</h3>
      </div>
      <div className='artistDetailAlbums'>
        <h2>Albums</h2>
        {artist.Album.map((album, index) => (
          <div key={index} className='artistDetailAlbumsCard' onClick={() => handleAlbumClick(album.id)}>
            <img src={album.coverImageUrl} alt={album.title} />
            <div>
                <h2>{album.title}</h2>
                <h4>Genre - {album.songs[0].genre}</h4>
                <h4>Tags - {album.songs[0].tags}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
