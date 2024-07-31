package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.ChatRoom;
import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.mapper.ChatRoomMapper;
import com.sky.usedarticle.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomMapper chatRoomMapper;

    @Autowired
    private UserMapper userMapper;

    // 새로운 채팅방을 생성하기 위한 메서드
    public void createChatRoom(int user1No, int user2No) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUser1No(user1No);
        chatRoom.setUser2No(user2No);

        chatRoomMapper.insertChatRoom(chatRoom);
    }

    // 사용자의 채팅방 목록을 반환하는 메서드
    public List<ChatRoom> getUserChatRooms(int userNo) {
        List<ChatRoom> chatRooms = chatRoomMapper.getUserChatRooms(userNo);
        for (ChatRoom chatRoom : chatRooms) {
            User sender = userMapper.getUserByNo(chatRoom.getUser1No());
            User receiver = userMapper.getUserByNo(chatRoom.getUser2No());
            if (sender != null) {
                chatRoom.setSenderId(sender.getUserId()); // 발신인의 user_id를 설정
            }
            if (receiver != null) {
                chatRoom.setReceiverId(receiver.getUserId()); // 수신인의 user_id를 설정
            }
        }
        return chatRooms;
    }
}
