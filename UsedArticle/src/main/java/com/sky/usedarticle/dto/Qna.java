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
public class Qna {

    private int qNum;

    private int userNo;

    private String qnaTitle;

    private String qnaContents;

    private int hitCnt;

    private Timestamp qnaCreated;
}
