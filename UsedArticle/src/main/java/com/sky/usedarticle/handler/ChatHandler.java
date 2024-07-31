package com.sky.usedarticle.handler;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class ChatHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final MessageService messageService;
    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Autowired
    public ChatHandler(MessageService messageService) {
        this.messageService = messageService;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.findAndRegisterModules();
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("New WebSocket connection established: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Received message from session " + session.getId() + ": " + payload);

        try {
            // JSON 포맷 확인 및 변환
            Message chatMessage = objectMapper.readValue(payload, Message.class);

            // 필드 유효성 검사
            if (chatMessage.getChatRoomId() == null || chatMessage.getSenderNo() <= 0) {
                throw new IllegalArgumentException("유효하지 않은 chatRoomId 또는 senderNo: " + chatMessage.getChatRoomId() + ", " + chatMessage.getSenderNo());
            }

            // 메시지 저장
            messageService.saveMessage(chatMessage);

            // 모든 세션에 메시지 전송
            for (WebSocketSession webSocketSession : sessions) {
                if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                    try {
                        webSocketSession.sendMessage(new TextMessage(payload.getBytes(StandardCharsets.UTF_8)));
                    } catch (Exception e) {
                        System.err.println("Error sending message to session " + webSocketSession.getId() + ": " + e.getMessage());
                    }
                }
            }
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid message data: " + e.getMessage());
            session.close(CloseStatus.BAD_DATA.withReason("Invalid message data"));
        } catch (Exception e) {
            System.err.println("Error handling WebSocket message: " + e.getMessage());
            session.close(CloseStatus.SERVER_ERROR.withReason("Invalid message format"));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket connection closed: " + session.getId() + " with status " + status);
    }
}
