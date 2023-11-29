
// import React from 'react';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from './firebase';

// const SignIn = () => {
//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error('Error signing in with Google:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       <button onClick={handleGoogleSignIn}>Sign In with Google</button>
//     </div>
//   );
// };

// export default SignIn;


// import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { auth, googleProvider } from './firebase';

// const SignInOut = ({ setUser }) => {
//   const [user] = useAuthState(auth);

//   const handleGoogleAuth = async () => {
//     try {
//       if (!user) {
//         await signInWithPopup(auth, googleProvider);
//       } else {
//         await signOut(auth);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   setUser(user);

//   return (
//     <div>
//       <h2>{user ? 'Sign Out' : 'Sign In'}</h2>
//       <button onClick={handleGoogleAuth}>
//         {user ? 'Sign Out' : 'Sign In with Google'}
//       </button>
//     </div>
//   );
// };

import React from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from './firebase';

const SignInOut = () => {
  const [user] = useAuthState(auth);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      {user ? (
        <button className='loginIcon' onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button className='loginIcon'  onClick={handleGoogleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default SignInOut;
