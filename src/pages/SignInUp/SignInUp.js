import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import './SignInUp.css';

const SignInUp = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    usn: '',
    role: 'nonmember', // default role
    team: '', // optional field
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn();
      if (user) {
        navigate('/zenith');
      } else {
        setError('Please use CSI Email ID');
      }
    } catch (error) {
      console.log(error);
      setError('Google Sign In failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
        const endpoint = isSignUp ? '/api/signup' : '/api/login';
        const response = await fetch(endpoint, { // Changed to relative path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        setSuccess(data.message);
        localStorage.setItem('user', JSON.stringify(data));
        
        setTimeout(() => {
            navigate('/zenith');
        }, 1000);

    } catch (err) {
        setError(err.message);
    }
};


  return (
    <div className="signinup-container">
      <h1>Welcome to the Computer Society of India</h1>

      <button onClick={handleGoogleSignIn} className="google-auth-button">
        Sign In with Google
      </button>
      
      <div className="divider">
        <span>OR</span>
      </div>

      <div className="form-toggle">
        <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>Sign In</button>
        <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {isSignUp && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>USN</label>
              <input
                type="text"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                required
                placeholder="Enter your USN"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role (e.g., nonmember)"
              />
            </div>
            <div className="form-group">
              <label>Team (Optional)</label>
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Enter team (e.g., technical)"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="auth-button">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        {isSignUp ? (
          <p>Already have an account? <button onClick={() => setIsSignUp(false)}>Sign In</button></p>
        ) : (
          <p>Don't have an account? <button onClick={() => setIsSignUp(true)}>Sign Up</button></p>
        )}
      </div>
    </div>
  );
};

export default SignInUp;
