import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';
import axios from 'axios';

const Chating = ({ isLoggedIn }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('/api/currentUser') // 현재 로그인된 사용자 정보 가져오기
        .then(response => {
          setUserId(response.data.userId);
          return axios.get('/api/chatRooms'); // 대화 중인 채팅방 목록을 가져오는 API 호출
        })
        .then(response => {
          // API 응답 데이터 확인
          console.log('Chat Rooms Data:', response.data);
          setChatRooms(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>로그인 후 검색 기능을 사용할 수 있습니다.</p>;
  }

  return (
    <div className="chat-container">
      <h2>채팅 목록</h2>
      <UserSearch />

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>채팅방 목록을 가져오는 데 오류가 발생했습니다: {error}</p>
      ) : (
        <ul>
          {chatRooms.length > 0 ? (
            chatRooms.map(chatRoom => (
              <li key={chatRoom.id}>
                <Link to={`/Chat/${chatRoom.id}`}>
                  {`발신자 ${chatRoom.senderId || '알 수 없음'}님과 수신자 ${chatRoom.receiverId || '알 수 없음'}님의 채팅방`}
                </Link>
              </li>
            ))
          ) : (
            <li>현재 대화 중인 채팅방이 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Chating;
