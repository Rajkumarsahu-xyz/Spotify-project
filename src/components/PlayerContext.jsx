
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState('');
  const [currentSong, setCurrentSong] = useState(null);

  const playPauseToggle = (audioUrl, title, artist, imgUrl, songId) => {
    if (isPlaying && audioUrl === currentAudioUrl) {
      setIsPlaying(false);
      setCurrentAudioUrl('');
      setCurrentSong(null);
    } else {
      setIsPlaying(true);
      setCurrentAudioUrl(audioUrl);
      setCurrentSong({ title, artist, imgUrl, songId });
    }
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, currentAudioUrl, currentSong, playPauseToggle }}>
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export { PlayerProvider, usePlayer };
