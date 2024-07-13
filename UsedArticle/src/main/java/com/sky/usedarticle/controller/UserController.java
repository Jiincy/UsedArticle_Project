package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {
        String userId = user.getUserId();
        String userPw = user.getUserPw();
        User loggedInUser = userService.login(userId, userPw);
        if (loggedInUser != null) {
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

    @PutMapping("/user")
    public User updateUser(@RequestBody User user, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            user.setId(loggedInUser.getId());
            return userService.updateUser(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
    }

    @DeleteMapping("/user")
    public void deleteUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        if (loggedInUser != null) {
            userService.deleteUser(loggedInUser.getId());
            session.invalidate();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }
}
