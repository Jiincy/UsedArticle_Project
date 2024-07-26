// path: src/components/js/Chating.jsx
import React from 'react';
import '../css/Chat.css';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';

const Chating = ({ isLoggedIn }) => {
  console.log('isLoggedIn in Chating:', isLoggedIn);

  return (
    <div className="chat-container">
      <h2>채팅 목록</h2>
      {isLoggedIn ? <UserSearch /> : <p>로그인 후 검색 기능을 사용할 수 있습니다.</p>}
      <ul>
        <li><Link to="/Chat">채팅방 1</Link></li>
        <li><Link to="/Chat">채팅방 2</Link></li>
        <li><Link to="/Chat">채팅방 3</Link></li>
      </ul>
    </div>
  );
};

export default Chating;
