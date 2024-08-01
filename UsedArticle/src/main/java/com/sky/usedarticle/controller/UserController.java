package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.ChatRoom;
import com.sky.usedarticle.dto.Message;
import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.service.ChatRoomService;
import com.sky.usedarticle.service.MessageService;
import com.sky.usedarticle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {
        String userId = user.getUserId();
        String userPw = user.getUserPw();
        User loggedInUser = userService.login(userId, userPw);
        if (loggedInUser != null) {
            // 로그인된 사용자 정보를 세션에 저장
            session.setAttribute("loggedInUser", loggedInUser);
        }
        return loggedInUser;
    }


    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/user")
    public User getUser(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user != null) {
            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }

//    @PutMapping("/user")
//    public User updateUser(@RequestBody User user, HttpSession session) {
//        User loggedInUser = (User) session.getAttribute("loggedInUser");
//        if (loggedInUser != null) {
//            user.setId(loggedInUser.getId());
//            return userService.updateUser(user);
//        }
//        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
//    }

    @DeleteMapping("/user")
    public void deleteUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            try {
                System.out.println("User found in session: " + loggedInUser.getUserId());
                userService.deleteUser(loggedInUser.getUserId());
                session.invalidate();
                System.out.println("Session invalidated and user deleted.");
            } catch (Exception e) {
                System.err.println("계정 삭제 중 오류 발생: " + e.getMessage());
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "사용자 삭제 중 오류 발생", e);
            }
        } else {
            System.err.println("No user found in session.");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }

    @GetMapping("/users/search")
    public List<User> searchUsers(@RequestParam String keyword) {
        return userService.searchUsers(keyword);
    }

    @GetMapping("/chatRooms")
    public List<ChatRoom> getUserChatRooms(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            return chatRoomService.getUserChatRooms(loggedInUser.getUserNO());
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }

    @GetMapping("/chatRooms/{chatRoomId}/messages")
    public List<Message> getMessagesByChatRoomId(@PathVariable String chatRoomId) {
        return messageService.getMessagesByChatRoomId(chatRoomId);
    }

    @PostMapping("/messages")
    public void saveMessage(@RequestBody Message message) {
        messageService.saveMessage(message);
    }

    @GetMapping("/currentUser")
    public User getCurrentUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            return loggedInUser;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }

}
