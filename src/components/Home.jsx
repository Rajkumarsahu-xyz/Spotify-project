
import React from 'react';
import RecentlyPlayed from "./RecentlyPlayed";
import FeedArtists from "./FeedArtists";
import FeedAlbums from "./FeedAlbums";

function Home() {
    // const [user] = useAuthState(auth);
    return (
        <div className='home-container'>
            
            <RecentlyPlayed/>
            <FeedArtists/>
            <FeedAlbums/>

        </div>
    );
}

export default Home;

