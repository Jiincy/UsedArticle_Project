package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.User;
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
            try {
                System.out.println("User found in session: " + loggedInUser.getUserId()); // 디버깅 메시지 추가
                userService.deleteUser(loggedInUser.getUserId());
                session.invalidate();
                System.out.println("Session invalidated and user deleted."); // 디버깅 메시지 추가
            } catch (Exception e) {
                // 디버깅 메시지 추가
                System.err.println("계정 삭제 중 오류 발생: " + e.getMessage());
                e.printStackTrace();  // 스택 추적 출력
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "사용자 삭제 중 오류 발생", e);
            }
        } else {
            System.err.println("No user found in session."); // 디버깅 메시지 추가
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인 세션이 만료되었습니다.");
        }
    }
    // 유저 검색 엔드포인트 추가
    @GetMapping("/users/search")
    public List<User> searchUsers(@RequestParam String keyword) {
        return userService.searchUsers(keyword);
    }


}
