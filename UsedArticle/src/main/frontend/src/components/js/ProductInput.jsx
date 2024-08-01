import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/ProductInput.css';

// 천 단위 구분 기호 추가 함수
const formatNumber = (value) => {
    if (!value) return '';
    return Number(value.replace(/[^0-9]/g, '')).toLocaleString() + '원';
};

// 숫자만 허용하는 함수
const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
};

const ProductInput = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productInfo: '',
        productCondition: '',
        productChange: '',
        productDeliveryFree: '아니요',
        productAddr: '',
        productStatus: '판매중',
        userNo: ''
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userNo = params.get('userNo');
        if (userNo) {
            setProduct(prevProduct => ({
                ...prevProduct,
                userNo
            }));
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'productPrice') {
            const formattedValue = formatNumber(parseNumber(value));
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: formattedValue
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userNo', product.userNo);
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice);
        formData.append('productInfo', product.productInfo);
        formData.append('productCondition', product.productCondition);
        formData.append('productChange', product.productChange);
        formData.append('productDeliveryFree', product.productDeliveryFree);
        formData.append('productAddr', product.productAddr);
        formData.append('productStatus', product.productStatus);

        try {
            const response = await axios.post('http://localhost:8787/api/productInput', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('서버 응답:', response.data);
            alert('상품이 성공적으로 등록되었습니다!');
            navigate('/product'); // 성공 후 리디렉션
        } catch (error) {
            console.error('Error registering product:', error);
        }
    };

    return (
        <div className="product-input">
            <h1>상품 등록</h1>
            <form onSubmit={handleSubmit} className="product-input-form">
                <label className="hidden-field">
                    사용자 번호:
                    <input
                        type="text"
                        name="userNo"
                        value={product.userNo}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </label>
                <label>
                    상품 이름:
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    상품 가격:
                    <input
                        type="text"
                        name="productPrice"
                        value={product.productPrice}
                        onChange={handleChange}
                        required
                        placeholder="예: 10,000"
                    />
                </label>
                <label>
                    상품 정보:
                    <textarea
                        name="productInfo"
                        value={product.productInfo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    상품 상태:
                    <select
                        name="productCondition"
                        value={product.productCondition}
                        onChange={handleChange}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="새제품">새제품</option>
                        <option value="중고">중고</option>
                    </select>
                </label>
                <label>
                    네고 여부:
                    <select
                        name="productChange"
                        value={product.productChange}
                        onChange={handleChange}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="가능">가능</option>
                        <option value="불가능">불가능</option>
                    </select>
                </label>
                <label>
                    배송비 포함 여부:
                    <select
                        name="productDeliveryFree"
                        value={product.productDeliveryFree}
                        onChange={handleChange}
                        required
                    >
                        <option value="아니요">아니요</option>
                        <option value="네">네</option>
                    </select>
                </label>
                <label>
                    거래 지역:
                    <input
                        type="text"
                        name="productAddr"
                        value={product.productAddr}
                        onChange={handleChange}
                        required
                        placeholder="예: OO시 OO구"
                    />
                </label>
                <label>
                    판매 상태:
                    <select
                        name="productStatus"
                        value={product.productStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="판매중">판매중</option>
                        <option value="판매완료">판매완료</option>
                        <option value="예약중">예약중</option>
                    </select>
                </label>
                {/* 상품 이미지 입력 부분 제거 */}
                <button type="submit" className="submit-button">등록하기</button>
            </form>
        </div>
    );
};

export default ProductInput;
