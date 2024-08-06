// ProductMapper.java
package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<Product> getAllProducts();

    void insertProduct(Product product);

    Product getProductById(int productId);

    List<Product> getProductsByUserNo(@Param("userNo") int userNo);

    int getProductOwnerNo(@Param("productId") int productId);

    void deleteProduct(@Param("productId") int productId);

    void updateProduct(Product product);
}
