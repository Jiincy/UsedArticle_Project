package com.sky.usedarticle.controller;

import com.google.gson.Gson;
import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.service.FileService;
import com.sky.usedarticle.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    private static final String UPLOAD_DIR = "uploads/";

    // 모든 상품 조회
    @GetMapping("/product")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/productInput")
    public void input(@RequestBody Product product){
        productService.registerProduct(product);

  }
        @GetMapping("/productdetail/{productId}")
        public Product getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

}
