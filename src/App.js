import React, { useEffect, useState } from 'react';
import SignInOut from './SignInOut';
import UserInfo from './UserInfo';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home';
import LeftSideContainer from './components/LeftSideContainer';
import RightSideContainer from './components/RightSideContainer';
import { Route, Routes } from 'react-router-dom';
import Playbar from './components/Playbar';

const App = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className='appContainer'>
      
      <LeftSideContainer/>
       <Home/>
      <RightSideContainer/>
      <Playbar/>
    </div>
  );
};

export default App;
