import React, { useEffect, useState } from 'react';

interface UserSignInProps {
  onSignIn: (username: string | null) => void;
}

const UserSignIn: React.FC<UserSignInProps> = ({ onSignIn }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUsername, setStoredUsername] = useState<string | null>(null);

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
      localStorage.setItem("username", username);
      setStoredUsername(username); //update stored state
      onSignIn(username);
      setOpen(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation for logging in :(', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setStoredUsername(null);
    onSignIn(null);
  };

  //check if username is in storage
  useEffect(() => {
    if (typeof window !== 'undefined') { //makes sure this is only run on client's side
      const username = localStorage.getItem("username");
      setStoredUsername(username);
      onSignIn(username);
    }
  }, [onSignIn]);

  return (
    <div>
      {storedUsername ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default UserSignIn;
