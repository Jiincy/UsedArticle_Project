package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.dto.ProductLike;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductLikeMapper {
    void insertProductLike(int productId, int userNo);
    void deleteProductLike(int productId, int userNo);
    List<ProductLike> getProductLikesByUserNo(int userNo);
    int countProductLike(int productId, int userNo);
    List<Product> getLikedProductsByUserNo(int userNo);
}
