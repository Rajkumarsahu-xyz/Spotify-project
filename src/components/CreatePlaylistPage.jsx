import React from 'react';
import CreatePlaylistForm from './CreatePlaylistForm';
import Home from './Home';
import { Navigate, useHistory, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const CreatePlaylistPage = () => {
    const navigate = useNavigate();
          return (
            <div className='createPlaylist-Container'>
              <h2>Create Playlist</h2>
              <CreatePlaylistForm />
            </div>
          );
  
};

export default CreatePlaylistPage;
