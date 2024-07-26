import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/ProductDetailList.css';

const ProductDetailList = () => {
    const { productId } = useParams(); // URL 파라미터에서 productId 가져오기
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // 상품 상세 정보 가져오기
        axios.get(`http://localhost:8787/api/productdetail/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [productId]);

    if (!product) return <p>상품 정보를 불러오는 중입니다...</p>;

    return (
        <div className="product-detail">
            <h1>상품 상세</h1>
            <div className="product-detail-container">
                <h2>{product.productName}</h2>
                <p><strong>상품 정보:</strong> {product.productInfo}</p>
                <p><strong>가격:</strong> {product.productPrice}</p>
                <p><strong>상태:</strong> {product.productCondition}</p>
                <p><strong>네고 여부:</strong> {product.productChange}</p>
                <p><strong>배송비 포함 여부:</strong> {product.productDeliveryFree}</p>
                <p><strong>거래 지역:</strong> {product.productAddr}</p>
                <p><strong>판매 상태:</strong> {product.productStatus}</p>
                <p><strong>등록일:</strong> {product.productDate}</p>
                <p><strong>수정일:</strong> {product.productUpdateDate}</p>
                <p><strong>찜 갯수:</strong> {product.productLike}</p>
                <button className="inquiry-button">상품 문의</button>
            </div>
        </div>
    );
};

export default ProductDetailList;
