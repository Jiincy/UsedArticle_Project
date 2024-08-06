package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.dto.ProductLike;
import com.sky.usedarticle.mapper.ProductLikeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductLikeService {

    @Autowired
    private ProductLikeMapper productLikeMapper;

    public void addProductLike(int productId, int userNo) {
        productLikeMapper.insertProductLike(productId, userNo);
    }

    public void removeProductLike(int productId, int userNo) {
        productLikeMapper.deleteProductLike(productId, userNo);
    }

    public List<ProductLike> getUserProductLikes(int userNo) {
        return productLikeMapper.getProductLikesByUserNo(userNo);
    }

    public boolean isProductLiked(int productId, int userNo) {
        return productLikeMapper.countProductLike(productId, userNo) > 0;
    }
    public List<Product> getLikedProducts(int userNo) {
        // userNo가 유효한지 검증
        if (userNo <= 0) {
            throw new IllegalArgumentException("Invalid user number");
        }
        return productLikeMapper.getLikedProductsByUserNo(userNo);
    }
}
