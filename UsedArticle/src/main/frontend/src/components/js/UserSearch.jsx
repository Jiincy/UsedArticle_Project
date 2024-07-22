import React, { useState } from 'react';
import axios from 'axios';
import '../css/UserSearch.css'; // CSS 파일 임포트

const UserSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/users/search?keyword=${keyword}`);
            setResults(response.data);
        } catch (error) {
            setError('검색 중 오류가 발생했습니다.');
            console.error('Error searching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="유저ID를 입력하세요"
                className="search-input" // CSS 클래스 추가
            />
            <button onClick={handleSearch} className="search-button">검색</button>
            {loading && <p>검색 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className="search-results">
                {results.length > 0 ? (
                    results.map((user, index) => (
                        <li key={index}>{user.userId} ({user.userEmail})</li>
                    ))
                ) : (
                    <li>검색 결과가 없습니다.</li>
                )}
            </ul>
        </div>
    );
};

export default UserSearch;
