// path: com/sky/usedarticle/dto/Message.java
package com.sky.usedarticle.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String buyer;
    private String seller;
    private String productId;
    private String content;
    private String type;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime sendDate;

    @JsonCreator
    public Message(
            @JsonProperty("buyer") String buyer,
            @JsonProperty("seller") String seller,
            @JsonProperty("productId") String productId,
            @JsonProperty("content") String content,
            @JsonProperty("type") String type,
            @JsonProperty("sendDate") String sendDate
    ) {
        this.buyer = buyer;
        this.seller = seller;
        this.productId = productId;
        this.content = content;
        this.type = type;
        this.sendDate = ZonedDateTime.parse(sendDate, DateTimeFormatter.ISO_ZONED_DATE_TIME).toLocalDateTime();
    }

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
