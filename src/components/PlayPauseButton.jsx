
import React from 'react';
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from 'react-icons/fa6';
import { usePlayer } from './PlayerContext';


const PlayPauseButton = () => {
  const { isPlaying, currentAudioUrl, playPauseToggle } = usePlayer();

  return (
    <div>
      {isPlaying ? (
        <FaCirclePause className='pauseBtn'/>
      ) : (
        <FaCirclePlay className='playBtn'/>
      )}
    </div>
  );
};

export default PlayPauseButton;
