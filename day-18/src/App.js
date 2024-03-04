import React, { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from './Config';
import firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Import your other components here


function App() {
  // Set initial state using useState
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Listen to state authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        // If there is a user, set the state of `user`
        if (user) {
          setUser(user);
          setEmail('');
          setPassword('');
          setErrorMessage('');
        } else {
          setUser(null);
        }
    });
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Method for handling changes to forms
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Use separate state setters for each field
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'username') setUsername(value);
  };

  // Method for handling someone signing up 
  const handleSignUp = async () => {
      try {
          // Create a new user and save their information
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update the display name of the user
            await updateProfile(userCredential.user, { displayName: username });
            setUsername('');
          // Set the state as the current (firebase) user
          setUser(userCredential.user);
          console.log(user);
        } catch (error) {
          setErrorMessage(error.message);
      }
  };

  // Method for handling someone signing in
  const handleSignIn = async () => {
      try {
          // Sign in the user
          await signInWithEmailAndPassword(auth, email, password);
          console.log(user);

      } catch (error) {
          setErrorMessage(error.message);
      }
  };

  // Method for handling someone signing out
  const handleSignOut = async () => {
      try {
          // Sign out the user
          await signOut(auth);

        } catch (error) {
          setErrorMessage(error.message);
      }
  };

  let welcomeDiv = user === null ? <h1>Sign in or Sign-up below!</h1> : <div className='alert alert-info'>Hello, {user.displayName}!</div>;
  let errorDiv = errorMessage === "" ? "" : <div className='alert alert-danger'>Error: {errorMessage}!</div>;

  // Create (and render) divs to welcome the user / show errors 
  return (
    <div className="container">
        {welcomeDiv}
        <div className="form-group">
            <label>Email:</label>
            <input
                className="form-control"
                name="email"
                value={email}
                onChange={(event) => handleChange(event)}
            />
        </div>

        <div className="form-group">
            <label>Password:</label>
            <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(event) => handleChange(event)}
            />
        </div>

        <div className="form-group">
            <label>Username:</label>
            <input
                className="form-control"
                name="username"
                value={username}
                onChange={(event) => handleChange(event)}
            />
        </div>

        <div className="form-group">
            <button className="btn btn-primary mr-2" onClick={handleSignUp}>
                Sign Up
            </button>
            <button className="btn btn-success mr-2" onClick={handleSignIn}>
                Sign In
            </button>
            <button className="btn btn-danger mr-2" onClick={handleSignOut}>
                Sign Out
            </button>
        </div>

        {errorMessage && (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        )}
    </div>
  );
}

export default App;
