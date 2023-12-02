
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import React from 'react';
import RecentlyPlayed from "./RecentlyPlayed";
import FeedArtists from "./FeedArtists";
import FeedAlbums from "./FeedAlbums";
import { Link } from "react-router-dom";
// import SignInOut from "../SignInOut";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './../firebase';

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

