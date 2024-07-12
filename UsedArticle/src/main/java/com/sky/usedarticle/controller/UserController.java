package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    //회원가입
    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

    //로그인
    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {
        String userId = user.getUserId();
        String userPw = user.getUserPw();
        User loggedInUser = userService.login(userId, userPw);
        // 로그인 성공 시 세션에 사용자 정보 저장
        if (loggedInUser != null) {
            session.setAttribute("loggedInUser", loggedInUser);
            System.out.println("세션에 사용자 정보가 저장되었습니다: " + session.getAttribute("loggedInUser"));
        }

        return loggedInUser;
    }
}
