package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getMessages(@RequestParam String buyer, @RequestParam String seller, @RequestParam String productId) {
        return messageService.getMessages(buyer, seller, productId);
    }
}
