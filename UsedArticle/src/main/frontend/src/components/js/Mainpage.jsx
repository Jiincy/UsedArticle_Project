import React from 'react';
import '../css/Mainpage.css';
import { Link } from 'react-router-dom';

// 사진 파일 경로를 확인하세요.
import sampleImage from '../../assets/sample-image.jpg'; // 이미지 파일 경로

const Mainpage = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="main-container">
      <div className="main-content">
        <div className="main-image-container">
          <img src={sampleImage} alt="Sample" className="main-image" />
          <div className="text-overlay">
            <h2>가제 : 중고거래 웹 사이트</h2>
            <p>예제 : 중고나라</p>
          </div>
        </div>
      </div>

      <div className="info-links">
        <h3>더 많은 정보</h3>
        <ul>
          <li><Link to="/notices" className="info-link">공지사항</Link></li>
          <li><Link to="/faq" className="info-link">자주 묻는 질문</Link></li>
          <li><Link to="/contact" className="info-link">연락처</Link></li>
          <li><Link to="/about" className="info-link">회사 소개</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Mainpage;
