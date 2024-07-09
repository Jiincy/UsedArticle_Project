package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User user ,HttpSession httpSession) {
//        boolean loggedIn = userService.login(user);
//        if (loggedIn) {
//            httpSession.setAttribute("userId", user.getUserId());
//            return ResponseEntity.ok("로그인 성공");
//        } else {
//            return ResponseEntity.badRequest().body("아이디 또는 비밀번호가 일치하지 않습니다.");
//        }
//    }

    @PostMapping("/login")
    public User login(User user, HttpSession session) {
        String userId = user.getUserId();
        String userPw = user.getUserPw();
        User loggedInUser = userService.login(userId,userPw);

        // 로그인 성공 시 세션에 사용자 정보 저장
        if (loggedInUser != null) {
            session.setAttribute("loggedInUser", loggedInUser);
            System.out.println("세션에 사용자 정보가 저장되었습니다: " + session.getAttribute("loggedInUser"));
        }

        return loggedInUser;
    }
}
