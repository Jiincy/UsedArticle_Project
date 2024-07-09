package com.sky.usedarticle.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    private  String id;
    private String userId;
    private String userPw;
    private String userEmail;
    private String userTel;
    private String userAddr;
    private LocalDateTime userReg;
    private String userYn;
}
