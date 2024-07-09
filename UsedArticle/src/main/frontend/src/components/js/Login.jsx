import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [loginId, setLoginId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                userId: loginId,
                userPw: pw
            };

            const response = await axios.post('http://localhost:8787/api/login', formData);
            console.log('로그인 성공:', response.data);

            // 세션 스토리지에 사용자 정보 저장
            sessionStorage.setItem('loginId', response.data.userId);
            sessionStorage.setItem('email', response.data.userEmail);
            sessionStorage.setItem('tel', response.data.userTel);
            sessionStorage.setItem('userNo', response.data.userNo);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            setError('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div>
            <div className="login-container">
                <h2>로그인</h2>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="loginId">아이디:</label>
                        <input
                            type="text"
                            id="loginId"
                            name="loginId"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="pw">비밀번호:</label>
                        <input
                            type="password"
                            id="pw"
                            name="pw"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <div className="link-container">
                    <Link to="/" className="home-link">홈으로 가기</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
