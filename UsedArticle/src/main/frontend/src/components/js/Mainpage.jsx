import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Mainpage.css';

const Mainpage = ({ isLoggedIn }) => {
  return (
    <div>
      <h2>Main Page</h2>
      <p>This is the main page content.</p>
      {isLoggedIn ? (
        <button onClick={() => console.log('로그아웃 버튼 클릭')}>
          로그아웃
        </button>
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
