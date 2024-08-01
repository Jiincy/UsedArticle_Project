package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    //전체 상품
    List<Product> getAllProducts();

    //상품 등록
    void insertProduct(Product product);

    Product getProductById(int productId);


    int getProductOwnerNo(@Param("productId") int productId);

    void deleteProduct(@Param("productId") int productId);

}
