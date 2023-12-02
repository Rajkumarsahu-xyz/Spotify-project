
import React from 'react';
import RecentlyPlayed from "./RecentlyPlayed";
import FeedArtists from "./FeedArtists";
import FeedAlbums from "./FeedAlbums";

function Home() {
    // const [user] = useAuthState(auth);
    return (
        <div className='home-container'>
            {/* <MdArrowBackIosNew className="arrowheads"/>
            <MdArrowForwardIos className="arrowheads"/>
            <SignInOut/>
            {user && <h1>Welcome, {user.displayName || 'User'}!</h1>} */}
            
            {/* <Link to='/login'>
                <CgProfile className='LoginIcon'/>
            </Link> */}
            
            <RecentlyPlayed/>
            <FeedArtists/>
            <FeedAlbums/>

        </div>
    );
}

export default Home;

