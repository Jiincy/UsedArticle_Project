package com.sky.usedarticle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    private int commentNum;

    private int qNum;

    private Integer pCommentNum;

    private int userNo;

    private String commentContents;

    private Timestamp commentCreated;



}
