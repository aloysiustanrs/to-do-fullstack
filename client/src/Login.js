// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);

        navigate('/');
        console.log('Login successful');
      } else {
        console.error(`Login failed with status ${response.status}: ${response.statusText}`);

        if (response.status === 401) {
          console.log('Unauthorized - Invalid credentials');
        } else {
          console.log('Other error occurred');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const jwtToken = localStorage.getItem('token');
  const hasToken = Boolean(jwtToken);

  return (
    <div>
      {hasToken ? (
        navigate('/home')
      ) : (
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
