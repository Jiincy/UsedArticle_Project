// path: com/sky/usedarticle/service/MessageService.java
package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.mapper.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageMapper messageMapper;

    @Autowired
    public MessageService(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }

    public void saveMessage(Message message) {
        messageMapper.insertMessage(message);
    }

    public List<Message> getMessages(String buyer, String seller, String productId) {
        return messageMapper.findMessages(buyer, seller, productId);
    }
}
