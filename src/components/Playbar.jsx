import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import PlayPauseButton from "./PlayPauseButton";
import { HiOutlineQueueList } from "react-icons/hi2";

function Playbar() {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
  
    // useEffect(() => {
    //   const audioElement = document.getElementById('audio-element');
  
    //   const updateTime = () => {
    //     setCurrentTime(audioElement.currentTime);
    //     setDuration(audioElement.duration);
    //   };
  
    //   audioElement.addEventListener('timeupdate', updateTime);
  
    //   return () => {
    //     audioElement.removeEventListener('timeupdate', updateTime);
    //   };
    // }, []);
  
    const handleSeek = (e) => {
    //   const audioElement = document.getElementById('audio-element');
    //   const { value } = e.target;
    //   audioElement.currentTime = value;
    };

    return (
        <div className="bottomPlaybar">
            <div className="songDetails">
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"} alt="" />
                <div>
                    <h3>Song</h3>
                    <p>Artist</p>
                </div>
                <CiHeart className="likeBtn"/>
            </div>

            <div className="audioPlayer">
                <div>
                    <MdSkipPrevious className="prevSong"/>
                    <PlayPauseButton />
                    <MdSkipNext className="nextSong"/>
                </div>
                <progress id="progress-bar" value={currentTime} max={duration || 1} onClick={handleSeek}></progress>

            </div>
            <div className="queueBtnDiv">
                <HiOutlineQueueList className="queueBtn"/>
            </div>
        </div>
    );
}

export default Playbar;