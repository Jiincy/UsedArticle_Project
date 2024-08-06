package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Qna;

import java.util.List;

public interface QnaService {
    List<Qna> getAllQuestions();
    Qna getQuestionById(int id);
    void createQuestion(Qna qna);
    void updateQuestion(Qna qna);
    void deleteQuestion(int id);
}
