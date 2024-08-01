import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductDetailList.css';

const ProductDetailList = () => {
    const { productId } = useParams(); // URL 파라미터에서 productId 가져오기
    const [product, setProduct] = useState(null);
    const [currentUserNo, setCurrentUserNo] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        // 상품 상세 정보와 현재 사용자 번호를 가져오는 함수
        const fetchData = async () => {
            try {
                // 상품 상세 정보 가져오기
                const productResponse = await axios.get(`http://localhost:8787/api/productdetail/${productId}`);
                setProduct(productResponse.data);

                // 현재 사용자 번호 가져오기
                const userResponse = await axios.get('/api/currentUserNo');
                setCurrentUserNo(userResponse.data.userNo);

                // 작성자와 현재 사용자가 같은지 확인
                setIsOwner(userResponse.data.userNo === productResponse.data.userNo);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // 데이터 로딩 완료
            }
        };

        fetchData();
    }, [productId]);

    const handleDelete = () => {
        if (!isOwner) {
            alert('권한이 없습니다. 작성자만 삭제할 수 있습니다.');
            return;
        }

        axios.delete(`http://localhost:8787/api/productdelete/${productId}`)
            .then(response => {
                alert('상품이 성공적으로 삭제되었습니다!');
                navigate('/productList'); // 삭제 후 상품 목록 페이지로 이동
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('상품 삭제에 실패했습니다.');
            });
    };

    const handleEdit = () => {
        if (!isOwner) {
            alert('권한이 없습니다. 작성자만 수정할 수 있습니다.');
            return;
        }

        navigate(`/product/${productId}/edit`);
    };

    if (loading) return <p>상품 정보를 불러오는 중입니다...</p>; // 로딩 상태 표시

    if (!product) return <p>상품 정보를 찾을 수 없습니다.</p>; // 상품 정보를 찾을 수 없는 경우 처리

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

                <div>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailList;
