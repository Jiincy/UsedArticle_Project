package com.sky.usedarticle.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private String buyer;
    private String seller;
    private String productId;
    private String content;
    private String type;  // "Buyer" 또는 "Seller"
    private LocalDateTime sendDate;

    @Override
    public String toString() {
        return "Message{" +
                "buyer='" + buyer + '\'' +
                ", seller='" + seller + '\'' +
                ", productId='" + productId + '\'' +
                ", content='" + content + '\'' +
                ", type='" + type + '\'' +
                ", sendDate=" + sendDate +
                '}';
    }
}
