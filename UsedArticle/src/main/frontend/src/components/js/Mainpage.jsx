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
    </div>
  );
};

export default Mainpage;
