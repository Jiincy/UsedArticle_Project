package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.Qna;
import com.sky.usedarticle.service.QnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class ContactController {

    @Autowired
    QnaService qnaService;

    // Spring Boot 예시
    @GetMapping("/api/qna")
    public ResponseEntity<List<Qna>> getAllQuestions() {
        List<Qna> questions = qnaService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

}
