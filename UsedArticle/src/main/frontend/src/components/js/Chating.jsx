import React from 'react';
import '../css/Chat.css'; // 수정된 CSS 파일 import
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch'; // 검색 기능 컴포넌트 import

const Chating = ({ isLoggedIn }) => { // isLoggedIn props 추가
  console.log('isLoggedIn in Chating:', isLoggedIn); // 상태 로그 추가

  return (
    <div className="chat-container"> {/* 클래스 이름 추가 */}
      <h2>채팅 목록</h2>
      {isLoggedIn ? <UserSearch /> : <p>로그인 후 검색 기능을 사용할 수 있습니다.</p>}
      <ul>
        <li><Link to="/Chat">채팅방 1</Link></li>
        <li><Link to="/Chat">채팅방 2</Link></li>
        <li><Link to="/Chat">채팅방 3</Link></li>
        {/* 추가 채팅방 항목을 여기에 추가할 수 있습니다 */}
      </ul>
    </div>
  );
};

export default Chating;
