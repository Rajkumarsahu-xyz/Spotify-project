// Create a new file, e.g., PlayerContext.js
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState('');

  const playPauseToggle = (audioUrl) => {
    if (isPlaying && audioUrl === currentAudioUrl) {
      setIsPlaying(false);
      setCurrentAudioUrl('');
    } else {
      setIsPlaying(true);
      setCurrentAudioUrl(audioUrl);
    }
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, currentAudioUrl, playPauseToggle }}>
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
