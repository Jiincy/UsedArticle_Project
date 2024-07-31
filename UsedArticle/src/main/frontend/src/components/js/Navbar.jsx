import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import homeIcon from '../../assets/home-icon.png'; // 올바른 경로로 수정

const Navbar = ({ isLoggedIn, onLogout, user }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션

  const handleLogout = () => {
    onLogout();
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-home-icon">
            <img src={homeIcon} alt="홈" /> {/* 홈 아이콘 이미지 */}
          </Link>
        </div>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <Link to="/chating" className="navbar-link">채팅 목록</Link>
              <Link to="/mypage" className="navbar-link">마이페이지</Link>
              <Link to="/product" className="navbar-link">전체 상품</Link>
              <span className="navbar-user">안녕하세요, {user ? user.userId : '사용자'}님</span> {/* 사용자 ID 또는 이름 표시 */}
              <button onClick={handleLogout} className="navbar-button">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">로그인</Link>
              <Link to="/signup" className="navbar-link">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
