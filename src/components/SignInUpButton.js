// components/SignInUpButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authProvider';
import { useNavigate } from 'react-router-dom';

const SignInUpButton = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut(); // Call the sign-out function
      alert('You have been logged out.');
    } else {
      navigate('/signinup'); // Redirect to sign-in/up page
    }
  };

  return (
    <button onClick={handleAuthClick}>
      {user ? 'Logout' : 'Sign In / Sign Up'}
    </button>
  );
};

export default SignInUpButton;
