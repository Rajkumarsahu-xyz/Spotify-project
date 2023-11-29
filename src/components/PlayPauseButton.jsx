import React, { useState } from 'react';
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from "react-icons/fa6";

const PlayPauseButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div>
      {isPlaying ? (
        <FaCirclePause className='pauseBtn' onClick={handleToggle} />
      ) : (
        <FaCirclePlay className='playBtn'  onClick={handleToggle} />
      )}
    </div>
  );
};

export default PlayPauseButton;
