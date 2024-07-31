package com.sky.usedarticle.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRequest {

    private String user2Id; // 이 필드가 있어야 합니다.

    // Getter 및 Setter
    public String getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(String user2Id) {
        this.user2Id = user2Id;
    }
}