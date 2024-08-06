package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.Product;
import com.sky.usedarticle.dto.ProductLike;
import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.service.ProductLikeService;
import com.sky.usedarticle.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private HttpSession session;

    @Autowired
    private ProductLikeService productLikeService;

    // 모든 상품 조회
    @GetMapping("/product")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    // 상품 상세 정보 조회
    @GetMapping("/productdetail/{productId}")
    public Product getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    // 상품 등록
    @PostMapping("/productInput")
    public ResponseEntity<String> input(
            @RequestParam("userNo") String userNo,
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") String productPrice,
            @RequestParam("productInfo") String productInfo,
            @RequestParam("productCondition") String productCondition,
            @RequestParam("productChange") String productChange,
            @RequestParam("productDeliveryFree") String productDeliveryFree,
            @RequestParam("productAddr") String productAddr,
            @RequestParam("productStatus") String productStatus) {

        try {
            Product product = new Product();
            product.setUserNo(userNo);
            product.setProductName(productName);
            product.setProductPrice(productPrice);
            product.setProductInfo(productInfo);
            product.setProductCondition(productCondition);
            product.setProductChange(productChange);
            product.setProductDeliveryFree(productDeliveryFree);
            product.setProductAddr(productAddr);
            product.setProductStatus(productStatus);
            productService.registerProduct(product);

            return ResponseEntity.ok("Product registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register product: " + e.getMessage());
        }
    }


    @GetMapping("/currentUserNo")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


    // 상품 삭제
    @DeleteMapping("/productdelete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }

        int currentUserNo = loggedInUser.getUserNO();
        int productOwnerNo = productService.getProductOwnerNo(productId);

        // 사용자 번호 비교
        if (currentUserNo != productOwnerNo) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to delete this product");
        }

        try {
            productService.deleteProduct(productId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product");
        }
    }


    @PutMapping("/modify/{productId}")
    public ResponseEntity<String> modifyProduct(
            @PathVariable("productId") int productId,
            @RequestBody Product product,
            HttpSession session) {

        User loggedInUser = (User) session.getAttribute("loggedInUser");
        String currentUserNo = String.valueOf(loggedInUser != null ? loggedInUser.getUserNO() : null);

        if (currentUserNo == null || productService.getProductOwnerNo(productId) != Integer.parseInt(currentUserNo)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to modify this product");
        }

        try {
            product.setProductId(productId);
            productService.modifyProduct(product);
            return ResponseEntity.ok("Product modified successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to modify product: " + e.getMessage());
        }
    }

    // 내가 등록한 상품 조회
    @GetMapping("/myProducts")
    public ResponseEntity<List<Product>> getMyProducts(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<Product> products = productService.getProductsByUserNo(loggedInUser.getUserNO());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/product/likes")
    public ResponseEntity<List<Product>> getLikedProducts(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        int userNo = loggedInUser.getUserNO();
        try {
            List<Product> likedProducts = productLikeService.getLikedProducts(userNo);
            return ResponseEntity.ok(likedProducts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // 오류 발생 시 400 반환
        }
    }

    @PostMapping("/product/like/{productId}")
    public ResponseEntity<String> addProductLike(@PathVariable int productId, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        productLikeService.addProductLike(productId, loggedInUser.getUserNO());
        return ResponseEntity.ok("찜 추가 성공");
    }

    @DeleteMapping("/product/like/{productId}")
    public ResponseEntity<String> removeProductLike(@PathVariable int productId, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        productLikeService.removeProductLike(productId, loggedInUser.getUserNO());
        return ResponseEntity.ok("찜 제거 성공");
    }

    @GetMapping("/likes")
    public ResponseEntity<List<Product>> getLikedProducts(@RequestParam int userNo) {
        try {
            List<Product> likedProducts = productLikeService.getLikedProducts(userNo);
            return ResponseEntity.ok(likedProducts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // 오류 발생 시 400 반환
        }
    }
    // 찜 상태 확인
    @GetMapping("/product/likes/{productId}")
    public ResponseEntity<Map<String, Boolean>> checkProductLike(@PathVariable int productId, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        int userNo = loggedInUser.getUserNO();
        boolean isLiked = productLikeService.isProductLiked(productId, userNo);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isLiked", isLiked);

        return ResponseEntity.ok(response);
    }


}