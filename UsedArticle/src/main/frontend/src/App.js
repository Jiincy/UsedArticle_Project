import React, { useState } from 'react'; // useState를 import 추가
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/js/Mainpage';
import Login from './components/js/Login';
import SignUp from './components/js/SignUp';
import './App.css';
import Chat from './components/js/Chat.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // useState를 사용하여 상태 설정
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
             <Route path="/" element={<Mainpage isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
