import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Mainpage.css';

const Mainpage = ({ isLoggedIn, onLogout }) => {
  return (
    <div>
      <h2>Main Page</h2>
      <p>This is the main page content.</p>
      {isLoggedIn ? (
        <div>
          <button onClick={onLogout}>로그아웃</button>
          <Link to="/Chat">채팅</Link>
          <Link to="/Mypage">마이페이지</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default Mainpage;
