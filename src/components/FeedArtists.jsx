
import React, { useEffect, useState } from 'react';
import { fetchArtists } from './../FirebaseFunctions';
import { useNavigate } from 'react-router-dom';

function FeedArtists() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  function handleArtistClick(artistId) {
    navigate(`/artists/${artistId}`);
  }

  useEffect(() => {
    // Fetch artists data from Firestore
    const fetchData = async () => {
      const artistsData = await fetchArtists();
      setArtists(artistsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Artists</h2>

      <div className="artistsContainer">
        {artists.slice(0, 4).map((artist, index) => (
          <div key={index} className="artistCard" onClick={() => handleArtistClick(artist.id)}>
            {/* Display artist information */}
            <img src={artist.coverImageUrl} alt={`Artist ${index + 1}`} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedArtists;
