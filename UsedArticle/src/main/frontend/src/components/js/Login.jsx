import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 로그인 처리 로직을 추가하세요.
        console.log(`로그인 시도 - 아이디: ${loginId}, 비밀번호: ${pw}`);
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
                                   <Link to="/signup" className="signup-link">회원가입</Link>
                                   <Link to="/" className="home-link">홈으로 가기</Link>
                               </div>
            </div>

        </div>
    );
};

export default Login;
