import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, GoogleAuthProvider, signInWithPopup, signOut } from './firebase';
import TeamComponent from './TeamComponent'; // Import your TeamComponent
import './App.css';

function App() {
  const [user] = useAuthState(auth);
  const [teamID, setTeamID] = useState('your_dynamic_team_id'); // Replace with actual dynamic logic

  useEffect(() => {
    console.log('Firebase app initialized:', auth.app.name); // Should log "[DEFAULT]"
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Chat Room</h1>
        <SignOut />
      </header>

      <section className='app-section'>
        {user ? (
          <TeamComponent teamID={teamID} userID={user.uid} /> // Pass user ID and team ID
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}

export default App;
