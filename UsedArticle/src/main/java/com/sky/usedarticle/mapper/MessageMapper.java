package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Message;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MessageMapper {
    void insertMessage(Message message);
}
