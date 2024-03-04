import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';

import { initializeApp } from "firebase/app";
import { firebaseConfig } from './Config';
import firebase from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get authentication instance
const auth = getAuth(app);


// Import your other components here as needed


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
          setEmail('');
          setPassword('');
          setUsername('');

        } catch (error) {
          setErrorMessage(error.message);
      }
  };

  const welcomeDiv = user === null ? <h1>Sign in or Sign-up below!</h1> : <Alert color="info">Hello, {user.displayName}</Alert>;
  const errorDiv = errorMessage === "" ? "" : <Alert color='danger'>Error: {errorMessage}</Alert>;
 

  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isReadytoSubmit = !!user || (!isValidEmail(email) || password === '');

  // Create (and render) divs to welcome the user / show errors 
  return (
    <Container>
      {welcomeDiv}
      <FormGroup floating>
      <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          valid={isValidEmail(email)}
          invalid={!isValidEmail(email)}
          value={email}
          onChange={(event) => handleChange(event)}
        />
        <Label for="email">Email</Label>
      </FormGroup>

      <FormGroup floating>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => handleChange(event)}
        />
        <Label>Password</Label>
      </FormGroup>

      <FormGroup floating>
        
        <Input
          id="username"
          //no type for username
          name="username"
          placeholder="Username"
          value={username}
          onChange={(event) => handleChange(event)}
        />
        <Label>Username</Label>
      </FormGroup>

      <FormGroup>
        <Button color="primary" className="mr-2" onClick={handleSignUp} disabled={isReadytoSubmit || username === ''}>
          Sign Up
        </Button>
        {' '}
        <Button color="success" className="mr-2" onClick={handleSignIn} disabled={isReadytoSubmit || username !== ''}>
          Sign In
        </Button> 
        {' '}
        <Button color="danger" className="mr-2" onClick={handleSignOut} disabled={user === null}>
          Sign Out
        </Button>
      </FormGroup>
      {errorDiv}
    </Container>
  );
}

export default App;
