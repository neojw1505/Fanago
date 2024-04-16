// Old code/component

"use client";
import React, { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // Handle sign up logic
      console.log('Signing up with email:', email, 'and password:', password);
    } else {
      // Handle login logic
      console.log('Logging in with email:', email, 'and password:', password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-2/6 bg-white p-6 rounded-md shadow-default dark:bg-boxdark">
        <h1 className="text-2xl font-semibold mb-6">{isNewUser ? 'Sign In' : 'Log In'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary"
              required
            />
          </div>

          <button
            onClick={() => window.location.href = 'http://localhost:3000/'}
            className="bg-primary text-white px-4 py-2 rounded-md">
            Sign In
          </button>

        </form>
        <p className="mt-3">
          {isNewUser
            ? "Don't have an account yet? "
            : "Already have an account? "}
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-primary font-semibold"
          >
            {isNewUser ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
