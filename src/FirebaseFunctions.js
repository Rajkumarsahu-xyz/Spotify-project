import { getFirestore, collection, addDoc, doc as firestoreDoc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, storage } from './firebase';
// import { doc } from '@firebase/firestore';

const db = getFirestore(app);

export const createAlbum = async (title, coverImageUrl, artistId) => {
  const albumRef = await addDoc(collection(db, 'albums'), {
    title,
    coverImageUrl,
    songs: [],
    artist_id: artistId, // Add artist_id to the album data
  });
  console.log(artistId);
  return albumRef.id;
};

export const addSongToAlbum = async (albumId, name, genre, tags, file, artistId) => {
    const albumDocRef = firestoreDoc(db, 'albums', albumId);
  
    try {
      // Upload song file to Firebase Storage
      const songRef = ref(storage, `Songs/${name}`);
      await uploadBytes(songRef, file);
  
      // Get download URL for the song file
      const songUrl = await getDownloadURL(songRef);
  
      // Retrieve existing album data
      const albumDoc = await getDoc(albumDocRef);
      const album = albumDoc.data();
  
      // Add song details to the album
      const updatedSongs = [...album.songs, { name, genre, tags, audioUrl: songUrl }];
      await setDoc(albumDocRef, {
        songs: updatedSongs,
        title: album.title,
        coverImageUrl: album.coverImageUrl,
        artist_id: artistId,
      });
    } catch (error) {
      console.error('Error adding song to album:', error.message);
    }
  };

  export const updateArtistWithAlbum = async (artistId, artistName, albumId, artistGenre) => {
    const artistDocRef = firestoreDoc(db, 'artists', artistId);
    console.log(artistDocRef);
  
    try {
      // Retrieve existing artist data
      const artistDoc = await getDoc(artistDocRef);
      console.log(artistDoc);
      const artist = artistDoc.data();

      console.log(artist);

      if(!artist) {
        await setDoc(artistDocRef, {
          name: artistName,
          Album: [albumId],
          genre: artistGenre,
        });
      }
  
      // Add album_id to the artist's data
      else {
        const updatedAlbums = [...(artist.Album || []), albumId];
        console.log(updatedAlbums);
        await setDoc(artistDocRef, {
          name: artistName,
          Album: updatedAlbums,
          genre: artistGenre,
          // Add any other fields you may have in the artist document
        });
      }

    } catch (error) {
      console.error('Error updating artist with album:', error.message);
    }
  };

export const fetchArtists = async () => {
  try {
    const artistsCollection = collection(db, 'artists');
    const artistsSnapshot = await getDocs(artistsCollection);

    const artistsData = await Promise.all(
      artistsSnapshot.docs.map(async (doc) => {
        const artist = { id: doc.id, ...doc.data() };

        // Assuming there's a field like 'Album' in the artist document
        if (artist.Album) {
          const firstAlbumId = artist.Album[0];

          // Fetch the album details based on the first album ID
          // const albumDoc = await getDoc(doc(db, 'albums', firstAlbumId));
          const albumDoc = await getDoc(firestoreDoc(db, 'albums', firstAlbumId));
          const albumData = albumDoc.data();

          // Get the cover image URL from the album data
          artist.coverImageUrl = albumData ? albumData.coverImageUrl : null;
        }

        return artist;
      })
    );
    
    return artistsData;
  } catch (error) {
    console.error('Error fetching artists:', error.message);
    return [];
  }
};
