package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Qna;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {

    List<Qna> getAllQuestions();

    Qna getQuestionById(@Param("id") int id);

    void createQuestion(Qna qna);

    void updateQuestion(Qna qna);

    void deleteQuestion(@Param("id") int id);
}
