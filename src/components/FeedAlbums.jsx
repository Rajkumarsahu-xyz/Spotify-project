
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs , query, where} from 'firebase/firestore';
import { app } from './../firebase';
import { Link, useNavigate } from 'react-router-dom';

function FeedAlbums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  function handleAlbumClick(albumId) {
    navigate(`/albums/${albumId}`);
  }

  useEffect(() => {
    // Fetch albums from Firestore
    const fetchAlbums = async () => {
      const db = getFirestore(app);
      const albumsCollection = collection(db, 'albums');
      const albumsSnapshot = await getDocs(albumsCollection);

      // console.log(albumsSnapshot.docs.map(doc => doc.data()));

      const albumsData = albumsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const limitedAlbums = albumsData.slice(0, 4);

      console.log(limitedAlbums);
      setAlbums(limitedAlbums);
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <div className="albumsContainer">
        {albums.map(album => (
          <div key={album.id} className="albumsCard" onClick={() => handleAlbumClick(album.id)}>
              <img src={album.coverImageUrl} alt="" />
              <p>{album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedAlbums;
