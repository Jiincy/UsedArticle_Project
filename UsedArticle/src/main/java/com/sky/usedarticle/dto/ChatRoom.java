package com.sky.usedarticle.dto;

public class ChatRoom {
    private int id;
    private int user1No; // 발신인 번호
    private int user2No; // 수신인 번호
    private String senderId; // 발신인의 ID
    private String receiverId; // 수신인의 ID

    // getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser1No() {
        return user1No;
    }

    public void setUser1No(int user1No) {
        this.user1No = user1No;
    }

    public int getUser2No() {
        return user2No;
    }

    public void setUser2No(int user2No) {
        this.user2No = user2No;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }
}
