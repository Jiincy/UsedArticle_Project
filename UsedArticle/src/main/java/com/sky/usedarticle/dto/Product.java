package com.sky.usedarticle.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {

    private int productId;       //상품 아이디

    private String userNo;          //계정 번호

    private String productName;     //상품 이름

    private String productPrice;    //상품 가격

    private String productInfo;     //상품 정보

    private String productCondition; //상품 상태

    private String productChange;   //네고 여부

    private LocalDateTime productDate;  //등록일

    private LocalDateTime productUpdateDate;    //수정일

    private String productDeliveryFree;     //배송비포함여부

    private int productLike;        //찜갯수

    private String productAddr;     //거래지역

    private String productStatus;   //판매상태

    public Product(String productAddr, String productChange, String productCondition, LocalDateTime productDate, String productDeliveryFree, int productId, String productInfo, int productLike, String productName, String productPrice, String productStatus, LocalDateTime productUpdateDate, String userNo) {
        this.productAddr = productAddr;
        this.productChange = productChange;
        this.productCondition = productCondition;
        this.productDate = productDate;
        this.productDeliveryFree = productDeliveryFree;
        this.productId = productId;
        this.productInfo = productInfo;
        this.productLike = productLike;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productStatus = productStatus;
        this.productUpdateDate = productUpdateDate;
        this.userNo = userNo;
    }


    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }
}
