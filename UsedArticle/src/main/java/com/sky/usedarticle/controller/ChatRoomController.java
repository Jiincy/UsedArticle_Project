package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.ChatRoomRequest;
import com.sky.usedarticle.dto.User; // 여기서 User 클래스를 import합니다.
import com.sky.usedarticle.service.ChatRoomService;
import com.sky.usedarticle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/chatRooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private UserService userService;

    @PostMapping
    public void createChatRoom(@RequestBody ChatRoomRequest request, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            try {
                // user2_id를 user2_no로 변환
                Integer user2No = userService.findUserNoByUserId(request.getUser2Id());
                if (user2No == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 user_id입니다.");
                }

                chatRoomService.createChatRoom(loggedInUser.getUserNO(), user2No);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "채팅방 생성 중 오류 발생", e);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }
}
