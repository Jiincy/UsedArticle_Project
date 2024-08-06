// ProductLike.java
package com.sky.usedarticle.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductLike {
    private int productId;
    private int userNo;
    private LocalDateTime createDate;
}
