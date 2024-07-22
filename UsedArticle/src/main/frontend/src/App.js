// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mainpage from './components/js/Mainpage';
import Login from './components/js/Login';
import SignUp from './components/js/SignUp';
import Chat from './components/js/Chat.jsx';
import Chating from './components/js/Chating.jsx';
import Mypage from './components/js/Mypage.jsx';
import UserSearch from './components/js/UserSearch.jsx';
import Navbar from './components/js/Navbar';
import Footer from './components/js/Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      // Fetch user data if needed
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Mainpage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chating" element={isLoggedIn ? <Chating isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} />
            <Route path="/mypage" element={isLoggedIn ? <Mypage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
            <Route path="/usersearch" element={<UserSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
