package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Message;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MessageMapper {

    List<Message> getMessagesByChatRoomId(@Param("chatRoomId") String chatRoomId);
    void insertMessage(Message message);
}

