import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        console.log('Login successful', data);
        navigate('/admin');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login failed', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center ">Login</h2>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 ">
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Login
          </button>
        </form>
        {/* Uncomment if needed */}
        {/* <div className="text-sm text-center text-blue-500 hover:underline">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
