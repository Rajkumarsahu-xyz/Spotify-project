import React from "react";

function FeedArtists() {
  return (
    <div>
      <h2>Artists</h2>

      <div className="artistsContainer">
        <div className="artistCard">
          {/* <img src={'/home/raj/Documents/Spotify-project/spotify-project/src/assets/download.jpeg'} alt="" /> */}
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"
            }
            alt=""
          />
          <p>Artist 1</p>
        </div>
        <div className="artistCard">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"
            }
            alt=""
          />
          <p>Artist 2</p>
        </div>
        <div className="artistCard">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"
            }
            alt=""
          />
          <p>Artist 3</p>
        </div>
        <div className="artistCard">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIEIue_xdN_kbYQPV5UeGxiA76CQk_hybY2lfCW6XRJaXKWNe9a1ZYUbl40AradJnxZDQ&usqp=CAU"
            }
            alt=""
          />
          <p>Artist 4</p>
        </div>
      </div>
    </div>
  );
}

export default FeedArtists;
