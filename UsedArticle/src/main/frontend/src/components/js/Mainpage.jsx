import React from 'react';
import '../css/Mainpage.css';
import SearchUser from './UserSearch'; // 추가된 검색 기능 컴포넌트

const Mainpage = ({ isLoggedIn, onLogout }) => {
  return (
    <div>

      <div className="main-content">
        <h2>이름 뭐로하지 ㅅㅂ~</h2>
        <p>당근마켓 따라잡으려고 만들어본 웹~</p>
        {isLoggedIn && <SearchUser />} {/* 검색 기능 추가 */}
      </div>

      <h2>Main Page</h2>
      <p>This is the main page content.</p>
      {isLoggedIn ? (
        <button onClick={onLogout}>
          로그아웃
        </button>
      ) : (
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
      <Link to="/chat">채팅</Link>

    </div>
  );
};

export default Mainpage;
