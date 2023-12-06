
import React, { useEffect, useRef, useState } from 'react';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { usePlayer } from './PlayerContext';
import Like from './Like';
import {auth, db} from '../firebase';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

function Playbar() {
  const { isPlaying, playPauseToggle, currentAudioUrl, currentSong } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    const userId = user?.uid;
    const songId = currentSong?.songId;

    if (userId && songId) {
      const likesRef = collection(db, 'likes');

      getDocs(query(likesRef, where('user_id', '==', userId), where('song_id', '==', songId)))
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        })
        .catch((error) => {
          console.error('Error checking likes:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }


    if (!audioRef.current) return;

    const updateProgress = () => {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      progressBarRef.current.style.width = `${percentage}%`;
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSong, user]);



  const handleLikeClick = () => {
    const userId = user?.uid;
    const songId = currentSong?.songId;
  
    if (userId && songId) {
      const likesRef = collection(db, 'likes');

      getDocs(query(likesRef, where('user_id', '==', userId), where('song_id', '==', songId)))
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const likeDoc = querySnapshot.docs[0];
            deleteDoc(likeDoc.ref);
            setIsLiked(false);
          } else {
            addDoc(likesRef, { user_id: userId, song_id: songId, isLiked: true })
              .then(() => setIsLiked(true))
              .catch((error) => console.error('Error adding like:', error));
          }
        })
        .catch((error) => {
          console.error('Error checking likes:', error);
        });
    }
  };

  const handleProgressBarClick = (e) => {
    if (!isPlaying) {
      return; // If not playing, do nothing
    }
  
    const progressBar = document.getElementById('progressBar')
    console.log(progressBar.getBoundingClientRect().width);

    console.log(e.nativeEvent.offsetX);
    console.log(e.nativeEvent.offsetX/576);
    console.log(duration);

    const newTime = ((e.nativeEvent.offsetX/progressBar.getBoundingClientRect().width)*duration);
    console.log(newTime);

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if(!isPlaying) {
      return;
    }
    playPauseToggle(currentAudioUrl, currentSong.title, currentSong.artist, currentSong.imgUrl, currentSong.songId);
  };

  const handleTimeUpdate = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className='bottomPlaybar'>
      <div className='songDetails'>
        {currentSong && (
          <>
            <img src={currentSong.imgUrl} alt='Album Cover' />
            <div>
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </div>
          </>
        )}
        {!isLoading && isPlaying && <Like isLiked={isLiked} onClick={handleLikeClick} />}
      </div>

      <div className='audioPlayer'>
        <div>
          <MdSkipPrevious className='prevSong' />
          <div onClick={togglePlay}>
            {isPlaying ? <FaCirclePause className='pauseBtn' style={{ fontSize: "1.75rem" }} /> : <FaCirclePlay className='playBtn' style={{ fontSize: "1.75rem" }} />}
          </div>
          <MdSkipNext className='nextSong' />
        </div>

        <div className="progress-container" >
          <span className="current-time">{formatTime(currentTime)}</span>
          {<audio ref={audioRef} id='audio-element' src={currentAudioUrl} autoPlay={isPlaying} onTimeUpdate={handleTimeUpdate}></audio>}
          <div className="progressBar" id="progressBar" onClick={handleProgressBarClick}>
            <div id='progress' ref={progressBarRef}></div>
          </div>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className='queueBtnDiv'>
        <HiOutlineQueueList className='queueBtn' />
      </div>
    </div>
  );
}

export default Playbar;
