// import React, { useEffect, useState } from "react";
// import { CiHeart } from "react-icons/ci";
// import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
// import PlayPauseButton from "./PlayPauseButton";
// import { HiOutlineQueueList } from "react-icons/hi2";
// import { usePlayer } from "./PlayerContext";

// function Playbar() {
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const { isPlaying, playPauseToggle, currentAudioUrl } = usePlayer();
  
//     // useEffect(() => {
//     //   const audioElement = document.getElementById('audio-element');
  
//     //   const updateTime = () => {
//     //     setCurrentTime(audioElement.currentTime);
//     //     setDuration(audioElement.duration);
//     //   };
  
//     //   audioElement.addEventListener('timeupdate', updateTime);
  
//     //   return () => {
//     //     audioElement.removeEventListener('timeupdate', updateTime);
//     //   };
//     // }, []);
  
//     const handleSeek = (e) => {
//     //   const audioElement = document.getElementById('audio-element');
//     //   const { value } = e.target;
//     //   audioElement.currentTime = value;
//     };

//     return (
//         <div className="bottomPlaybar">
//             <div className="songDetails">
//                 <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"} alt="" />
//                 <div>
//                     <h3>Song</h3>
//                     <p>Artist</p>
//                 </div>
//                 <CiHeart className="likeBtn"/>
//             </div>

//             <div className="audioPlayer">
//                 <div>
//                     <MdSkipPrevious className="prevSong"/>
//                     <PlayPauseButton />
//                     <MdSkipNext className="nextSong"/>
//                 </div>
//                 <progress id="progress-bar" value={currentTime} max={duration || 1} onClick={handleSeek}></progress>

//             </div>
//             <div className="queueBtnDiv">
//                 <HiOutlineQueueList className="queueBtn"/>
//             </div>
//         </div>
//     );
// }

// export default Playbar;






// import React, { useEffect, useState } from 'react';
// import { CiHeart } from 'react-icons/ci';
// import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
// import PlayPauseButton from './PlayPauseButton';
// import { HiOutlineQueueList } from 'react-icons/hi2';
// import { FaCirclePause } from 'react-icons/fa6';
// import { FaCirclePlay } from 'react-icons/fa6';
// import { usePlayer } from './PlayerContext';
//  // Update with the correct path

// function Playbar() {
//   const { isPlaying, playPauseToggle, currentAudioUrl } = usePlayer();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   // useEffect(() => {
//   //   const audioElement = document.getElementById('audio-element');

//   //   const updateTime = () => {
//   //     setCurrentTime(audioElement.currentTime);
//   //     setDuration(audioElement.duration);
//   //   };

//   //   audioElement.addEventListener('timeupdate', updateTime);

//   //   return () => {
//   //     audioElement.removeEventListener('timeupdate', updateTime);
//   //   };
//   // }, []);

//   const handleSeek = (e) => {
//     //   const audioElement = document.getElementById('audio-element');
//     //   const { value } = e.target;
//     //   audioElement.currentTime = value;
//   };

//   const togglePlay = (audioUrl) => {
//     playPauseToggle(audioUrl);
//   };

//   return (
//     <div className='bottomPlaybar'>
//       <div className='songDetails'>
//         <img
//           src={
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU'
//           }
//           alt=''
//         />
//         <div>
//           <h3>Song</h3>
//           <p>Artist</p>
//         </div>
//         <CiHeart className='likeBtn' />
//       </div>


//         <div className='audioPlayer'>
//             <div>
//                 <MdSkipPrevious className='prevSong' />
//                 <div onClick={() => togglePlay(currentAudioUrl)}>
//                     {isPlaying ? (
//                         <FaCirclePause className='pauseBtn'/>
//                     ) : (
//                         <FaCirclePlay className='playBtn'/>
//                     )}
//                 </div>
//                 {/* <PlayPauseButton onClick={() => togglePlay(currentAudioUrl)}/> */}
//                 <MdSkipNext className='nextSong' />
//             </div>
//             <audio id='audio-element' src={currentAudioUrl} autoPlay={isPlaying}></audio>
//             <progress id='progress-bar' value={currentTime} max={duration || 1} onClick={handleSeek}></progress>
//         </div>


//       {/* <div className='audioPlayer'>
//         <div>
//           <MdSkipPrevious className='prevSong' />
//           <PlayPauseButton />
//           <MdSkipNext className='nextSong' />
//         </div>
//         <progress id='progress-bar' value={currentTime} max={duration || 1} onClick={handleSeek}></progress>
//       </div> */}
//       <div className='queueBtnDiv'>
//         <HiOutlineQueueList className='queueBtn' />
//       </div>
//     </div>
//   );
// }

// export default Playbar;







// import React, { useEffect, useState } from 'react';
// import { CiHeart } from 'react-icons/ci';
// import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
// import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
// import { HiOutlineQueueList } from 'react-icons/hi2';
// import { usePlayer } from './PlayerContext'; // Update with the correct path

// function Playbar() {
//   const { isPlaying, playPauseToggle, currentAudioUrl } = usePlayer();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);



//   const handleSeek = (e) => {
//     const audioElement = document.getElementById('audio-element');
//     const { value } = e.target;
//     audioElement.currentTime = value;
//   };

//   const togglePlay = () => {
//     playPauseToggle(currentAudioUrl);
//   };

//   return (
//     <div className='bottomPlaybar'>
//       <div className='songDetails'>
//         {/* Replace with actual song details from your player context */}
//         <img
//           src={
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU'
//           }
//           alt=''
//         />
//         <div>
//           <h3>Song Title</h3>
//           <p>Artist Name</p>
//         </div>
//         <CiHeart className='likeBtn' />
//       </div>

//       <div className='audioPlayer'>
//         <div>
//           <MdSkipPrevious className='prevSong' />
//           <div onClick={togglePlay}>
//             {isPlaying ? (
//               <FaCirclePause className='pauseBtn' />
//             ) : (
//               <FaCirclePlay className='playBtn' />
//             )}
//           </div>
//           <MdSkipNext className='nextSong' />
//         </div>
//         <audio id='audio-element' src={currentAudioUrl} autoPlay={isPlaying}></audio>
//         <progress id='progress-bar' value={currentTime} max={duration || 1} onClick={handleSeek}></progress>
//       </div>

//       <div className='queueBtnDiv'>
//         <HiOutlineQueueList className='queueBtn' />
//       </div>
//     </div>
//   );
// }

// export default Playbar;





// import React, { useEffect, useState } from 'react';
// import { CiHeart } from 'react-icons/ci';
// import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
// import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
// import { HiOutlineQueueList } from 'react-icons/hi2';
// import { usePlayer } from './PlayerContext'; // Update with the correct path

// function Playbar() {
//   const { isPlaying, playPauseToggle, currentAudioUrl } = usePlayer();
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const audioElement = document.getElementById('audio-element');

//     const updateTime = () => {
//       setCurrentTime(audioElement.currentTime);
//       setDuration(audioElement.duration);
//     };

//     audioElement.addEventListener('timeupdate', updateTime);

//     return () => {
//       audioElement.removeEventListener('timeupdate', updateTime);
//     };
//   }, [currentAudioUrl]);

// //   const handleSeek = (e) => {
// //     const audioElement = document.getElementById('audio-element');
// //     const { value } = e.target;
// //     console.log(value);
// //     audioElement.currentTime = value;
// //   };

    // const handleSeek = (e) => {
    //     const audioElement = document.getElementById('audio-element');
    
    //     if (!audioElement) {
    //     console.error("Audio element not found");
    //     return;
    //     }
    
    //     const { value, offsetWidth } = e.target;
    //     console.log(value);
    //     console.log(e.target, offsetWidth);
    //     const percentage = (value / offsetWidth);
    //     const newTime = percentage * audioElement.duration;
    //     console.log(newTime);
        
    //     audioElement.currentTime = (newTime*10);
    // };

//   const togglePlay = () => {
//     playPauseToggle(currentAudioUrl);
//   };

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   return (
//     <div className='bottomPlaybar'>
//       <div className='songDetails'>
//         {/* Replace with actual song details from your player context */}
//         <img
//           src={
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU'
//           }
//           alt=''
//         />
//         <div>
//           <h3>Song Title</h3>
//           <p>Artist Name</p>
//         </div>
//         <CiHeart className='likeBtn' />
//       </div>

//       <div className='audioPlayer'>
//         <div>
//           <MdSkipPrevious className='prevSong' />
//           <div onClick={togglePlay}>
//             {isPlaying ? (
//               <FaCirclePause className='pauseBtn' />
//             ) : (
//               <FaCirclePlay className='playBtn' />
//             )}
//           </div>
//           <MdSkipNext className='nextSong' />
//         </div>
//         <audio id='audio-element' src={currentAudioUrl} autoPlay={isPlaying} ></audio>
//         <div className="progress-container">
//           <span className="current-time">{formatTime(currentTime)}</span>
//           <progress id='progress-bar' value={currentTime} max={duration || 1} onClick={handleSeek}></progress>
//           <span className="duration">{formatTime(duration)}</span>
//         </div>
//       </div>

//       <div className='queueBtnDiv'>
//         <HiOutlineQueueList className='queueBtn' />
//       </div>
//     </div>
//   );
// }

// export default Playbar;









import React, { useEffect, useRef, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import PlayPauseButton from './PlayPauseButton';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import { usePlayer } from './PlayerContext'; // Update with the correct path

function Playbar() {
  const { isPlaying, playPauseToggle, currentAudioUrl, currentSong } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = document.getElementById('audio-element');

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('timeupdate', updateTime);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const handleSeek = (e) => {
    const audioElement = document.getElementById('audio-element');

    if (!audioElement) {
    console.error("Audio element not found");
    return;
    }

    const { value, offsetWidth } = e.target;
    const percentage = (value / duration);
    const newTime = percentage * duration;
    console.log('aud ', duration);
    console.log(newTime);
    
    audioElement.currentTime = newTime 
};


const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const togglePlay = () => {
    playPauseToggle(currentAudioUrl);
  };

  const handleTimeUpdate = () => {
    // Update the total duration when the audio is loaded
    setDuration(audioRef.current.duration);
// setCurrentTime(audioRef.current.currentTime);
  };

  // useEffect(() => {
  //   // Update the total duration when the audio is loaded
  //   setDuration(audioRef.current.duration);

  //   // Update the current time continuously for smooth progress bar updates
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(audioRef.current.currentTime);
  //   }, 100);

  //   return () => clearInterval(intervalId);
  // }, []);

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickedTime = (clickPosition / progressBarWidth) * duration;

    // Set the audio's current time to the clicked time
    audioRef.current.currentTime = clickedTime;
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
        <CiHeart className='likeBtn' />
      </div>

      <div className='audioPlayer'>
        <div>
          <MdSkipPrevious className='prevSong' />
          <div onClick={togglePlay}>
            {isPlaying ? <FaCirclePause className='pauseBtn' /> : <FaCirclePlay className='playBtn' />}
          </div>
          <MdSkipNext className='nextSong' />
        </div>
        <audio ref={audioRef} id='audio-element' src={currentAudioUrl} autoPlay={isPlaying}></audio>
        <div className="progress-container">
          <span className="current-time">{formatTime(currentTime)}</span>
          <progress id='progress-bar' value={(currentTime / duration) * 100} max={duration || 1} onClick={handleSeek}></progress>
          <span className="duration">{formatTime(duration)}</span>
        </div>

{/* <div
        className="progress-bar"
        onClick={handleProgressBarClick}
        style={{ width: '100%', height: '20px', backgroundColor: '#ddd', cursor: 'pointer' }}
      >
        <div
          style={{
            width: `${(audioRef.current.currentTime / duration) * 100}%`,
            height: '100%',
            backgroundColor: '#4caf50',
          }}
        ></div>
      </div> */}




        {/* <progress id='progress-bar' value={(currentTime / duration) * 100} max='100' onClick={handleSeek}></progress> */}
      </div>

      <div className='queueBtnDiv'>
        <HiOutlineQueueList className='queueBtn' />
      </div>
    </div>
  );
}

export default Playbar;
