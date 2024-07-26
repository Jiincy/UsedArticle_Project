package com.sky.usedarticle.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int userNO;
    private String userId;
    private String userPw;
    private String userEmail;
    private String userTel;
    private String userAddr;
    private LocalDateTime userReg;
    private String userYn;

    public User(String userId, String userPw) {
        this.userId = userId;
        this.userPw = userPw;
    }
}
