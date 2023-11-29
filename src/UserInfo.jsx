
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const UserInfo = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.displayName}!</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserInfo;
