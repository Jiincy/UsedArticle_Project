// ProductService.java
package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductMapper productMapper;

    public List<Product> getAllProducts() {
        return productMapper.getAllProducts();
    }

    public void registerProduct(Product product) {
        productMapper.insertProduct(product);
    }

    public Product getProductById(int productId) {
        return productMapper.getProductById(productId);
    }

    public List<Product> getProductsByUserNo(int userNo) {
        return productMapper.getProductsByUserNo(userNo);
    }

    public int getProductOwnerNo(int productId) {
        return productMapper.getProductOwnerNo(productId);
    }

    @Transactional
    public void deleteProduct(int productId) {
        productMapper.deleteProduct(productId);
    }

    @Transactional
    public void modifyProduct(Product product) {
        productMapper.updateProduct(product);
    }
}
