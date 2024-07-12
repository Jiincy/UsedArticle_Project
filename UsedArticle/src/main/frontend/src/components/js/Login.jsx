// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8787/api/login', {
                userId: userId,
                userPw: userPw
            });

            if (response.data) {
                console.log('로그인 성공:', response.data);

                // 여기서 setIsLoggedIn(true);를 호출하여 로그인 상태를 변경합니다.
                setIsLoggedIn(true);

                navigate('/');
            } else {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
                navigate('/login');
            }
        } catch (error) {
            console.error('로그인 요청 실패:', error);
            setError('로그인 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">아이디:</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="userPw">비밀번호:</label>
                    <input
                        type="password"
                        id="userPw"
                        name="userPw"
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
            <Link to="/signup" className="signup-link">회원가입</Link>
            <Link to="/" className="home-link">홈으로 가기</Link>
        </div>
    );
};

export default Login;
