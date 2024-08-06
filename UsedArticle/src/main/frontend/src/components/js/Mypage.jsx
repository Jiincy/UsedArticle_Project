import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Mypage.css'; // 스타일 파일 임포트
import '../css/ProductList.css'; // ProductList 스타일 파일 임포트

const Mypage = ({ user, setUser, setIsLoggedIn }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [myProducts, setMyProducts] = useState([]); // 내가 등록한 상품
  const [likedProducts, setLikedProducts] = useState([]); // 내가 찜한 상품
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const fetchMyProducts = async () => {
            try {
                const userNo = sessionStorage.getItem('userNo');
                if (userNo) {
                    const response = await axios.get('http://localhost:8787/api/myProducts', {
                        withCredentials: true
                    });
                    setMyProducts(response.data);
                }
            } catch (error) {
                console.error('등록한 상품 조회 실패:', error);
            }
        };

    const fetchLikedProducts = async () => {
      try {
        const userNo = sessionStorage.getItem('userNo');
        if (userNo) {
          const response = await axios.get('http://localhost:8787/api/product/likes', {
            params: { userNo: parseInt(userNo, 10) }, // int 타입으로 변환
            withCredentials: true
          });
          setLikedProducts(response.data);
        }
      } catch (error) {
        console.error('찜한 상품 조회 실패:', error);
      }
    };

    if (user) {
      fetchMyProducts();
      fetchLikedProducts();
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

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
      await axios.delete('http://localhost:8787/api/user', { withCredentials: true });
      setUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('계정 삭제 실패:', error);
      alert('계정 삭제 실패: ' + (error.response ? error.response.data : error.message));
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div className="mypage-container">
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
            <label>
              비밀번호:
              <input
                type="password"
                value={userInfo.userPw}
                onChange={(e) => setUserInfo({ ...userInfo, userPw: e.target.value })}
              />
            </label>
            <label>
              전화번호:
              <input
                type="text"
                value={userInfo.userTel}
                onChange={(e) => setUserInfo({ ...userInfo, userTel: e.target.value })}
              />
            </label>
            <label>
              주소:
              <input
                type="text"
                value={userInfo.userAddr}
                onChange={(e) => setUserInfo({ ...userInfo, userAddr: e.target.value })}
              />
            </label>
            <button onClick={handleUpdate}>정보 수정</button>
            <button className="cancel-button" onClick={() => setEditing(false)}>취소</button>
          </div>
        ) : (
          <div>
            <div className="info">
              <p>아이디: {userInfo.userId}</p>
              <p>이메일: {userInfo.userEmail}</p>
              <p>전화번호: {userInfo.userTel}</p>
              <p>주소: {userInfo.userAddr}</p>
            </div>
            <button onClick={() => setEditing(true)}>정보 수정</button>
            <button className="cancel-button" onClick={handleDelete}>회원 탈퇴</button>
          </div>
        )}
        <h3>내가 등록한 상품</h3>
        <div className="search-and-register">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />

        </div>

        <div className="product-list-container">
          {myProducts.length > 0 ? (
            myProducts.filter(product =>
              product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.productInfo.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(product => (
              <div
                key={product.productId}
                className="product-item"
                onClick={() => handleProductClick(product.productId)}
              >
                <h2>{product.productName}</h2>
                <p>{product.productInfo}</p>
                <p>가격: {product.productPrice}</p>
                <p>상태: {product.productCondition}</p>
              </div>
            ))
          ) : (
            <p>등록한 상품이 없습니다.</p>
          )}
        </div>

        <h3>내가 찜한 상품</h3>
        <div className="product-list-container">
          {likedProducts.length > 0 ? (
            likedProducts.filter(product =>
              product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.productInfo.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(product => (
              <div
                key={product.productId}
                className="product-item"
                onClick={() => handleProductClick(product.productId)}
              >
                <h2>{product.productName}</h2>
                <p>{product.productInfo}</p>
                <p>가격: {product.productPrice}</p>
                <p>상태: {product.productCondition}</p>
              </div>
            ))
          ) : (
            <p>찜한 상품이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
