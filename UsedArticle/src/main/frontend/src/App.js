import React, { useState } from 'react'; // useState를 import 추가
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './components/js/Mainpage';
import Login from './components/js/Login';
import SignUp from './components/js/SignUp';
import './App.css';
import Chat from './components/js/Chat.jsx';
import Mypage from './components/js/Mypage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // useState를 사용하여 상태 설정
  const [user, setUser] = useState(null); // 사용자 정보를 관리하는 상태

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Mainpage isLoggedIn={isLoggedIn} onLogout={() => { setIsLoggedIn(false); setUser(null); }} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mypage" element={<Mypage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
