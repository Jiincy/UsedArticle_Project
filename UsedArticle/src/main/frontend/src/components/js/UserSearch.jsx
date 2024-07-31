import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/UserSearch.css';

const UserSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 검색 기능
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/users/search`, { params: { keyword } });
            setResults(response.data);
        } catch (error) {
            setError('검색 중 오류가 발생했습니다.');
            console.error('사용자 검색 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    // 새 채팅 시작 기능
    const startNewChat = async (userId) => {
        try {
            // 서버에서 현재 로그인한 사용자 ID를 가져옴
            const loggedInUserResponse = await axios.get('/api/user');
            const loggedInUserId = loggedInUserResponse.data.userNo;

            // 새로운 채팅방 생성 요청
            await axios.post('/api/chatRooms', {
                user1Id: loggedInUserId,
                user2Id: userId
            });

            // 채팅방 생성 후 해당 채팅방으로 이동
            navigate(`/chat/${userId}`);
        } catch (error) {
            setError('채팅방을 생성하는 중 오류가 발생했습니다.');
            console.error('새 채팅 생성 오류:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="유저ID를 입력하세요"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">검색</button>
            {loading && <p>검색 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className="search-results">
                {results.length > 0 ? (
                    results.map((user) => (
                        <li key={user.userNo}>
                            {user.userId} ({user.userEmail})
                            <button onClick={() => startNewChat(user.userId)} className="start-chat-button">
                                새 채팅 시작
                            </button>
                        </li>
                    ))
                ) : (
                    <li>검색 결과가 없습니다.</li>
                )}
            </ul>
        </div>
    );
};

export default UserSearch;
