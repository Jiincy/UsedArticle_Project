package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    public List<Product> getAllProducts() {
        return productMapper.getAllProducts();
    }


    public void registerProduct(Product product) {
        // 상품 정보 DB에 저장
        productMapper.insertProduct(product);
    }
    // detail 상품 리스트
    public Product getProductById(int productId) {
        return productMapper.getProductById(productId);
    }


}
