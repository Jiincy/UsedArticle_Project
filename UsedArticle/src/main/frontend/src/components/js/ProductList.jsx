import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8787/api/product')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data); // 초기 로드 시 모든 상품을 필터링 리스트에 설정
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 필터링된 제품 목록 업데이트
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="product-list">
      <h1>전체 상품</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="product-list-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.productId} className="product-item">
              <h2>{product.productName}</h2>
              <p>{product.productInfo}</p>
              <p>가격: {product.productPrice}</p>
              <p>카테고리: {product.productCategory}</p>
              <p>상태: {product.productCondition}</p>
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
