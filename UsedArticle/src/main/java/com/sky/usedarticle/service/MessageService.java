package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.mapper.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageMapper messageMapper;

    public List<Message> getMessagesByChatRoomId(String chatRoomId) {
        return messageMapper.getMessagesByChatRoomId(chatRoomId);
    }

    public void saveMessage(Message message) {
        String chatRoomId = message.getChatRoomId();
        int senderNo;

        try {
            senderNo = Integer.parseInt(String.valueOf(message.getSenderNo()));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid senderNo: " + e.getMessage());
        }

        if (chatRoomId == null || chatRoomId.isEmpty() || senderNo <= 0) {
            throw new IllegalArgumentException("Invalid chatRoomId or senderNo");
        }

        messageMapper.insertMessage(message);
    }
}
