import { useState } from 'react';

function App() {
  const [fullName, setFullName] = useState('');
  const [screen, setScreen] = useState('register'); // screen states: register, login, welcome
  const [message, setMessage] = useState('');

  // Function to handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
   const response = await fetch('https://onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName })
    });
    const data = await response.json();
    alert(data.message);
    setScreen('login'); // Automatically move to login screen
    setFullName('');    // Clear input
  };

  // Function to handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
   const response = await fetch('https://onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName })
    });
    const data = await response.json();
    
    if (data.success) {
      setMessage(data.message);
      setScreen('welcome');
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      
      {/* 1. REGISTER SCREEN */}
      {screen === 'register' && (
        <form onSubmit={handleRegister}>
          <h2>Register Account</h2>
          <input 
            type="text" 
            placeholder="Enter Full Name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
            style={{ padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px' }}>Register</button>
        </form>
      )}

      {/* 2. LOGIN SCREEN */}
      {screen === 'login' && (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input 
            type="text" 
            placeholder="Enter Full Name to Login" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
            style={{ padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px' }}>Sign In</button>
        </form>
      )}

      {/* 3. WELCOME SCREEN */}
      {screen === 'welcome' && (
        <div>
          <h1 style={{ color: 'green' }}>Successfully Signed In!</h1>
          <h2>{message}</h2>
          <button onClick={() => setScreen('register')} style={{ padding: '10px' }}>Start Over</button>
        </div>
      )}

    </div>
  );
}

export default App;
