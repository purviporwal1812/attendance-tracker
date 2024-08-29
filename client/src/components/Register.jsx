
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        email,
        password,
      });

      if (response.status === 201) {
        alert('User registered successfully.');
        navigate('/mark-attendance');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('User already exists.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" >Register</button>
        <Link to="/users/login" ><p>Already Registered?</p></Link>
      </form>
    </div>
  );
};

export default Register;
