package com.sky.usedarticle.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class Message {
    private String chatRoomId;
    private int senderNo;
    private String content;
    private LocalDateTime sendDate;

    // String과 LocalDateTime 간의 변환 메서드 추가
    public void setSendDateFromString(String sendDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        this.sendDate = LocalDateTime.parse(sendDateStr, formatter);
    }

    public String getSendDateAsString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        return this.sendDate.format(formatter);
    }
}
