package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
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
        // 상품 정보 DB에 저장
        productMapper.insertProduct(product);
    }
    // detail 상품 리스트
    public Product getProductById(int productId) {
        return productMapper.getProductById(productId);
    }


    // 세션에서 사용자 정보를 추출하고 권한 검증

    public boolean isAuthorized(HttpSession session, int productId) {
        User currentUser = (User) session.getAttribute("loggedInUser");
        if (currentUser == null) {
            return false; // 또는 다른 적절한 조치
        }
        int currentUserNo = currentUser.getUserNO();
        int productOwnerNo = productMapper.getProductOwnerNo(productId);
        return currentUserNo == productOwnerNo;
    }


    @Transactional
    public void deleteProduct(int productId) {
        productMapper.deleteProduct(productId);
    }
}
