import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Mypage = ({ user, setUser, setIsLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8787/api/user', { withCredentials: true });
        setUserInfo(response.data);
        setUser(response.data);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      }
    };

    if (!user) {
      fetchUserInfo();
    } else {
      setUserInfo(user);
    }
  }, [user, setUser]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:8787/api/user', userInfo, { withCredentials: true });
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error('정보 수정 실패:', error);
    }
  };

const handleDelete = async () => {
  try {
    console.log('Attempting to delete user...'); // 디버깅 메시지 추가
    await axios.delete('http://localhost:8787/api/user', { withCredentials: true });
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
    console.log('User deleted and navigated to login.'); // 디버깅 메시지 추가
  } catch (error) {
    // 디버깅 메시지 추가
    console.error('계정 삭제 실패:', error.response ? error.response.data : error.message);
    alert('계정 삭제 실패: ' + (error.response ? error.response.data : error.message));
  }
};


  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>마이페이지</h2>
      {editing ? (
        <div>
          <label>
            이메일:
            <input
              type="text"
              value={userInfo.userEmail}
              onChange={(e) => setUserInfo({ ...userInfo, userEmail: e.target.value })}
            />
          </label>
          <br />
          <label>
            비밀번호:
            <input
              type="password"
              value={userInfo.userPw}
              onChange={(e) => setUserInfo({ ...userInfo, userPw: e.target.value })}
            />
          </label>
          <br />
          <label>
            전화번호:
            <input
              type="text"
              value={userInfo.userTel}
              onChange={(e) => setUserInfo({ ...userInfo, userTel: e.target.value })}
            />
          </label>
          <br />
          <label>
            주소:
            <input
              type="text"
              value={userInfo.userAddr}
              onChange={(e) => setUserInfo({ ...userInfo, userAddr: e.target.value })}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>정보 수정</button>
          <button onClick={() => setEditing(false)}>취소</button>
        </div>
      ) : (
        <div>
          <p>아이디: {userInfo.userId}</p>
          <p>이메일: {userInfo.userEmail}</p>
          <p>전화번호: {userInfo.userTel}</p>
          <p>주소: {userInfo.userAddr}</p>
          <button onClick={() => setEditing(true)}>정보 수정</button>
          <button onClick={handleDelete}>회원 탈퇴</button>
        </div>
      )}
    </div>
  );
};

export default Mypage;
