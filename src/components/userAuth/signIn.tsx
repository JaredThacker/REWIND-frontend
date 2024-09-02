import React, { useState } from 'react';

interface UserSignInProps {
  onSignIn: (username: string) => void;
}

const UserSignIn: React.FC<UserSignInProps> = ({ onSignIn }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response for logging in was not ok :(');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      onSignIn(username); // Notify parent component
      setOpen(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation for logging in :(', error);
    }
  };

  return (
    <div>
      {open ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)}>Sign In</button>
      )}
    </div>
  );
};

export default UserSignIn;
