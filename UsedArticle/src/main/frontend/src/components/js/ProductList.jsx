import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import
import '../css/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용

  useEffect(() => {
    axios.get('http://localhost:8787/api/product')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductRegistration = () => {
    const userNo = sessionStorage.getItem('userNo'); // 세션에서 사용자 번호 가져오기
    console.log('ProductList userNo:', userNo); // 로그로 확인
    if (userNo) {
        navigate(`/ProductInput?userNo=${userNo}`); // URL에 사용자 번호 추가
    } else {
        console.error('User number not found in sessionStorage.');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`); // 상세 페이지로 이동
  };

  return (
    <div className="product-list">
      <h1>전체 상품</h1>
      <div className="search-and-register">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button
          className="register-button"
          onClick={handleProductRegistration}
        >
          상품 등록
        </button>
      </div>

      <div className="product-list-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.productId}
              className="product-item"
              onClick={() => handleProductClick(product.productId)} // 클릭 시 상세 페이지로 이동
            >
              <h2>{product.productName}</h2>
              <p>{product.productInfo}</p>
              <p>가격: {product.productPrice}</p>
              <p>카테고리: {product.productCategory}</p>
              <p>상태: {product.productCondition}</p>
              <button className="inquiry-button">상품 문의</button>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
