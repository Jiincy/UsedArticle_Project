package com.sky.usedarticle.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Autowired
    private MessageService messageService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("New WebSocket connection established: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Received message from session " + session.getId() + ": " + payload);

        // JSON 파싱
        Message chatMessage = objectMapper.readValue(payload, Message.class);

        // 데이터베이스에 메시지 저장
        messageService.saveMessage(chatMessage);

        // 연결된 모든 세션에 메시지 브로드캐스트
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                try {
                    webSocketSession.sendMessage(new TextMessage(payload));
                } catch (Exception e) {
                    System.err.println("Error sending message to session " + webSocketSession.getId() + ": " + e.getMessage());
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket connection closed: " + session.getId() + " with status " + status);
    }
}
