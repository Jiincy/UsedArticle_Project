package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.ChatRoom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatRoomMapper {

    // 사용자 ID로 채팅방 찾기
    List<ChatRoom> findChatRoomsByUserNo(@Param("userNo") int userNo);

    // 채팅방 생성
    void createChatRoom(ChatRoom chatRoom);

    void insertChatRoom(ChatRoom chatRoom);

    List<ChatRoom> getUserChatRooms(int userNo);

}
